"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "@/app/components/RecipeCard";
import { useAuth } from "@clerk/nextjs";

const RecipeLibraryClient: React.FC = () => {
	const { userId } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [recipes, setRecipes] = useState<any[]>([]);

	const fetchRecipes = async () => {
		if (!userId) return;

		try {
			setIsLoading(true);
			const response = await axios.get(`/api/recipes?authorId=${userId}`);
			setRecipes(response.data);
		} catch (error) {
			console.error("Error fetching recipes: ", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchRecipes();
	}, [userId]);

	return (
		<div className="min-h-screen flex flex-col items-center">
			{isLoading ? (
				<div className="text-dark text-lg text-center">
					Loading Your Recipes...
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 py-6">
					{recipes.length > 0 ? (
						recipes.map((recipe) => (
							<RecipeCard
								key={recipe.recipe_id}
								recipe={recipe}
							/>
						))
					) : (
						<p className="col-span-full text-center text-medium text-lg">
							No recipes found.
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default RecipeLibraryClient;
