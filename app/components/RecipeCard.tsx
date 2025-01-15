"use client";

import { useRouter } from "next/navigation";

interface RecipeCardProps {
	recipe: any;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/Recipes/${recipe.recipe_id}`)}
			className="bg-black/10 py-4 rounded-md flex flex-col"
		>
			<div>title: {recipe.title}</div>
			<div>{recipe.recipe_id}</div>
		</button>
	);
};

export default RecipeCard;
