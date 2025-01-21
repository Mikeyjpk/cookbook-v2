"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "@/app/components/RecipeCard";
import { useAuth } from "@clerk/nextjs";

// could move this out, not sure if i need props
interface RecipeLibraryClientProps {}

const RecipeLibraryClient: React.FC<RecipeLibraryClientProps> = () => {
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
		<div className="flex flex-col gap-y-4 pt-4 bg-red-200">
			<div className="flex justify-center text-2xl">My Cookbook</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-2 w-full">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.recipe_id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default RecipeLibraryClient;
