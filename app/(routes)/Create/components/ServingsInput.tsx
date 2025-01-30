"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
	FieldErrors,
} from "react-hook-form";
import { RecipeFormData } from "@/types/RecipeForm"; // Ensure this path is correct

interface ServingsInputProps {
	register: UseFormRegister<RecipeFormData>;
	setValue: UseFormSetValue<RecipeFormData>;
	watch: UseFormWatch<RecipeFormData>;
	errors: FieldErrors<RecipeFormData>;
}

const ServingsInput: React.FC<ServingsInputProps> = ({
	register,
	setValue,
	watch,
	errors,
}) => {
	const servings = watch("servings") ?? 1; // Default to 1 if undefined

	const handleIncrease = () => setValue("servings", servings + 1);
	const handleDecrease = () => {
		if (servings > 1) setValue("servings", servings - 1);
	};

	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4 flex flex-col gap-3">
				{/* Title */}
				<div>
					<label htmlFor="servings" className="text-dark font-medium">
						Servings
					</label>
				</div>

				{/* Servings Counter */}
				<div className="flex items-center gap-3">
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={handleDecrease}
						disabled={servings <= 1}
						className="border-medium/60 hover:bg-medium/20 disabled:opacity-50"
					>
						<Minus size={16} />
					</Button>

					<Input
						id="servings"
						type="number"
						{...register("servings", {
							required: "Please specify how many servings",
							valueAsNumber: true,
							min: 1,
						})}
						value={servings}
						onChange={(e) =>
							setValue("servings", Number(e.target.value))
						}
						className="w-16 text-center bg-light border-medium/60 focus:ring-dark [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					/>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={handleIncrease}
						className="border-medium/60 hover:bg-medium/20"
					>
						<Plus size={16} />
					</Button>
				</div>

				{/* Error Message */}
				{errors.servings && (
					<p className="text-danger text-sm">
						{errors.servings.message}
					</p>
				)}
			</CardContent>
		</Card>
	);
};

export default ServingsInput;
