import { currentUser, User } from "@clerk/nextjs/server";
import HomePageClient from "./HomePageClient";

export default async function Home() {
	//* todo: investigate how to ensure user is not undefined
	const user = await currentUser();

	return <HomePageClient userId={user!.id} />;
}
