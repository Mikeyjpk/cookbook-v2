"use client";

import { useCallback, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const router = useRouter();
	const [showNavMenu, setShowNavMenu] = useState(false);

	const handleToggleOpen = useCallback(() => {
		setShowNavMenu((showNavMenu) => !showNavMenu);
	}, []);

	return (
		<div className="bg-red-100 flex justify-between items-center w-full h-12">
			<button
				className="bg-red-800/20 rounded-sm p-1"
				onClick={() => router.push("/")}
			>
				Home Button
			</button>
			<SignedIn>
				<div className="flex items-center  bg-red-600/30 rounded-md p-1 m-2">
					<NavMenu
						isOpen={showNavMenu}
						toggleOpen={handleToggleOpen}
					/>
					<UserButton />
				</div>
			</SignedIn>
			<SignedOut>
				{/* doesnt need to have children passed in, reminder how the component works */}
				<SignInButton children={"Sign In"} />
			</SignedOut>
		</div>
	);
};

export default Navbar;
