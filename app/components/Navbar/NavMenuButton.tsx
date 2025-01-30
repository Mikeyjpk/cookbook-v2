import { useRouter } from "next/navigation";

interface NavMenuButtonProps {
	name: string;
	route: string;
	toggleOpen: () => void;
}

const NavMenuButton: React.FC<NavMenuButtonProps> = ({
	name,
	route,
	toggleOpen,
}) => {
	const router = useRouter();

	return (
		<button
			onClick={() => {
				router.push(route);
				toggleOpen();
			}}
			className="px-4 py-2 text-dark font-semibold hover:bg-medium hover:text-light rounded-lg transition-all"
		>
			{name}
		</button>
	);
};

export default NavMenuButton;
