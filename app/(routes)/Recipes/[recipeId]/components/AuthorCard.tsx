import { TbChefHat } from "react-icons/tb";

interface AuthorCardProps {
	author: string;
}

// todo: change this to a user name
// potentially make a user create a username if they have no created it before

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
	return (
		<div className="flex items-center gap-2 bg-medium/20 p-3 rounded-lg border border-medium/40 shadow-md mt-6">
			{/* Icon */}
			<TbChefHat size={28} className="text-medium" />

			{/* Author Name */}
			<div className="text-medium font-semibold">
				Recipe by <span className="">{author}</span>
			</div>
		</div>
	);
};

export default AuthorCard;
