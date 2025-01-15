import RecipeLibraryClient from "./RecipeLibraryClient";
import { currentUser } from "@clerk/nextjs/server";

const RecipeLibraryPage = async () => {
	const user = await currentUser();

	if (!user) {
		throw new Error("unauthorized access");
	}

	return <RecipeLibraryClient />;
};

export default RecipeLibraryPage;
