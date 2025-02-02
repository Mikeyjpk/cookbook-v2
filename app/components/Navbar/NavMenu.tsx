import { TbMenu3, TbMenu4, TbHome } from "react-icons/tb";
import { useRouter } from "next/navigation";
import NavMenuButton from "./NavMenuButton";
import { useEffect, useRef } from "react";

interface NavMenuProps {
	isOpen: boolean;
	toggleOpen: () => void;
}

const toggleOff = (state: boolean, toggleOpen: () => void) => {
	if (state === true) {
		toggleOpen();
	}
};

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, toggleOpen }) => {
	const router = useRouter();
	const menuRef = useRef<HTMLDivElement>(null);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				toggleOff(isOpen, toggleOpen);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, toggleOpen]);

	return (
		<div className="relative" ref={menuRef}>
			<div className="flex items-center gap-1">
				{/* Home Button */}
				<button
					onClick={() => {
						router.push("/");
						toggleOff(isOpen, toggleOpen);
					}}
					onTouchStart={(e) =>
						e.currentTarget.classList.add("hover-effect")
					}
					onTouchEnd={(e) =>
						e.currentTarget.classList.remove("hover-effect")
					}
					className="text-light p-2 rounded-lg hover:bg-medium transition-all hover-effect"
				>
					<TbHome size={28} />
				</button>

				{/* More Options */}
				<button
					onClick={toggleOpen}
					className="text-light p-2 rounded-lg hover:bg-medium transition-all"
				>
					{isOpen ? <TbMenu3 size={28} /> : <TbMenu4 size={28} />}
				</button>
			</div>

			{isOpen && (
				<div className="absolute bg-light rounded-lg shadow-lg -left-4 top-14 p-3 transition-opacity duration-300 z-50">
					<div className="flex flex-col w-40 space-y-2">
						<NavMenuButton
							name="Browse All"
							route="/"
							toggleOpen={toggleOpen}
						/>
						<NavMenuButton
							name="My Recipes"
							route="/Recipes"
							toggleOpen={toggleOpen}
						/>
						<NavMenuButton
							name="Create Recipe"
							route="/Create"
							toggleOpen={toggleOpen}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavMenu;
