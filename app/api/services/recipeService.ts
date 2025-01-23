import prisma from "@/app/libs/prismadb";

/**
 * Fetch all recipes in the database.
 * @returns A list of all recipes.
 */
export const getAllRecipes = async () => {
	return prisma.recipe.findMany({
		include: {
			recipeIngredients: true,
		},
	});
};

/**
 * Fetch recipes for a given authorId.
 * @param authorId - The ID of the author whose recipes to fetch.
 * @returns A list of recipes created by the author.
 */
export const getRecipesByAuthorId = async (authorId: string) => {
	return prisma.recipe.findMany({
		where: { author_id: authorId },
		include: { recipeIngredients: true },
	});
};

export const getRecipeById = async (id: string) => {
	return prisma.recipe.findUnique({
		where: { recipe_id: id },
		include: {
			recipeIngredients: {
				include: {
					ingredient: true,
				},
			},
		},
	});
};

export async function deleteRecipeById(recipeId: string) {
	try {
		// Delete the recipe; cascading deletes RecipeIngredients
		await prisma.recipe.delete({
			where: {
				recipe_id: recipeId,
			},
		});

		return { success: true };
	} catch (error) {
		console.error("Error in deleteRecipeById:", error);
		throw new Error("Failed to delete recipe");
	}
}
