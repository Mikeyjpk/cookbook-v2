import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { RecipeFormData } from "@/types/RecipeForm";
import { Input } from "@/components/ui/input";

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
		<div className="bg-gray-100 p-4 rounded-md">
			<div className="flex justify-between items-center">
				<label className="text-2xl font-semibold">Steps</label>
				<button
					className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
					type="button"
					onClick={() =>
						appendStep({
							order: stepFields.length + 1,
							description: "",
						})
					}
				>
					<MdAdd size={20} />
					<span>Add</span>
				</button>
			</div>

			{stepFields.map((item, index) => (
				<div
					key={item.id || `step-${index}`}
					className="flex gap-2 mt-2 items-center"
				>
					{/* Step Number */}
					<Input
						{...register(`steps.${index}.order`)}
						type="number"
						value={index + 1}
						readOnly
						className="w-16 text-center bg-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					/>

					{/* Step Description */}
					<Input
						{...register(`steps.${index}.description`, {
							required: "Step description is required",
						})}
						type="text"
						placeholder={`Describe Step ${index + 1}`}
						className="flex-1"
					/>

					{/* Remove Step Button */}
					<button
						type="button"
						onClick={() => removeStep(index)}
						className="text-red-500 hover:text-red-700"
					>
						<RiDeleteBin2Fill size={20} />
					</button>

					{/* Validation Error */}
					{errors.steps?.[index]?.description && (
						<span className="text-red-500 text-sm">
							{errors.steps[index].description.message}
						</span>
					)}
				</div>
			))}
		</div>
	);
};

export default StepsField;
