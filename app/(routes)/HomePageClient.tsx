"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

const HomePageClient: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [recipes, setRecipes] = useState<any[]>([]);

	const fetchRecipes = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get("/api/recipes");
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
		<div className="min-h-screen flex flex-col items-center">
			{isLoading ? (
				<div className="text-dark text-lg text-center">
					Loading Recipes...
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 py-6">
					{recipes.map((recipe) => (
						<RecipeCard key={recipe.recipe_id} recipe={recipe} />
					))}
				</div>
			)}
		</div>
	);
};

export default HomePageClient;
