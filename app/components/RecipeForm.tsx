"use client";

import { useForm } from "react-hook-form";
import axio from "axios";

interface RecipeFormData {
	title: string;
}

const RecipeForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RecipeFormData>();

	const onSubmit = async (data: RecipeFormData) => {
		try {
			const response = await axio.post("/api/recipes", data);

			console.log("recipe created", response.data);
		} catch (error) {
			console.error("Error creating recipe", error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="p-4">
			<div className="mb-4">
				<label
					htmlFor="title"
					className="block mb-2 font-medium text-gray-900 dark:text-gray-300"
				>
					Title
				</label>
				<input
					{...register("title", { required: "Title is required" })}
					id="title"
					type="text"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Enter recipe title"
				/>
				{errors.title && <span>{errors.title.message}</span>}
			</div>

			<button
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Submit
			</button>
		</form>
	);
};

export default RecipeForm;
