import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";

// posts a new recipe to the database
export async function POST(request: Request) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.error();
	}

	const body = await request.json();
	console.log(body);

	const {
		title,
		description,
		prep_time,
		cook_time,
		steps = [],
		ingredients = [],
	} = body;

	const prepTimeInt = parseInt(prep_time, 10);
	const cookTimeInt = parseInt(cook_time, 10);

	if (steps.length === 0) {
		return NextResponse.json({
			status: 400,
			message: "Recipe must have at least one step.",
		});
	}

	if (ingredients.length === 0) {
		return NextResponse.json({
			status: 400,
			message: "Recipe must have at least one ingredient.",
		});
	}

	// changes the input ingredient into a float
	const formattedIngredients = ingredients.map((ingredient: any) => ({
		...ingredient,
		quantity: parseFloat(ingredient.quantity),
	}));

	const formattedSteps = steps.map((step: any) => ({
		order: step.order,
		description: step.description?.trim() || "",
	}));

	try {
		// Create a new recipe object
		// todo: add user name to the recipe
		const newRecipe = await prisma.recipe.create({
			data: {
				title,
				description: description || null,
				prep_time: prepTimeInt,
				cook_time: cookTimeInt,
				author_id: user.id,
				createdAt: new Date(),
				updatedAt: new Date(),
				steps: {
					create: formattedSteps,
				},
				ingredients: {
					create: formattedIngredients,
				},

				// todo: bring this back if ingredients break
				// ingredients: {
				// 	create: formattedIngredients.map(
				// 		(ingredient: {
				// 			name: string;
				// 			description: string;
				// 			quantity: number;
				// 			unit: string;
				// 		}) => ({
				// 			name: ingredient.name,
				// 			description: ingredient.description || "",
				// 			quantity: ingredient.quantity || 0,
				// 			unit: ingredient.unit || "",
				// 		})
				// 	),
				// },
			},
		});

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
			steps: true,
			ingredients: true,
		},
	});
	return NextResponse.json(recipes);
}
