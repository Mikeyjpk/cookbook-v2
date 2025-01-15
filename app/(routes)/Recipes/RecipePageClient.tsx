"use client";

import axio from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "@/app/components/RecipeCard";

interface RecipePageClientProps {
	userId?: string;
}

const RecipePageClient: React.FC<RecipePageClientProps> = ({ userId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [recipes, setRecipes] = useState<any[]>([]);

	const fetchRecipes = async () => {
		try {
			setIsLoading(true);
			const response = await axio.get("/api/recipes");
			setRecipes(response.data);
		} catch (error) {
			console.error("Error fetching recipes: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchRecipes();
	}, []);

	return (
		<div className="flex flex-col gap-y-4 pt-4 bg-red-200">
			<div className="flex justify-center text-2xl">My Cookbook</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-2 w-full">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.recipe_id} recipe={recipe} />
				))}
			</div>
			<div>
				<div>my ID is: {userId}</div>
			</div>
		</div>
	);
};

export default RecipePageClient;
