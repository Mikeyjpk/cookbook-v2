"use client";

import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";

//todo: try using a post request to query all current ingredients in the data base, the user can then select from this ingredients or add a new one.
// if the user tries to add an ingredient that is already in the database, use it instead, or throw an error

interface StepInput {
	order: number;
	description: string;
}

interface IngredientInput {
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

	const onSubmit = async (data: RecipeFormData) => {
		try {
			const response = await axios.post("/api/recipes", data);
			console.log("recipe created", response.data);
		} catch (error) {
			console.error("Error creating recipe", error);
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
				{ingredientFields.map((item, index) => (
					<div key={item.id} className="flex gap-2">
						<input
							{...register(`ingredients.${index}.name`, {
								required: "Ingredient name is required",
							})}
							type="text"
							placeholder={`Ingredient ${index + 1} name`}
						/>
						<input
							{...register(`ingredients.${index}.description`)}
							type="text"
							placeholder={`Description`}
						/>
						<input
							{...register(`ingredients.${index}.quantity`, {
								required: "Quantity is required",
							})}
							type="number"
							placeholder={`Quantity`}
						/>
						<input
							{...register(`ingredients.${index}.unit`)}
							type="text"
							placeholder={`Unit (e.g., cups, grams)`}
						/>
						<button
							type="button"
							onClick={() => removeIngredient(index)}
							className="text-red-500"
						>
							Remove
						</button>
						{errors.ingredients?.[index]?.name && (
							<span>
								{errors.ingredients[index].name.message}
							</span>
						)}
					</div>
				))}
				<button
					type="button"
					onClick={() =>
						appendIngredient({ name: "", quantity: 0, unit: "" })
					}
				>
					Add Ingredient
				</button>
			</div>

			{/* Step Inputs */}
			<div>
				<label>Steps</label>
				{stepFields.map((item, index) => (
					<div key={item.id} className="flex gap-2">
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
