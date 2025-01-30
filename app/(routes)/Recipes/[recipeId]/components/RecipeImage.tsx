const RecipeImage: React.FC<{ image: string | null; title: string }> = ({
	image,
	title,
}) => {
	return (
		<div className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border border-medium shadow-md">
			{image ? (
				<img
					src={image}
					alt={title}
					className="w-full h-full object-cover"
				/>
			) : (
				<div className="text-medium text-sm">No Image Available</div>
			)}
		</div>
	);
};

export default RecipeImage;
