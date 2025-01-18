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
	if (!recipe) {
		console.error("Failed to get recipe");
		return <div>Failed to find recipe</div>;
	}

	console.log(recipe.image);

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
