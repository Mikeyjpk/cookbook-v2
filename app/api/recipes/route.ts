import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.error();
	}

	const body = await request.json();

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

	const formattedIngredients = ingredients.map((ingredient: any) => ({
		...ingredient,
		quantity: parseFloat(ingredient.quantity),
	}));

	try {
		// Create a new recipe object
		const newRecipe = await prisma.recipe.create({
			data: {
				title,
				description: description || null,
				prep_time: prepTimeInt,
				cook_time: cookTimeInt,
				author_id: user.id,
				createdAt: new Date(),
				updatedAt: new Date(),

				// Create the steps associated with this recipe
				steps: {
					create: steps.map(
						(step: { order: number; description: string }) => ({
							order: step.order,
							description: step.description || "",
						})
					),
				},

				// Create the ingredients associated with this recipe
				ingredients: {
					create: formattedIngredients.map(
						(ingredient: {
							name: string;
							description: string;
							quantity: number;
							unit: string;
						}) => ({
							name: ingredient.name,
							description: ingredient.description || "",
							quantity: ingredient.quantity || 0,
							unit: ingredient.unit || "",
						})
					),
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

export async function GET() {
	const recipes = await prisma.recipe.findMany({
		include: {
			steps: true,
			ingredients: true,
		},
	});
	return NextResponse.json(recipes);
}
