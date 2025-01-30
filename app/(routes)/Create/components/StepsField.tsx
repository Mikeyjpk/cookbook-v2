"use client";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { RecipeFormData } from "@/types/RecipeForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface StepsFieldProps {
	stepFields: { id?: string; order: number }[];
	appendStep: UseFieldArrayAppend<RecipeFormData, "steps">;
	removeStep: UseFieldArrayRemove;
	register: any;
	errors: any;
}

const StepsField: React.FC<StepsFieldProps> = ({
	stepFields,
	appendStep,
	removeStep,
	register,
	errors,
}) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4 flex flex-col gap-4">
				{/* Title & Add Button */}
				<div className="flex justify-between items-center">
					<Label className="text-dark font-medium">Steps</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="border-medium/60 hover:bg-medium/20 flex items-center gap-1"
						onClick={() =>
							appendStep({
								order: stepFields.length + 1,
								description: "",
							})
						}
					>
						<MdAdd size={18} />
						<span>Add</span>
					</Button>
				</div>

				{/* Steps List */}
				<div className="flex flex-col gap-3">
					{stepFields.map((item, index) => (
						<div
							key={item.id || `step-${index}`}
							className="flex items-center gap-2 border border-medium/40 p-3 rounded-lg bg-medium/10"
						>
							{/* Step Number */}
							<Input
								{...register(`steps.${index}.order`)}
								type="number"
								value={index + 1}
								readOnly
								className="w-16 text-center bg-light border-medium/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							/>

							{/* Step Description */}
							<Input
								{...register(`steps.${index}.description`, {
									required: "Step description is required",
								})}
								type="text"
								placeholder={`Describe Step ${index + 1}`}
								className="flex-1 bg-light border-medium/60"
							/>

							{/* Remove Step Button */}
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="text-danger hover:bg-danger/20"
								onClick={() => removeStep(index)}
							>
								<RiDeleteBin2Fill size={18} />
							</Button>

							{/* Validation Error */}
							{errors.steps?.[index]?.description && (
								<span className="text-danger text-sm">
									{errors.steps[index].description.message}
								</span>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default StepsField;
