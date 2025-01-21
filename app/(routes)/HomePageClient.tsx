"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

// todo, remove this if not being used, dont need to pass the id in
interface HomePageClientProps {}

const HomePageClient: React.FC<HomePageClientProps> = () => {
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
		<div className="flex flex-col gap-y-4 pt-4 bg-red-200">
			<div className="flex justify-center text-2xl">Home Page</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-2 w-full">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.recipe_id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default HomePageClient;
