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
			className="bg-white px-4 py-2 rounded-md flex flex-col"
		>
			<div className="flex items-center justify-center bg-black/10 rounded-md p-1">
				<img
					src={recipe.image}
					className="object-contain w-40 object-center rounded-md"
				/>
			</div>
			<div className="flex items-center justify-center p-1 font-semibold">
				{recipe.title}
			</div>
		</button>
	);
};

export default RecipeCard;
