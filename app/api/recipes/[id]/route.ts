import { NextResponse } from "next/server";
import {
	getRecipeById,
	deleteRecipeById,
} from "@/app/api/services/recipeService";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

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
	context: { params: { id: string } }
) {
	const { params } = context;

	if (!params?.id) {
		return NextResponse.json(
			{ error: "Recipe ID is required" },
			{ status: 400 }
		);
	}

	try {
		const { id } = params;

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
