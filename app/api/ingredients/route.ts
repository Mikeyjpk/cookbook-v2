import prisma from "@/app/libs/prismadb"; // Adjust path if needed
import { NextResponse } from "next/server";

// gets all recipes
export async function GET() {
	const recipes = await prisma.recipe.findMany();
	return NextResponse.json(recipes);
}
