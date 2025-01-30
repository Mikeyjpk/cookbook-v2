"use client";

import { useCallback, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import NavMenu from "./NavMenu";

// todo: get the user's username from the db and display Mikey's Cookbook etc

const Navbar = () => {
	const pathname = usePathname(); // Get current route
	const [showNavMenu, setShowNavMenu] = useState(false);

	const handleToggleOpen = useCallback(() => {
		setShowNavMenu((prev) => !prev);
	}, []);

	// Map paths to labels
	const pageTitles: Record<string, string> = {
		"/": "All Recipes",
		"/Create": "Create Recipe",
		"/Recipes": "My Cookbook",
		"/Recipes/*": "Recipe",
	};

	// Get the title based on the path or default to "Page"
	const currentTitle = pageTitles[pathname] || "Recipe Viewer";

	return (
		<div className="flex justify-between items-center w-full h-14 bg-dark pl-2 pr-6 shadow-lg z-50">
			<SignedIn>
				<NavMenu isOpen={showNavMenu} toggleOpen={handleToggleOpen} />
				{/* Dynamic Page Title */}
				<span className="text-light font-semibold text-lg select-none pr-3">
					{currentTitle}
				</span>

				<UserButton />
			</SignedIn>

			<SignedOut>
				<SignInButton>
					<button className="bg-danger text-light px-4 py-2 rounded-lg font-semibold hover:bg-[#b71c31] transition-all">
						Sign In
					</button>
				</SignInButton>
			</SignedOut>
		</div>
	);
};

export default Navbar;
