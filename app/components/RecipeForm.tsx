"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// Interface definitions
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
	fields?: Record<string, any>;
}

const RecipeForm: React.FC = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const [existingIngredients, setExistingIngredients] = useState<
		IngredientInput[]
	>([]);

	useEffect(() => {
		console.log("useEffect is running"); // Check if this appears in the console

		const fetchIngredients = async () => {
			try {
				const response = await axios.get("/api/ingredients");
				console.log("Fetched ingredients:", response.data); // Log to see the response
				if (response.data) {
					setExistingIngredients(response.data); // Set the ingredients in state
				}
			} catch (error) {
				console.error("Error fetching ingredients:", error);
			}
		};

		fetchIngredients();
	}, []);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RecipeFormData>({
		defaultValues: {
			steps: [{ order: 1, description: "" }],
			ingredients: [{ name: "", quantity: 0, unit: "" }],
		},
	});

	const onImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
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

	console.log(existingIngredients);
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-black/50 flex flex-col gap-3"
		>
			{/* title input */}
			<div>
				<label htmlFor="title">Title</label>
				<input
					{...register("title", { required: "Title is required" })}
					id="title"
					type="text"
					placeholder="Enter recipe title"
				/>
				{errors.title && <span>{errors.title.message}</span>}
			</div>

			{/* image upload */}
			<div className="flex bg-red-500/20 gap-3">
				<label htmlFor="image">Recipe Image</label>
				<input
					type="file"
					id="image"
					accept="image/*"
					onChange={onImageUpload}
				/>
				{imageUrl && (
					<img
						src={imageUrl}
						alt="Recipe"
						className="w-32 h-32 object-cover"
					/>
				)}
			</div>

			{/* description input */}
			<div>
				<label htmlFor="description">Description</label>
				<input
					{...register("description")}
					id="description"
					type="text"
					placeholder="Enter recipe description"
				/>
				{errors.description && (
					<span>{errors.description.message}</span>
				)}
			</div>

			{/* prep time */}
			<div>
				<label htmlFor="prep_time">Prep Time</label>
				<input
					{...register("prep_time", {
						required: "Required",
					})}
					id="prep_time"
					type="text"
					placeholder="Prep time in minutes"
				/>
				{errors.prep_time && <span>{errors.prep_time.message}</span>}
			</div>

			{/* cook time */}
			<div>
				<label htmlFor="cook_time">Cook Time</label>
				<input
					{...register("cook_time", {
						required: "Required",
					})}
					id="cook_time"
					type="text"
					placeholder="Cook time in minutes"
				/>
				{errors.cook_time && <span>{errors.cook_time.message}</span>}
			</div>

			{/* Ingredient Inputs */}
			<div>
				<label>Ingredients</label>
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
								placeholder="Type or select an ingredient"
							/>

							{/* Datalist for existing ingredients */}
							<datalist id={`ingredient-options-${index}`}>
								{existingIngredients.map((ingredient) => (
									<option
										key={ingredient.id || uuidv4()} // Ensuring each option has a unique key
										value={ingredient.name} // Displaying the ingredient name in the input
									>
										{ingredient.name}
									</option>
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
								min="0" // Optional: Ensures the quantity cannot be negative
							/>

							{/* Input for unit */}
							<input
								{...register(`ingredients.${index}.unit`)}
								type="text"
								placeholder="Unit"
							/>

							{/* Remove ingredient button */}
							<button
								type="button"
								onClick={() => removeIngredient(index)}
								className="text-red-500"
							>
								Remove
							</button>
						</div>
					);
				})}

				{/* Add ingredient button */}
				<button
					type="button"
					onClick={() =>
						appendIngredient({ name: "", quantity: 0, unit: "" })
					}
				>
					Add Ingredient
				</button>
			</div>

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
