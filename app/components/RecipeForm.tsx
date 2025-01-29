"use client";

import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm, useController } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from "uuid";
import { categoryLookup } from "@/app/utilities/categoryLookup";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";

// Interface definitions
interface CategoryField {
	name: string;
}
interface StepInput {
	order: number;
	description: string;
}

interface IngredientInput {
	id?: string; // Unique id (can be string or number)
	name: string;
	description?: string;
	quantity?: number;
	unit?: string;
}

interface RecipeFormData {
	title: string;
	description?: string;
	prep_time: number;
	cook_time: number;
	steps: StepInput[];
	ingredients: IngredientInput[];
	categories: CategoryField[];
	isPrivate: boolean;
	difficulty: string;
	servings: number;
}

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
			{/* title input */}
			<div className="flex relative">
				<input
					{...register("title", {
						required: "Title is required",
					})}
					id="title"
					type="text"
					placeholder=" Enter recipe title"
					className="w-full h-10 border-[1.5px] border-secondary/60 rounded-md"
				/>
				{errors.title && (
					<span className="text-danger flex justify-center absolute right-4 top-1.5">
						{errors.title.message}
					</span>
				)}
			</div>

			{/* todo: add button to remove the image & delete from cloudinary */}
			{/* image upload */}
			<div className="flex bg-primary/20 w-full h-60 rounded-lg justify-center items-center">
				{imageUrl ? (
					<>
						<img
							src={imageUrl}
							alt="Recipe"
							className="w-auto h-52 object-cover rounded-lg"
						/>
					</>
				) : (
					<div className="flex flex-col items-center justify-center gap-6 border-2 border-secondary/70 border-dashed rounded-lg w-11/12 h-5/6">
						<div className="text-sm text-dark/70 font-semibold">
							Upload an image for your recipe
						</div>

						<label
							htmlFor="image"
							className="flex justify-center items-center rounded-full bg-secondary w-24 h-10 text-light hover:cursor-pointer"
						>
							Browse
						</label>

						<input
							type="file"
							id="image"
							accept="image/*"
							onChange={onImageUpload}
							className="hidden"
						/>
					</div>
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

			{/* make this a model pop up, button that opens the model */}
			{/* Categories */}
			<div>
				<label>Categories</label>
				<div>
					<input
						type="text"
						list="category-list"
						placeholder="Select a category"
						value={tempCategory}
						onChange={(e) => setTempCategory(e.target.value)}
					/>
					<datalist id="category-list">
						{categoryOptions.map((cat) => (
							<option key={cat} value={cat} />
						))}
					</datalist>
					<button
						type="button"
						onClick={() => {
							// Only append if user typed a valid category
							const trimmed = tempCategory.trim();
							if (isValidCategory(trimmed)) {
								append({ name: trimmed });
								setTempCategory("");
							} else {
								alert(
									"Please select a category from the list."
								);
							}
						}}
					>
						+ Add Category
					</button>
				</div>

				{/* Render already-added categories */}
				<ul style={{ marginTop: "1rem" }}>
					{categoryFields.map((field, index) => (
						<li
							key={field.id}
							style={{ display: "flex", gap: "1rem" }}
						>
							<input
								{...register(
									`categories.${index}.name` as const
								)}
								readOnly
							/>
							<button type="button" onClick={() => remove(index)}>
								Remove
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* PRIVACY TOGGLE (ShadCN) */}
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
				<div className="text-xs text-primary/80">
					make this recipe just for you!
				</div>
			</div>

			{/* DIFFICULTY RADIO BUTTONS (ShadCN) */}
			<div>
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

			{/* SERVINGS INPUT  */}
			<div>
				<label htmlFor="servings">Serves</label>
				<input
					id="servings"
					type="number"
					min={1}
					{...register("servings", {
						required: "Please specify how many servings",
						valueAsNumber: true,
					})}
					className="border rounded p-1 w-32"
				/>
				{errors.servings && (
					<p className="text-red-500 text-sm">
						{errors.servings.message}
					</p>
				)}
			</div>

			{/* Ingredients */}
			<div className="bg-black/10">
				<div className="flex justify-between">
					<label className="text-2xl">Ingredients</label>

					<button
						className="flex gap-1"
						onClick={() =>
							appendIngredient({
								name: "",
								quantity: 1,
								unit: "",
							})
						}
					>
						<div> add</div>
						<MdAdd size={24} />
					</button>
				</div>

				{ingredientFields.map((item, index) => {
					const uniqueKey = item.id || `ingredient-${index}`; // Fallback to a unique string using index
					return (
						<div key={uniqueKey} className="flex gap-2">
							{/* Input for ingredient name */}
							<input
								list={`ingredient-options-${index}`} // Binding to the corresponding datalist
								{...register(`ingredients.${index}.name`, {
									required: "Ingredient is required",
								})}
								placeholder="Type to select an ingredient"
							/>

							{/* Datalist for existing ingredients */}
							<datalist id={`ingredient-options-${index}`}>
								{existingIngredients.map((ingredient) => (
									<option
										key={ingredient.id || uuidv4()}
										value={ingredient.name}
									/>
								))}
							</datalist>

							{/* Input for quantity */}
							<input
								{...register(`ingredients.${index}.quantity`, {
									required: "Quantity is required",
									valueAsNumber: true, // Ensure the value is treated as a number
								})}
								type="number"
								placeholder="Quantity"
								step="any" // Allows any decimal value (e.g., 0.5, 1.25)
								min="1" // Optional: Ensures the quantity cannot be negative
								className="flex w-10"
							/>

							{/* Input for unit */}
							<input
								{...register(`ingredients.${index}.unit`)}
								type="text"
								placeholder="Unit"
								className="w-10"
							/>

							{/* Remove ingredient button */}
							<button
								type="button"
								onClick={() => removeIngredient(index)}
								className="text-red-500"
							>
								<RiDeleteBin2Fill />
							</button>
						</div>
					);
				})}
			</div>

			{/* Steps */}
			<div>
				<label>Steps</label>
				{stepFields.map((item, index) => (
					<div key={`${item.order}-${index}`} className="flex gap-2">
						<input
							{...register(`steps.${index}.order`)}
							type="number"
							value={index + 1}
							readOnly
							className="w-16"
						/>
						<input
							{...register(`steps.${index}.description`, {
								required: "Step description is required",
							})}
							type="text"
							placeholder={`Step ${index + 1} description`}
						/>
						<button
							type="button"
							onClick={() => removeStep(index)}
							className="text-red-500"
						>
							Remove
						</button>
						{errors.steps?.[index]?.description && (
							<span>
								{errors.steps[index].description.message}
							</span>
						)}
					</div>
				))}

				<button
					type="button"
					onClick={() =>
						appendStep({
							order: stepFields.length + 1,
							description: "",
						})
					}
				>
					Add Step
				</button>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default RecipeForm;
