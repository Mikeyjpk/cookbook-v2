const RecipeIngredients: React.FC<{ ingredients: any[] }> = ({
	ingredients,
}) => {
	return (
		<div className="w-full max-w-2xl mt-6">
			<div className="flex w-full justify-between">
				<h2 className="text-xl font-semibold text-dark mb-2">
					Ingredients
				</h2>
				<button className="bg-dark rounded-lg w-12 text-light text-lg">
					add
				</button>
			</div>

			<div className="flex flex-col gap-3">
				{ingredients.length > 0 ? (
					ingredients.map(({ id, ingredient, quantity, unit }) => (
						<div
							key={id}
							className="bg-medium/10 p-3 rounded-md shadow-sm"
						>
							<p className="text-dark font-medium">
								{quantity} {unit} of {ingredient.name}
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
