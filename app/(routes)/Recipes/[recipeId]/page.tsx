import { currentUser } from "@clerk/nextjs/server";

interface RecipeParams {
	recipeId?: string;
}

const recipePage = async ({ params }: { params: RecipeParams }) => {
	const user = await currentUser();
	return (
		<div>
			<div>Recipe Page for {user?.firstName}</div>
		</div>
	);
};

export default recipePage;
