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
		<div
			className={`" flex justify-between items-center w-full h-12 bg-primary`}
		>
			<button className="rounded-sm p-1" onClick={() => router.push("/")}>
				Home Button
			</button>
			<SignedIn>
				<div className="flex items-center rounded-lg p-1 m-2 border-[1px] border-secondary">
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
