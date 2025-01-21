import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";

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
		image,
	} = body;

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

	// Create a new recipe object
	try {
		// todo: add user name to the recipe
		const newRecipe = await prisma.recipe.create({
			data: {
				title,
				description: description || null,
				prep_time: prep_time_parsed,
				cook_time: cook_time_parsed,
				author_id: user.id,
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
			// Check if the ingredient exists in the database
			const existingIngredient = await prisma.ingredient.findUnique({
				where: { name: ingredient.name },
			});

			const ingredientData =
				existingIngredient ||
				(await prisma.ingredient.create({
					data: {
						name: ingredient.name,
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

// gets all recipes
export async function GET() {
	const recipes = await prisma.recipe.findMany({
		include: {
			recipeIngredients: true,
		},
	});
	return NextResponse.json(recipes);
}
