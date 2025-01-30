const RecipeSteps: React.FC<{ steps: any[] }> = ({ steps }) => {
	return (
		<div className="w-full max-w-2xl mt-6">
			<h2 className="text-xl font-semibold text-dark mb-2">Steps</h2>
			<div className="space-y-2">
				{steps.length > 0 ? (
					steps.map((step: any) => (
						<div
							key={step.order}
							className="flex gap-3 items-start bg-gray-100 p-3 rounded-md"
						>
							<span className="font-bold text-medium">
								{step.order}.
							</span>
							<p className="text-dark">{step.description}</p>
						</div>
					))
				) : (
					<p className="text-medium">No steps provided.</p>
				)}
			</div>
		</div>
	);
};

export default RecipeSteps;
