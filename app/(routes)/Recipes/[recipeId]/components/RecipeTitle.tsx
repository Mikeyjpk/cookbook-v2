const RecipeTitle: React.FC<{ title: string }> = ({ title }) => {
	return (
		<div className="w-full max-w-2xl flex justify-between items-center mb-4">
			<h1 className="text-3xl font-bold text-dark">{title}</h1>
		</div>
	);
};

export default RecipeTitle;
