import RecipeForm from "@/app/(routes)/Create/components/RecipeForm";
import { getIngredients } from "@/app/api/services/ingredientService";

const CreatePage = async () => {
	// todo: this may be spamming requests, try moving this into a client file

	// todo: check for the user name
	// get the username from the currentUser
	// if not username > show state to explain to make a username
	// if username > show recipe form
	// add to recipe form option to show or hide author tag

	const ingredients = await getIngredients();

	return (
		<div className="pt-6">
			<RecipeForm existingIngredients={ingredients} />
		</div>
	);
};

export default CreatePage;
