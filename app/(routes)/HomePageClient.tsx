"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Input } from "@/components/ui/input";

// todo: add a filter for categories & difficulty

const HomePageClient: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [recipes, setRecipes] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState(""); // ✅ State for search input

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

	const filteredRecipes = recipes
		.filter((recipe) => !recipe.isPrivate) // ✅ Filter out private recipes
		.filter((recipe) =>
			recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
		);

	return (
		<div className="min-h-screen flex flex-col items-center pt-6">
			{/* Search Input */}
			<div className="w-full max-w-md">
				<Input
					type="text"
					placeholder="Search recipes..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full bg-light border border-medium/60 focus:ring-dark px-4 py-2 rounded-lg"
				/>
			</div>

			{isLoading ? (
				<div className="text-dark text-lg text-center">
					Loading Recipes...
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-4 py-6 justify-items-center items-center">
					{filteredRecipes.length > 0 ? (
						filteredRecipes.map((recipe) => (
							<RecipeCard
								key={recipe.recipe_id}
								recipe={recipe}
							/>
						))
					) : (
						<div className="col-span-full text-dark text-lg">
							No recipes found.
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default HomePageClient;
