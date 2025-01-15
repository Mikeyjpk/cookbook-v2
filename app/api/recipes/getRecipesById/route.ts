import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
	try {
		const user = await currentUser();
		if (!user) {
			console.error("could not get user");
			return null;
		}

		const recipes = await prisma.recipe.findMany({
			where: {
				author_id: user.id,
			},
		});

		return NextResponse.json(recipes);
	} catch (error) {
		console.error("Failed to get recipes for current user");
		return error;
	}
}
