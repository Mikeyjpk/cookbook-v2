import { currentUser } from "@clerk/nextjs/server";

interface RecipeParams {
	recipeId?: string;
}

// todo: create a function to get a recipe by its ID, this recipe will be displayed on this page
// the ID is gottenf rom the params passed in.

const recipePage = async ({ params }: { params: RecipeParams }) => {
	const user = await currentUser();
	if (!user) {
		return null;
	}

	return (
		<div>
			<div>Recipe Page for {user?.firstName}</div>
		</div>
	);
};

export default recipePage;
