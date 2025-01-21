import { currentUser } from "@clerk/nextjs/server";
import HomePageClient from "./HomePageClient";

// todo: turn into a welcome page if the user is not signed in.
export default async function Home() {
	const user = await currentUser();
	if (!user) {
		return null;
	}

	return <HomePageClient />;
}
