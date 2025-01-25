import prisma from "@/app/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import {
	getAllRecipes,
	getRecipesByAuthorId,
} from "@/app/api/services/recipeService";

// posts a new recipe to the database
export async function POST(request: Request) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.error();
	}

	let body;
	try {
		body = await request.json();
	} catch (error) {
		return NextResponse.json(
			{ message: "Invalid request body" },
			{ status: 400 }
		);
	}

	const {
		title,
		description,
		prep_time,
		cook_time,
		steps = [],
		ingredients = [],
		categories = [],
		image,
		isPrivate,
		servings,
		difficulty,
	} = body;

	console.log(body);

	if (!title || !prep_time || !cook_time || steps.length === 0) {
		return NextResponse.json(
			{ message: "Missing required fields" },
			{ status: 400 }
		);
	}

	const prep_time_parsed = parseInt(prep_time, 10);
	const cook_time_parsed = parseInt(cook_time, 10);

	if (isNaN(prep_time_parsed) || isNaN(cook_time_parsed)) {
		return NextResponse.json(
			{ message: "Invalid prep_time or cook_time" },
			{ status: 400 }
		);
	}

	if (
		!Array.isArray(steps) ||
		steps.some((step) => !step.description || isNaN(parseInt(step.order)))
	) {
		return NextResponse.json(
			{ message: "Invalid steps format" },
			{ status: 400 }
		);
	}

	const categoryStrings = categories.map((category: any) => category.name);

	// Create a new recipe object
	try {
		// todo: add user name to the recipe
		const newRecipe = await prisma.recipe.create({
			data: {
				title,
				description: description || null,
				difficulty: difficulty,
				isPrivate: isPrivate,
				servings: servings,
				prep_time: prep_time_parsed,
				cook_time: cook_time_parsed,
				categories: categoryStrings,
				author_id: user.id,
				author_name: user.firstName || "anon",
				image: image || null,
				createdAt: new Date(),
				updatedAt: new Date(),
				steps: steps.map((step: any) => ({
					order: parseInt(step.order, 10),
					description: step.description,
				})),
			},
		});

		for (const ingredient of ingredients) {
			// Normalize ingredient name: lowercase, trim, and remove trailing 's' if present (except for 'ss').
			const normalizedIngredientName = ingredient.name
				.trim()
				.toLowerCase()
				.replace(/(?<!s)s$/, ""); // Remove trailing 's' unless it's preceded by 's'

			// Check if the ingredient exists in the database
			const existingIngredient = await prisma.ingredient.findUnique({
				where: { name: normalizedIngredientName },
			});

			const ingredientData =
				existingIngredient ||
				(await prisma.ingredient.create({
					data: {
						name: normalizedIngredientName,
						description: ingredient.description || "",
						category: ingredient.category || "",
					},
				}));

			// Create RecipeIngredient
			await prisma.recipeIngredient.create({
				data: {
					recipeId: newRecipe.recipe_id,
					ingredientId: ingredientData.id,
					quantity: parseFloat(ingredient.quantity) || 0,
					unit: ingredient.unit || "",
				},
			});
		}

		return NextResponse.json(newRecipe);
	} catch (error) {
		console.error("Error creating recipe:", error);
		return NextResponse.json({
			status: 500,
			message: "Error creating recipe",
		});
	}
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const authorId = searchParams.get("authorId");

	try {
		let recipes;

		if (authorId) {
			recipes = await getRecipesByAuthorId(authorId); // Get recipes by author
		} else {
			recipes = await getAllRecipes(); // Get all recipes
		}

		return NextResponse.json(recipes);
	} catch (error) {
		console.error("Failed to fetch recipes:", error);
		return NextResponse.json(
			{ error: "Failed to fetch recipes. Please try again later." },
			{ status: 500 }
		);
	}
}
