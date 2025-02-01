import { NextResponse } from "next/server";
import {
	getRecipeById,
	deleteRecipeById,
} from "@/app/api/services/recipeService";

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
	// Await the params
	const resolvedParams = await params;

	if (!resolvedParams?.id) {
		return NextResponse.json(
			{ error: "Recipe ID is required" },
			{ status: 400 }
		);
	}

	try {
		const { id } = resolvedParams;

		if (!id.match(/^[a-fA-F0-9]{24}$/)) {
			return NextResponse.json(
				{ error: "Invalid Recipe ID format" },
				{ status: 400 }
			);
		}

		// Check if the recipe exists
		const recipe = await getRecipeById(id);

		if (!recipe) {
			return NextResponse.json(
				{ error: "Recipe not found" },
				{ status: 404 }
			);
		}

		// Delete the recipe (and related RecipeIngredients)
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
