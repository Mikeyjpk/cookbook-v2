import { TbClock, TbChefHat, TbSoup } from "react-icons/tb";
import { GiTerror } from "react-icons/gi";

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
		<div className="flex flex-col">
			<div className="w-full max-w-[675] bg-medium/20 shadow-md rounded-lg overflow-hidden text-dark">
				{/* Recipe Title */}
				<h1 className="text-2xl font-bold text-start mt-3 ml-4 sm:ml-6 capitalize">
					{title}
				</h1>

				{/* Image Section */}
				<div className="w-full max-h-[400px] md:max-h-[500px] flex items-center justify-center bg-dark/10 overflow-hidden mt-3 transition-all duration-500 ease-in-out relative">
					{image ? (
						<img
							src={image}
							alt={title}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="flex flex-col w-full h-52 justify-center items-center">
							<GiTerror
								size={50}
								className="hover:scale-110 hover:cursor-not-allowed transition-all"
							/>
							<p>Image unavailable</p>
						</div>
					)}
					{/* difficulty */}
					<div className="flex gap-2 text-light absolute bottom-1 left-1 bg-dark/80 py-2 px-3 rounded-lg items-center">
						<TbChefHat size={22} />
						<p className="capitalize text-md text-light">
							{difficulty}
						</p>
					</div>
				</div>

				{/* Recipe Details */}
				<div className="flex gap-3 p-4 justify-between items-center">
					<div className="flex gap-4 sm:gap-6 w-60">
						{/* prep time */}
						<div className="flex flex-col items-center justify-center gap-y-1">
							<div className="flex gap-1 items-center">
								<TbClock size={22} className="text-dark/90" />
								<p className="text-md font-semibold text-dark">
									Prep
								</p>
							</div>
							<p className="text-xs text-dark">
								{prep_time} minutes
							</p>
						</div>
						{/* cook time */}
						<div className="flex flex-col items-center justify-center gap-y-1">
							<div className="flex gap-1 items-center">
								<TbClock size={22} className="text-dark/90" />
								<p className="text-md font-semibold text-dark">
									Cook
								</p>
							</div>
							<p className="text-xs text-dark">
								{cook_time} minutes
							</p>
						</div>
						{/* <div className="flex flex-col items-start gap-y-0.5">
							<div className="flex gap-2 items-center">
								<TbClock size={22} className="text-dark/80" />
								<p className="text-xs font-semibold text-dark">
									Cook
								</p>
							</div>
							<p className="text-xs text-dark/90">
								{cook_time} minutes
							</p>
						</div> */}
					</div>
					{/* servings */}
					<div className="flex flex-col ">
						<div className="flex gap-1">
							<TbSoup size={22} className="text-dark" />
							<p className="text-md font-semibold">{servings}</p>
						</div>
						<p className="text-sm">Serves</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeHeader;
