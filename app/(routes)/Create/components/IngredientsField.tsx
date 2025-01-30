"use client";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { RecipeFormData } from "@/types/RecipeForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface IngredientsFieldProps {
	ingredientFields: { id?: string }[];
	appendIngredient: UseFieldArrayAppend<RecipeFormData, "ingredients">;
	removeIngredient: UseFieldArrayRemove;
	register: any;
	errors: any;
	existingIngredients: any[];
	setValue: any;
}

const parseFractionToDecimal = (value: string): number => {
	const fractionRegex = /^(\d+)\/(\d+)$/; // Matches "1/2"

	// Match a simple fraction (e.g., "1/2" → 0.5)
	const fractionMatch = value.match(fractionRegex);
	if (fractionMatch) {
		const numerator = parseFloat(fractionMatch[1]); // Numerator
		const denominator = parseFloat(fractionMatch[2]); // Denominator
		const decimalValue = numerator / denominator;
		return parseFloat(decimalValue.toFixed(3)); // Allow any whole number
	}

	// Parse as a normal decimal or whole number
	const numericValue = parseFloat(value);
	if (!isNaN(numericValue)) {
		return parseFloat(numericValue.toFixed(3)); // Allow any whole number
	}

	// Default return (invalid input)
	return 0;
};

const IngredientsField: React.FC<IngredientsFieldProps> = ({
	ingredientFields,
	appendIngredient,
	removeIngredient,
	register,
	errors,
	existingIngredients,
	setValue,
}) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4 flex flex-col gap-4">
				{/* Title & Add Button */}
				<div className="flex justify-between items-center">
					<Label className="text-dark font-medium">Ingredients</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="border-medium/60 hover:bg-medium/20 flex items-center gap-1"
						onClick={() =>
							appendIngredient({
								name: "",
								quantity: 0, // FIX: Ensure quantity is always a number
								unit: "",
							})
						}
					>
						<MdAdd size={18} />
						<span>Add</span>
					</Button>
				</div>

				{/* Ingredients List */}
				<div className="flex flex-col gap-3">
					{ingredientFields.map((item, index) => (
						<div
							key={item.id || `ingredient-${index}`}
							className="flex flex-col gap-2 border border-medium/40 p-3 rounded-lg bg-medium/10"
						>
							{/* Ingredient Row (Name, Quantity, Unit, Delete Button) */}
							<div className="flex items-center gap-2">
								{/* Ingredient Name */}
								<Input
									list={`ingredient-options-${index}`}
									{...register(`ingredients.${index}.name`, {
										required: "Ingredient is required",
									})}
									placeholder="Search or enter ingredient"
									className="text-sm bg-light border-medium/60"
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

								{/* Quantity */}
								<Input
									{...register(
										`ingredients.${index}.quantity`,
										{
											required: "Quantity is required",
										}
									)}
									type="text"
									placeholder="Qty"
									className="w-16 text-center bg-light border-medium/60"
									onBlur={(e) => {
										const newValue = parseFractionToDecimal(
											e.target.value
										);
										setValue(
											`ingredients.${index}.quantity`,
											newValue
										);
									}}
								/>

								{/* Unit */}
								<Input
									{...register(`ingredients.${index}.unit`, {
										required: "Unit is required",
									})}
									type="text"
									placeholder="Unit"
									className="w-16 text-center bg-light border-medium/60"
								/>

								{/* Remove Ingredient Button */}
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="text-danger hover:bg-danger/20"
									onClick={() => removeIngredient(index)}
								>
									<RiDeleteBin2Fill size={18} />
								</Button>
							</div>

							{/* Error Messages */}
							<div className="flex flex-col text-danger text-xs">
								{errors.ingredients?.[index]?.name && (
									<span>
										{errors.ingredients[index].name.message}
									</span>
								)}
								{errors.ingredients?.[index]?.quantity && (
									<span>
										{
											errors.ingredients[index].quantity
												.message
										}
									</span>
								)}
								{errors.ingredients?.[index]?.unit && (
									<span>
										{errors.ingredients[index].unit.message}
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default IngredientsField;
