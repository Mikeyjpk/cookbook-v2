"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RecipePageClientProps {
	recipe: any;
	currentUser: any;
}

const RecipePageClient: React.FC<RecipePageClientProps> = ({
	recipe,
	currentUser,
}) => {
	const router = useRouter();
	const [isAuthor, setIsAuthor] = useState<boolean>(false);

	const checkIfAuthor = (currentUser: any, authorId: any) => {
		if (currentUser == authorId) {
			setIsAuthor(true);
		}
	};

	useEffect(() => {
		checkIfAuthor(currentUser, recipe.author_id);
	}, [currentUser, recipe.author_id]);

	const handleDeleteRecipe = async () => {
		try {
			await axios.delete(`/api/recipes/${recipe.recipe_id}`);
			alert("Recipe deleted successfully");
			router.push("/Recipes");
		} catch (error) {
			console.error("Error deleting recipe:", error);
			alert("Failed to delete recipe");
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{/* Delete Button */}
			{isAuthor && (
				<div>
					<button
						onClick={handleDeleteRecipe}
						className="text-red-500"
					>
						Delete Recipe
					</button>
				</div>
			)}

			{/* Recipe Title */}
			<div className="text-2xl font-semi-bold">{recipe.title}</div>

			{/* Image */}
			<div className="flex items-center justify-center">
				<div className="max-h-[500px] overflow-hidden rounded-md md:rounded-xl">
					<img
						src={recipe.image}
						className="object-contain max-w-full max-h-full object-center"
					/>
				</div>
			</div>

			{/* Description */}
			<div className="text-sm font-thin">{recipe.description}</div>

			{/* Times */}
			<div>Prep time: {recipe.prep_time}</div>
			<div>Cook Time: {recipe.cook_time}</div>

			{/* Ingredients */}
			<div className="text-lg">Ingredients</div>
			<div className="grid grid-cols-2 gap-3 text-sm">
				{recipe.recipeIngredients.map((recipeIngredient: any) => (
					<div
						key={recipeIngredient.id}
						className="bg-red-700/50 p-2 rounded-md"
					>
						<div>
							Ingredient: {recipeIngredient.ingredient.name}
						</div>
						<div>Quantity: {recipeIngredient.quantity}</div>
					</div>
				))}
			</div>

			{/* Steps */}
			{recipe.steps.map((step: any) => (
				<div key={step.order} className="flex gap-3">
					<div>{step.order}</div>
					<div>{step.description}</div>
				</div>
			))}
		</div>
	);
};

export default RecipePageClient;
