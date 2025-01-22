// CreatePage.tsx
import RecipeForm from "@/app/components/RecipeForm";
import axios from "axios";

// Define the type for a single ingredient
interface Ingredient {
	id: string;
	name: string;
	description: string;
	category: string;
	createdAt: string;
	updatedAt: string;
}

// This is a Server Component that fetches ingredients from the server
const CreatePage = async () => {
	let existingIngredients: Ingredient[] = [];

	try {
		// Fetching ingredients directly from the API (server-side)
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients`
		);
		existingIngredients = response.data || [];
	} catch (error) {
		console.error("Error fetching ingredients:", error);
	}

	return (
		<div>
			<div>Add Recipe</div>
			<RecipeForm existingIngredients={existingIngredients} />
		</div>
	);
};

export default CreatePage;
