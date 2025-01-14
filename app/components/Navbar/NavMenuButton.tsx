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
		>
			{name}
		</button>
	);
};

export default NavMenuButton;
