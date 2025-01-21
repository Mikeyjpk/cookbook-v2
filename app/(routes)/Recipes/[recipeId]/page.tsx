import { currentUser } from "@clerk/nextjs/server";
import RecipePageClient from "./RecipePageClient";
import { getRecipeById } from "@/app/api/services/recipeService";

interface IParams {
	recipeId: string;
}

const RecipePage = async ({ params }: { params: IParams }) => {
	const { recipeId } = params;
	const recipe = await getRecipeById(recipeId);
	if (!recipe) {
		console.error("Failed to get recipe");
		return <div>Failed to find recipe</div>;
	}

	const user = await currentUser();
	if (!user) {
		return null;
	}

	return (
		<div>
			<RecipePageClient recipe={recipe} />
		</div>
	);
};

export default RecipePage;
