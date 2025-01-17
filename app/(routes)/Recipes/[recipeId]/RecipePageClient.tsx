"use client";

import Image from "next/image";

interface RecipePageClientProps {
	recipe: any;
}

const RecipePageClient: React.FC<RecipePageClientProps> = ({ recipe }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="text-2xl font-semi-bold">{recipe.title}</div>

			<div className="flex items-center justify-center">
				<div className="max-h-[500px] overflow-hidden rounded-md md:rounded-xl">
					<img
						src={recipe.image}
						className="object-contain max-w-full max-h-full object-center"
					/>
				</div>
			</div>

			<div className="text-sm font-thin">{recipe.description}</div>
			<div>Prep time: {recipe.prep_time}</div>
			<div>Cook Time: {recipe.cook_time}</div>

			<div className="text-lg">Ingredients</div>
			<div className="grid grid-cols-2 gap-3 text-sm">
				{recipe.ingredients.map((ingredient: any) => (
					<div
						key={ingredient.id}
						className="bg-red-700/50 p-2 rounded-md"
					>
						<div>Ingredient: {ingredient.name}</div>
						<div>Quantity: {ingredient.quantity}</div>
					</div>
				))}
			</div>

			{recipe.steps.map((step: any) => (
				<div id={step.id} className="flex gap-3">
					<div>{step.order}</div>
					<div>{step.description}</div>
				</div>
			))}
		</div>
	);
};

export default RecipePageClient;
