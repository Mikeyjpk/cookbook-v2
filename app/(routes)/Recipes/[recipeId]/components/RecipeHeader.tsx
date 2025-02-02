import { TbClock, TbChefHat, TbSoup } from "react-icons/tb";

interface RecipeHeaderProps {
	recipe: {
		title: string;
		prep_time: string;
		cook_time: string;
		image?: string;
		difficulty: string;
		servings: number;
	};
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe }) => {
	const { title, prep_time, cook_time, image, difficulty, servings } = recipe;

	return (
		<div className="w-full max-w-[675] bg-medium/20 shadow-md rounded-lg overflow-hidden text-dark">
			{/* Recipe Title */}
			<h1 className="text-2xl font-bold text-start mt-2 ml-4 sm:ml-6 overflow-scroll">
				{title}
			</h1>

			{/* Image Section */}
			<div className="w-full max-h-[400px] md:max-h-[500px] flex items-center justify-center bg-dark/10 overflow-hidden mt-3 transition-all duration-500 ease-in-out">
				{image ? (
					<img
						src={image}
						alt={title}
						className="w-full h-full object-cover rounded-lg"
					/>
				) : (
					<p className="text-medium text-lg">Image not available</p>
				)}
			</div>

			{/* Recipe Details */}
			<div className="flex gap-3 p-4 justify-between items-center">
				<div className="flex gap-4 sm:gap-6 w-60">
					{/* prep time */}
					<div className="flex flex-col items-start gap-y-0.5">
						<div className="flex gap-2 items-center">
							<TbClock size={22} className="text-dark/80" />
							<p className="text-xs font-semibold text-dark">
								Prep
							</p>
						</div>
						<p className="text-xs text-dark">{prep_time} minutes</p>
					</div>
					{/* cook time */}
					<div className="flex flex-col items-start gap-y-0.5">
						<div className="flex gap-2 items-center">
							<TbClock size={22} className="text-dark/80" />
							<p className="text-xs font-semibold text-dark">
								Cook
							</p>
						</div>
						<p className="text-xs text-dark/90">
							{cook_time} minutes
						</p>
					</div>

					{/* servings */}
					<div className="flex flex-col">
						<div className="flex gap-1">
							<TbSoup size={22} className="text-dark/80" />
							<p className="text-md font-semibold">{servings}</p>
						</div>
						<p className="text-xs">Serves</p>
					</div>
				</div>

				{/* difficulty */}
				<div className="flex items-center gap-1 pr-1 sm:pr-3">
					<TbChefHat size={22} className="text-dark" />
					<p className="text-md capitalize">{difficulty}</p>
				</div>
			</div>
		</div>
	);
};

export default RecipeHeader;
