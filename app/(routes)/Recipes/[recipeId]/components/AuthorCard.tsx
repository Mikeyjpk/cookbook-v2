import { TbChefHat } from "react-icons/tb";

interface AuthorCardProps {
	author: string;
}

// todo: change this to a user name
// potentially make a user create a username if they have no created it before

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
	return (
		<div className="flex items-center gap-2 bg-medium/20 p-3 rounded-lg border border-medium/40 text-dark shadow-md mt-6 hover:text-dark/70 hover:bg-medium/10">
			{/* Icon */}
			<TbChefHat size={28} className="" />
			{/* Author Name */}
			{/* todo: make this a button that navs to a page of all this users
			recipes that are public. */}
			<button className="font-semibold">
				Recipes by <span className="">{author}</span>
			</button>
		</div>
	);
};

export default AuthorCard;
