"use client";

import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm, useController } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { categoryLookup } from "@/app/utilities/categoryLookup";

// Form components
import ImageUpload from "../../../components/RecipeForm/ImageUpload";
import CategorySelector from "../../../components/RecipeForm/CategorySelector";
import ServingsInput from "../../../components/RecipeForm/ServingsInput";
import IngredientsField from "../../../components/RecipeForm/IngredientsField";
import StepsField from "../../../components/RecipeForm/StepsField";

// UI imports
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { Switch } from "@/components/ui/switch";

// Types
import { RecipeFormData } from "@/types/RecipeForm";

interface RecipeFormProps {
	existingIngredients: any[];
}

const categoryOptions = Object.values(categoryLookup);

const RecipeForm: React.FC<RecipeFormProps> = ({ existingIngredients }) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [tempCategory, setTempCategory] = useState("");
	const [isloading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useForm<RecipeFormData>({
		defaultValues: {
			steps: [{ order: 1, description: "" }],
			ingredients: [{ name: "", quantity: 1, unit: "" }],
			categories: [],
			isPrivate: false,
			servings: 1,
		},
	});

	// watch difficulty todo: add an image to display on different pick
	const selectedDifficulty = watch("difficulty");

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

	const onImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsLoading(true);
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async () => {
			try {
				const response = await axios.post("/api/recipes/uploadImage", {
					image: reader.result,
				});
				setImageUrl(response.data.imageUrl);
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		};
		reader.readAsDataURL(file);
		setIsLoading(false);
	};

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
			console.log("Recipe created:", response.data);
		} catch (error) {
			console.error("Error creating recipe:", error);
		}
	};

	// Helper: Check if user typed an exact match from categoryOptions
	const isValidCategory = (cat: string) => {
		return categoryOptions.includes(cat);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			{/* add delete selected image fx */}
			<ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />

			{/* title input */}
			<div className="flex relative">
				<input
					{...register("title", {
						required: "Title is required",
					})}
					id="title"
					type="text"
					placeholder=" Enter recipe title"
					className="w-full h-10 border-[1.5px] rounded-md"
				/>
				{errors.title && (
					<span className="text-danger flex justify-center absolute right-4 top-1.5">
						{errors.title.message}
					</span>
				)}
			</div>

			{/* Time Inputs */}
			<div className="flex justify-evenly gap-3">
				{/* prep time */}
				<div className="flex flex-col">
					<input
						{...register("prep_time", {
							required: "Required",
						})}
						id="prep_time"
						type="text"
						placeholder=" Prep time (minutes)"
						className="w-full h-10 border-[1.5px] border-secondary/60 rounded-md"
					/>
					{errors.prep_time && (
						<span className="text-danger flex justify-center">
							{errors.prep_time.message}
						</span>
					)}
				</div>

				{/* cook time */}
				<div className="flex flex-col">
					<input
						{...register("cook_time", {
							required: "Required",
						})}
						id="cook_time"
						type="text"
						placeholder=" Cook time (minutes)"
						className="w-full h-10 border-[1.5px] border-secondary/60 rounded-md"
					/>
					{errors.cook_time && (
						<span className="text-danger flex justify-center">
							{errors.cook_time.message}
						</span>
					)}
				</div>
			</div>

			{/* description input */}
			<div>
				<textarea
					{...register("description")}
					id="description"
					placeholder=" Enter recipe description"
					className="w-full h-28 border-[1.5px] border-secondary/60 rounded-md"
				/>
				{errors.description && (
					<span>{errors.description.message}</span>
				)}
			</div>

			<CategorySelector
				categoryOptions={categoryOptions}
				categoryFields={categoryFields}
				append={append}
				remove={remove}
				register={register}
			/>

			{/* PRIVACY TOGGLE (ShadCN) */}
			<div>
				<div className="flex items-center gap-2">
					<label htmlFor="isPrivate" className="text-lg font-medium">
						Secret Recipe
					</label>
					<Switch
						id="isPrivate"
						checked={watch("isPrivate")}
						onCheckedChange={(checked) =>
							setValue("isPrivate", checked)
						}
					/>
				</div>
				<div className="text-xs text-primary/80">
					make this recipe just for you!
				</div>
			</div>

			{/* DIFFICULTY RADIO BUTTONS (ShadCN) */}
			<div>
				{/* todo: add dialog to describe the difficulties */}
				<Label className="block text-lg pb-3">Difficulty</Label>
				<RadioGroup
					defaultValue={watch("difficulty")}
					onValueChange={(value) => setValue("difficulty", value)}
					className="flex flex-col gap-3 hover:cursor-pointer mx-1"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="beginner" id="beginner" />
						<Label
							htmlFor="beginner"
							className="hover:cursor-pointer"
						>
							Beginner
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="easy" id="easy" />
						<Label htmlFor="easy" className="hover:cursor-pointer">
							Easy
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="medium" id="medium" />
						<Label
							htmlFor="medium"
							className="hover:cursor-pointer"
						>
							Medium
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="difficult" id="difficult" />
						<Label
							htmlFor="difficult"
							className="hover:cursor-pointer"
						>
							Difficult
						</Label>
					</div>
				</RadioGroup>
			</div>

			<ServingsInput
				register={register}
				setValue={setValue}
				watch={watch}
				errors={errors}
			/>

			<IngredientsField
				ingredientFields={ingredientFields}
				appendIngredient={appendIngredient}
				removeIngredient={removeIngredient}
				register={register}
				existingIngredients={existingIngredients}
			/>

			<StepsField
				stepFields={stepFields}
				appendStep={appendStep}
				removeStep={removeStep}
				register={register}
				errors={errors}
			/>

			<button type="submit">Submit</button>
		</form>
	);
};

export default RecipeForm;
