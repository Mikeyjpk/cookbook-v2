import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.error();
	}

	// todo: add more when scheme is set up properly
	const body = await request.json();
	const { title } = body;

	try {
		// Create a new recipe object
		const newRecipe = await prisma.recipe.create({
			data: {
				title,
				author_id: user.id,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		return NextResponse.json(newRecipe);
	} catch (error) {
		console.error("Error creating recipe:", error);
		return NextResponse.json({ status: 500 });
	}
}

export async function GET() {
	const recipes = await prisma.recipe.findMany();
	return NextResponse.json(recipes);
}
