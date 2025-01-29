import prisma from "@/lib/prismadb"; // Adjust this import if necessary
import { NextResponse } from "next/server";

// This function will handle GET requests to `/api/ingredients`
export async function GET() {
	try {
		const ingredients = await prisma.ingredient.findMany();

		return NextResponse.json(ingredients);
	} catch (error) {
		console.error("Error fetching ingredients:", error);
		return NextResponse.json(
			{ error: "Failed to fetch ingredients" },
			{ status: 500 }
		);
	}
}
