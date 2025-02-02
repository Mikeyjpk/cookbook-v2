const RecipeImage: React.FC<{ image: string | null; title: string }> = ({
	image,
	title,
}) => {
	return (
		<div
			className="
			w-full
			max-h-[600px]
			bg-dark/10
			rounded-lg 
			overflow-hidden 
			flex 
			items-center 
			justify-center 
			shadow-md
			border
			border-medium/50


			max-w-[700px]
			object-fit
		"
		>
			{image ? (
				<img src={image} alt={title} className="w-auto h-full" />
			) : (
				<div className="text-medium text-sm">No Image Available</div>
			)}
		</div>
	);
};

export default RecipeImage;
