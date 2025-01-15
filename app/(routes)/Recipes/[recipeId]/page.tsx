import { currentUser } from "@clerk/nextjs/server";
import RecipePageClient from "./RecipePageClient";
import getRecipeById from "@/app/actions/getRecipeById";

interface IParams {
	recipeId: string;
}

// todo: create a function to get a recipe by its ID, this recipe will be displayed on this page
// the ID is gottenf rom the params passed in.

const RecipePage = async ({ params }: { params: IParams }) => {
	const recipe = await getRecipeById(params);
	console.log(typeof recipe);
	if (!recipe) {
		console.error("Failed to get recipe");
		return <div>Failed to find recipe</div>;
	}

	console.log(recipe);

	const user = await currentUser();
	if (!user) {
		return null;
	}

	return <RecipePageClient recipe={recipe} />;
};

export default RecipePage;
