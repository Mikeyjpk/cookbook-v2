"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "@/app/components/RecipeCard";
import { useAuth } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

const RecipeLibraryClient: React.FC = () => {
	const { userId } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [recipes, setRecipes] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState(""); // ✅ State for search input

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

	// Filter recipes based on search query
	const filteredRecipes = recipes.filter((recipe) =>
		recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="min-h-screen flex flex-col items-center pt-6">
			{/* Search Input */}
			<div className="w-full max-w-md">
				<Input
					type="text"
					placeholder="Search your recipes..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full bg-light border border-medium/60 focus:ring-dark px-4 py-2 rounded-lg"
				/>
			</div>

			{/* Show Loading State */}
			{isLoading ? (
				<div className="text-dark text-lg text-center">
					Loading Your Recipes...
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 py-6">
					{/* ✅ Show filtered recipes */}
					{filteredRecipes.length > 0 ? (
						filteredRecipes.map((recipe) => (
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
