"use client";

import { useEffect, useState } from "react";
import RecipeTitle from "./components/RecipeTitle";
import RecipeImage from "./components/RecipeImage";
import RecipeInfo from "./components/RecipeInfo";
import RecipeIngredients from "./components/RecipeIngredients";
import RecipeSteps from "./components/RecipeSteps";
import DeleteRecipeButton from "./components/DeleteRecipeButton";

interface RecipePageClientProps {
	recipe: any;
	currentUser: any;
}

const RecipePageClient: React.FC<RecipePageClientProps> = ({
	recipe,
	currentUser,
}) => {
	const [isAuthor, setIsAuthor] = useState<boolean>(false);

	// Check if the current user is the author
	useEffect(() => {
		setIsAuthor(currentUser === recipe.author_id);
	}, [currentUser, recipe.author_id]);

	return (
		<div className="flex flex-col items-center min-h-screen px-4 py-6">
			<RecipeTitle title={recipe.title} />
			<RecipeImage image={recipe.image} title={recipe.title} />
			<RecipeInfo
				description={recipe.description}
				prep_time={recipe.prep_time}
				cook_time={recipe.cook_time}
				difficulty={recipe.difficulty}
				servings={recipe.servings}
			/>
			<RecipeIngredients ingredients={recipe.recipeIngredients} />
			<RecipeSteps steps={recipe.steps} />
			{isAuthor && <DeleteRecipeButton recipeId={recipe.recipe_id} />}
		</div>
	);
};

export default RecipePageClient;
