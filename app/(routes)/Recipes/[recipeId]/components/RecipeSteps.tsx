import { useState } from "react";

const RecipeSteps: React.FC<{ steps: any[] }> = ({ steps }) => {
	const [completedSteps, setCompletedSteps] = useState<Set<number>>(
		new Set()
	);

	const toggleStep = (index: number) => {
		setCompletedSteps((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(index)) {
				newSet.delete(index);
			} else {
				newSet.add(index);
			}
			return newSet;
		});
	};

	return (
		<div className="w-full max-w-2xl mt-6 select-none">
			<h2 className="text-xl font-semibold text-dark mb-2">Steps</h2>
			<div className="space-y-2">
				{steps.length > 0 ? (
					steps.map((step: any, index) => (
						<div
							key={`${step.order ?? "step"}-${index}`} // Unique key format
							onClick={() => toggleStep(index)}
							className={`flex gap-3 items-start p-3 rounded-md cursor-pointer transition-colors ${
								completedSteps.has(index)
									? "bg-medium/20 text-light"
									: "bg-medium/60 text-dark"
							}`}
						>
							<span className="font-bold text-dark">
								{step.order}.
							</span>
							<p>{step.description}</p>
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
