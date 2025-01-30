import { TbMenu3, TbMenu4 } from "react-icons/tb";
import NavMenuButton from "./NavMenuButton";

interface NavMenuProps {
	isOpen: boolean;
	toggleOpen: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, toggleOpen }) => {
	return (
		<div className="relative">
			<button
				onClick={toggleOpen}
				className="text-light p-2 rounded-lg hover:bg-medium transition-all"
			>
				{isOpen ? <TbMenu3 size={28} /> : <TbMenu4 size={28} />}
			</button>

			{isOpen && (
				<div className="absolute bg-light rounded-lg shadow-lg -left-4 top-14 p-3 transition-opacity duration-300 z-50">
					<div className="flex flex-col w-40 space-y-2">
						<NavMenuButton
							name="Home"
							route="/"
							toggleOpen={toggleOpen}
						/>
						<NavMenuButton
							name="Recipes"
							route="/Recipes"
							toggleOpen={toggleOpen}
						/>
						<NavMenuButton
							name="Create"
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
