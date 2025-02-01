const RecipeIngredients: React.FC<{ ingredients: any[] }> = ({
	ingredients,
}) => {
	return (
		<div className="w-full max-w-2xl mt-6">
			<h2 className="text-xl font-semibold text-dark mb-2">
				Ingredients
			</h2>
			<div className="grid grid-cols-2 gap-3">
				{ingredients.length > 0 ? (
					ingredients.map((ingredient: any, index) => (
						<div
							key={ingredient.id ?? `ingredient-${index}`}
							className="bg-medium/10 p-3 rounded-md shadow-sm"
						>
							<p className="text-dark font-medium">
								{ingredient.quantity} {ingredient.unit}
							</p>
						</div>
					))
				) : (
					<p className="text-medium">No ingredients listed.</p>
				)}
			</div>
		</div>
	);
};

export default RecipeIngredients;
