import prisma from "@/app/libs/prismadb";

interface IParams {
	recipeId: string;
}

export default async function getRecipeById(params: IParams) {
	try {
		const { recipeId } = await params;

		const recipe = await prisma.recipe.findUnique({
			where: {
				recipe_id: recipeId, // Make sure this matches your schema field
			},
			include: {
				recipeIngredients: {
					include: {
						ingredient: true, // Include the related ingredient details (e.g., name, description)
					},
				},
			},
		});

		if (!recipe) {
			throw new Error("failed to get recipe");
		}

		return { ...recipe };
	} catch (error: any) {
		throw new Error(error);
	}
}
