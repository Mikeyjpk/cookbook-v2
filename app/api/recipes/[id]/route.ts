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
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		// Delete the recipe but retain its associated RecipeIngredients
		await deleteRecipeById(id);
		return NextResponse.json({ message: "Recipe deleted successfully" });
	} catch (error) {
		console.error("Error deleting recipe:", error);
		return NextResponse.json(
			{ message: "Failed to delete recipe" },
			{ status: 500 }
		);
	}
}
