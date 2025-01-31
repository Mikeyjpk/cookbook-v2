// CreatePage.tsx
import RecipeForm from "@/app/(routes)/Create/components/RecipeForm";
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
	// todo: this may be spamming requests, try moving this into a client file

	// todo: check for the user name
	// get the username from the currentUser
	// if not username > show state to explain to make a username
	// if username > show recipe form
	// add to recipe form option to show or hide author tag

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
		<div className="pt-6">
			<RecipeForm existingIngredients={existingIngredients} />
		</div>
	);
};

export default CreatePage;
