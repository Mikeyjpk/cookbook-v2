import prisma from "@/lib/prismadb";

/**
 * Fetch all recipes in the database.
 * @returns A list of all recipes.
 */
export const getIngredients = async () => {
	return prisma.ingredient.findMany();
};
