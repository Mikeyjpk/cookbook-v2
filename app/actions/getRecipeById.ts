import prisma from "@/app/libs/prismadb";

interface IParams {
	recipeId: string;
}

export default async function getRecipeById(params: IParams) {
	try {
		const { recipeId } = await params;

		const recipe = await prisma.recipe.findUnique({
			where: {
				recipe_id: recipeId,
			},
			include: {
				steps: true,
				ingredients: true,
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
