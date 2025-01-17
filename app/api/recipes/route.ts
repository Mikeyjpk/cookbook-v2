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
		image,
	} = body;

	if (steps.length === 0) {
		return NextResponse.json({
			message: "Recipe must have at least one step.",
			status: 400,
		});
	}

	// Create a new recipe object
	try {
		// todo: add user name to the recipe
		const newRecipe = await prisma.recipe.create({
			data: {
				title,
				description: description || null,
				prep_time: parseInt(prep_time, 10),
				cook_time: parseInt(cook_time, 10),
				author_id: user.id,
				image: image || null,
				createdAt: new Date(),
				updatedAt: new Date(),
				steps: steps.map((step: any) => ({
					order: parseInt(step.order),
					description: step.description,
				})),
				ingredients: {
					create: ingredients.map((ingredient: any) => ({
						name: ingredient.name,
						description: ingredient.description || "",
						quantity: parseFloat(ingredient.quantity) || null,
						unit: ingredient.unit || "",
					})),
				},
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
			ingredients: true,
		},
	});
	return NextResponse.json(recipes);
}
