const RecipeInfo: React.FC<{
	description: string;
	prep_time: number;
	cook_time: number;
	difficulty: string;
	servings: number;
}> = ({ description, prep_time, cook_time, difficulty, servings }) => {
	return (
		<div className="w-full max-w-2xl bg-light p-6 mt-6 rounded-lg shadow-lg">
			<p className="text-dark text-lg font-medium mb-2">{description}</p>

			<div className="grid grid-cols-2 gap-4 text-medium">
				<div>
					<strong>Prep Time:</strong> {prep_time} mins
				</div>
				<div>
					<strong>Cook Time:</strong> {cook_time} mins
				</div>
				<div>
					<strong>Difficulty:</strong> {difficulty}
				</div>
				<div>
					<strong>Servings:</strong> {servings}
				</div>
			</div>
		</div>
	);
};

export default RecipeInfo;
