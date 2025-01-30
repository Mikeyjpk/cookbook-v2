"use client";

import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { categoryLookup } from "@/app/utilities/categoryLookup";
import { RecipeFormData } from "@/types/RecipeForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Form components
import ImageUpload from "./ImageUpload";
import TitleInput from "./TitleInput";
import TimeInputs from "./TimeInputs";
import DifficultySelector from "./DifficultySelector";
import PrivacyToggle from "./PrivacyToggle";
import DescriptionInput from "./DescriptionInput";
import CategorySelector from "./CategorySelector";
import ServingsInput from "./ServingsInput";
import IngredientsField from "./IngredientsField";
import StepsField from "./StepsField";

interface RecipeFormProps {
	existingIngredients: any[];
}

const categoryOptions = Object.values(categoryLookup);

const RecipeForm: React.FC<RecipeFormProps> = ({ existingIngredients }) => {
	const { toast } = useToast();
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
		setValue,
		reset,
	} = useForm<RecipeFormData>({
		defaultValues: {
			steps: [{ order: 1, description: "" }],
			ingredients: [{ name: "", quantity: 1, unit: "" }],
			categories: [],
			isPrivate: false,
			servings: 1,
		},
	});

	// Field array for steps
	const {
		fields: stepFields,
		append: appendStep,
		remove: removeStep,
	} = useFieldArray({
		control,
		name: "steps",
	});

	// Field array for ingredients
	const {
		fields: ingredientFields,
		append: appendIngredient,
		remove: removeIngredient,
	} = useFieldArray({
		control,
		name: "ingredients", // Points to the 'ingredients' field in the form data
	});

	// Feild array for categories
	const {
		fields: categoryFields,
		append,
		remove,
	} = useFieldArray({
		control,
		name: "categories",
	});

	const onSubmit = async (data: RecipeFormData) => {
		const updatedData = {
			...data,
			prep_time: Number(data.prep_time),
			cook_time: Number(data.cook_time),
			ingredients: data.ingredients.map((ingredient) => ({
				...ingredient,
				quantity: Number(ingredient.quantity), // Ensure quantity is numeric
			})),
			image: imageUrl,
		};

		try {
			const response = await axios.post("/api/recipes", updatedData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			toast({
				title: "Recipe Submitted!",
				description: "Your recipe has been successfully added.",
				variant: "default",
			});

			reset({
				title: "",
				prep_time: 0,
				cook_time: 0,
				description: "",
				steps: [{ order: 1, description: "" }],
				ingredients: [{ name: "", quantity: 1, unit: "" }],
				categories: [],
				isPrivate: false,
				difficulty: "beginner",
				servings: 1,
			});

			setImageUrl(null);
		} catch (error) {
			console.error("Error creating recipe:", error);

			toast({
				title: "Submission Failed",
				description: "There was an error submitting your recipe.",
				variant: "destructive",
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 py-6"
		>
			<TitleInput register={register} errors={errors} />

			{/* todo: add delete fx to remove images from cloundinary */}
			<ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />

			<TimeInputs register={register} errors={errors} />

			<DescriptionInput register={register} errors={errors} />

			<CategorySelector
				categoryOptions={categoryOptions}
				categoryFields={categoryFields}
				append={append}
				remove={remove}
				register={register}
			/>

			<PrivacyToggle watch={watch} setValue={setValue} />

			<DifficultySelector watch={watch} setValue={setValue} />

			<ServingsInput
				register={register}
				setValue={setValue}
				watch={watch}
				errors={errors}
			/>

			<IngredientsField
				errors={errors}
				ingredientFields={ingredientFields}
				appendIngredient={appendIngredient}
				removeIngredient={removeIngredient}
				register={register}
				setValue={setValue} // Add this line to pass setValue
				existingIngredients={existingIngredients}
			/>

			<StepsField
				stepFields={stepFields}
				appendStep={appendStep}
				removeStep={removeStep}
				register={register}
				errors={errors}
			/>

			<Button
				type="submit"
				className="w-full bg-dark text-light py-3 rounded-lg text-lg font-semibold hover:bg-dark/90 transition duration-200"
			>
				Publish Recipe
			</Button>
		</form>
	);
};

export default RecipeForm;
