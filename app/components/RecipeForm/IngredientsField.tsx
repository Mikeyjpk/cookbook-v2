import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { RecipeFormData } from "@/types/RecipeForm";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface IngredientsFieldProps {
	ingredientFields: { id?: string }[];
	appendIngredient: UseFieldArrayAppend<RecipeFormData, "ingredients">;
	removeIngredient: UseFieldArrayRemove;
	register: any;
	existingIngredients: any[];
}

const IngredientsField: React.FC<IngredientsFieldProps> = ({
	ingredientFields,
	appendIngredient,
	removeIngredient,
	register,
	existingIngredients,
}) => {
	return (
		<div className="bg-black/10 p-4 rounded-md">
			<div className="flex justify-between items-center">
				<label className="text-2xl font-semibold">Ingredients</label>
				<button
					className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
					type="button"
					onClick={() =>
						appendIngredient({
							name: "",
							quantity: 1,
							unit: "",
						})
					}
				>
					<MdAdd size={20} />
					<span>Add</span>
				</button>
			</div>

			{ingredientFields.map((item, index) => {
				return (
					<div
						key={item.id || `ingredient-${index}`}
						className="flex gap-2 mt-2 items-center"
					>
						{/* Input for ingredient name */}
						<Input
							list={`ingredient-options-${index}`}
							{...register(`ingredients.${index}.name`, {
								required: "Ingredient is required",
							})}
							placeholder="Search or enter a new ingredient"
							className="flex-1 text-xs"
						/>

						{/* Datalist for existing ingredients */}
						<datalist id={`ingredient-options-${index}`}>
							{existingIngredients.map((ingredient) => (
								<option
									key={ingredient.id}
									value={ingredient.name}
								/>
							))}
						</datalist>

						{/* Input for quantity */}
						<Input
							{...register(`ingredients.${index}.quantity`, {
								required: "Quantity is required",
								valueAsNumber: true,
							})}
							type="number"
							placeholder="Quantity"
							step="any"
							min="1"
							className="w-20 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						/>

						{/* Input for unit */}
						<Input
							{...register(`ingredients.${index}.unit`)}
							type="text"
							placeholder="Unit"
							className="w-20 text-center"
						/>

						{/* Remove ingredient button */}
						<button
							type="button"
							onClick={() => removeIngredient(index)}
							className="text-red-500 hover:text-red-700"
						>
							<RiDeleteBin2Fill size={20} />
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default IngredientsField;
