import RecipePageClient from "./RecipePageClient";
import { currentUser } from "@clerk/nextjs/server";

const RecipeLibraryPage = async () => {
	const user = await currentUser();

	if (!user) {
		throw new Error("unauthorized access");
	}

	return <RecipePageClient userId={user?.id} />;
};

export default RecipeLibraryPage;
