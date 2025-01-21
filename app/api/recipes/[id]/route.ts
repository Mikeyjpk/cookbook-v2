import { NextResponse } from "next/server";
import { getRecipeById } from "@/app/api/services/recipeService";

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
