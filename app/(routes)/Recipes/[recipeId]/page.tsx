import { currentUser } from "@clerk/nextjs/server";
import RecipePageClient from "./components/RecipePageClient";
import { getRecipeByParams } from "@/app/api/services/recipeService";

interface IParams {
	recipeId?: string;
}

const RecipePage = async ({ params }: { params: IParams }) => {
	const resolvedParams = await Promise.resolve(params);
	const recipe = await getRecipeByParams(resolvedParams);

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
