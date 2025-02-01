import { v2 as cloudinary } from "cloudinary";
import { extractCloudinaryPublicId } from "@/app/utilities/cloudinaryUtils";
import { NextResponse } from "next/server";
import {
	getRecipeById,
	deleteRecipeById,
} from "@/app/api/services/recipeService";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	// Await the params to resolve (even if it's already a plain object, await works fine)
	const resolvedParams = await params;
	const { id } = resolvedParams;

	try {
		const recipe = await getRecipeById(id);

		if (!recipe) {
			return NextResponse.json(
				{ error: "Recipe not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(recipe);
	} catch (error) {
		console.error("Failed to fetch recipe by ID:", error);
		return NextResponse.json(
			{ error: "Failed to fetch recipe. Please try again later." },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const resolvedParams = await params;

	if (!resolvedParams?.id) {
		return NextResponse.json(
			{ error: "Recipe ID is required" },
			{ status: 400 }
		);
	}

	try {
		const { id } = resolvedParams;

		// Validate ID format
		if (!id.match(/^[a-fA-F0-9]{24}$/)) {
			return NextResponse.json(
				{ error: "Invalid Recipe ID format" },
				{ status: 400 }
			);
		}

		// Fetch the recipe to get the image URL
		const recipe = await getRecipeById(id);

		if (!recipe) {
			return NextResponse.json(
				{ error: "Recipe not found" },
				{ status: 404 }
			);
		}

		// Extract the public ID from the image URL
		const imageUrl = recipe.image;
		const publicId = extractCloudinaryPublicId(imageUrl);

		// Delete image from Cloudinary if publicId is valid
		if (publicId) {
			const deleteResponse = await cloudinary.uploader.destroy(publicId);
			if (deleteResponse.result !== "ok") {
				console.warn("Image deletion may have failed:", deleteResponse);
			}
		} else {
			console.warn(
				"No valid Cloudinary Public ID found, skipping deletion."
			);
		}

		// Delete the recipe from the database
		await deleteRecipeById(id);

		return NextResponse.json({ message: "Recipe deleted successfully" });
	} catch (error: any) {
		console.error("Error deleting recipe:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to delete recipe" },
			{ status: 500 }
		);
	}
}
