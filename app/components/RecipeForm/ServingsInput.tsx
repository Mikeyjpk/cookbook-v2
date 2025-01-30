import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
	FieldErrors,
} from "react-hook-form";
import { RecipeFormData } from "@/types/RecipeForm"; // Make sure this path is correct

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
	const servings = watch("servings") ?? 1; // Ensure it defaults to 1

	const handleIncrease = () => setValue("servings", servings + 1);
	const handleDecrease = () => {
		if (servings > 1) setValue("servings", servings - 1);
	};

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="servings" className="text-lg font-medium">
				Servings
			</label>
			<div className="flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={handleDecrease}
					disabled={servings <= 1}
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
					// ensure there is no spinner on the input
					className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				/>

				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={handleIncrease}
				>
					<Plus size={16} />
				</Button>
			</div>

			{errors.servings && (
				<p className="text-red-500 text-sm">
					{errors.servings.message}
				</p>
			)}
		</div>
	);
};

export default ServingsInput;
