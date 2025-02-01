"use client";

import { useRouter } from "next/navigation";
import { PiBowlFoodBold } from "react-icons/pi";

interface RecipeCardProps {
	recipe: {
		recipe_id: string;
		image: string;
		title: string;
	};
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/Recipes/${recipe.recipe_id}`)}
			className=" bg-dark/10 shadow-md rounded-lg flex flex-col p-3 hover:shadow-xl transition-all w-44 h-52"
		>
			{/* Image Wrapper*/}
			<div className="relative w-full aspect-square rounded-lg overflow-hidden border border-medium">
				{recipe.image ? (
					<img
						src={recipe.image}
						alt={recipe.title}
						className="absolute top-0 left-0 w-full h-full object-cover"
					/>
				) : (
					// todo: replace with image depending on the category
					<div className="flex w-full h-full items-center justify-center">
						<PiBowlFoodBold size={52} className="text-dark" />
					</div>
				)}
			</div>

			{/* Title */}
			<div className="mt-2 text-center text-dark font-semibold text-sm line-clamp-2 leading-tight">
				{recipe.title}
			</div>
		</button>
	);
};

export default RecipeCard;
