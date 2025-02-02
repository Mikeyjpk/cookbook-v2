"use client";

import { useEffect, useState } from "react";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";
import DeleteRecipeButton from "./DeleteRecipeButton";
import AuthorCard from "./AuthorCard";
import RecipeHeader from "./RecipeHeader";

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
		<div className="flex flex-col items-center min-h-screen px-4 pb-6 pt-6">
			<RecipeHeader recipe={recipe} />
			<RecipeIngredients ingredients={recipe.recipeIngredients} />
			<RecipeSteps steps={recipe.steps} />
			{isAuthor ? (
				<DeleteRecipeButton recipeId={recipe.recipe_id} />
			) : (
				<AuthorCard author={recipe.author_name} />
			)}
		</div>
	);
};

export default RecipePageClient;
