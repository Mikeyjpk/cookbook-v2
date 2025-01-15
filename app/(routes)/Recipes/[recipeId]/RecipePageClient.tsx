"use client";

import getRecipeById from "@/app/actions/getRecipeById";
import axios from "axios";
import { useEffect, useState } from "react";

interface RecipePageClientProps {
	recipe: any;
}

const RecipePageClient: React.FC<RecipePageClientProps> = ({ recipe }) => {
	if (!recipe) {
		return <div>no recipe received in RecipePageClient</div>;
	}

	return (
		<div className="flex flex-col gap-2">
			{/* <div>title:{recipe}</div> */}
			<div className="text-sm">Receipe ID: {recipe.recipe_id}</div>

			<div className="text-2xl">{recipe.title}</div>

			<div>{recipe.description}</div>
			<div>Prep time: {recipe.prep_time}</div>
			<div>Cook Time: {recipe.cook_time}</div>

			<div className="text-lg">Steps</div>
			{recipe.steps.map((step: any) => (
				<div key={step.id} className="bg-red-700/20 p-2 rounded-md">
					<div>Step: {step.order}</div>
					<div>{step.description}</div>

					<div className="text-xs"> Step ID: {step.id}</div>
					<div className="text-xs">Recipe ID: {step.recipeId}</div>
				</div>
			))}

			<div className="text-lg">Ingredients</div>
			{recipe.ingredients.map((ingredient: any) => (
				<div
					key={ingredient.id}
					className="bg-red-700/50 p-2 rounded-md"
				>
					<div>Ingredient: {ingredient.name}</div>
					<div>Quantity: {ingredient.quantity}</div>

					<div className="text-xs">
						Ingredient ID: {ingredient.id}
					</div>
					<div className="text-xs">
						Recipe ID: {ingredient.recipeId}
					</div>
				</div>
			))}

			<div>Recipe Created by:{recipe.author_id}</div>
		</div>
	);
};

export default RecipePageClient;

// {
// 	images: [],
// 	recipe_id: '67874878e6223a50db6f1e02',
// 	author_id: 'user_2rYQaDgnsLVnZ3wDENBrx8PO2ex',
// 	title: 'test two',
// 	description: 'wet',
// 	prep_time: 123,
// 	cook_time: 123,
// 	createdAt: 2025-01-15T05:32:40.566Z,
// 	updatedAt: 2025-01-15T05:32:40.566Z,
// 	steps: [
// 	  {
// 		id: '67874878e6223a50db6f1e03',
// 		order: 1,
// 		description: 'dfsf',
// 		recipeId: '67874878e6223a50db6f1e02'
// 	  }
// 	],
// 	ingredients: [
// 	  {
// 		id: '67874878e6223a50db6f1e04',
// 		name: '1',
// 		description: '',
// 		quantity: 0,
// 		category: null,
// 		unit: '',
// 		recipeId: '67874878e6223a50db6f1e02'
// 	  }
// 	]
//   }
