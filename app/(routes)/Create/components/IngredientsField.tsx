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
}

const IngredientsField: React.FC<IngredientsFieldProps> = ({
	ingredientFields,
	appendIngredient,
	removeIngredient,
	register,
	errors,
	existingIngredients,
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
								quantity: 1,
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
											valueAsNumber: true,
										}
									)}
									type="number"
									placeholder="Qty"
									step="any"
									min="1"
									className="w-16 text-center bg-light border-medium/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

							{/* Error Messages (Placed Below the Row) */}
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
