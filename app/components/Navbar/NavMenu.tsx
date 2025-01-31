import { TbMenu3, TbMenu4, TbHome } from "react-icons/tb";
import { useRouter } from "next/navigation";
import NavMenuButton from "./NavMenuButton";

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
	return (
		<div className="relative">
			<div className="flex items-center gap-1">
				{/* Home Button */}
				<button
					onClick={() => {
						router.push("/"), toggleOff(isOpen, toggleOpen);
					}}
					className="text-light p-2 rounded-lg hover:bg-medium transition-all"
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
