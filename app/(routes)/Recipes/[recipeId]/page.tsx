import { currentUser } from "@clerk/nextjs/server";
import RecipePageClient from "./components/RecipePageClient";
import { getRecipeById } from "@/app/api/services/recipeService";

const RecipePage = async ({ params }: any) => {
	const recipeParams = await params;
	const { recipeId } = recipeParams;

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
			<RecipePageClient recipe={recipe} currentUser={user.id} />
		</div>
	);
};

export default RecipePage;
