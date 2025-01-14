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
				className="flex justify-center items-center mr-2"
			>
				{isOpen ? <TbMenu3 size={22} /> : <TbMenu4 size={22} />}
			</button>
			{isOpen && (
				<div className="absolute bg-white rounded-md -right-10 top-9">
					<div className="flex flex-col w-32 h-36 p-3 gap-4">
						<NavMenuButton
							name="Home"
							route="/"
							toggleOpen={toggleOpen}
						/>
						<NavMenuButton
							name="Create"
							route="/Create"
							toggleOpen={toggleOpen}
						/>
						<NavMenuButton
							name="Recipes"
							route="/Recipes"
							toggleOpen={toggleOpen}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavMenu;
