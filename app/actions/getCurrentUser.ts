"use client";

import { useAuth } from "@clerk/nextjs/";

export default function ExternalDataPage() {
	const currentUser = useAuth();
	return currentUser;
}
