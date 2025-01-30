export interface Recipe {
	steps: Step[];
	recipe_id: string;
	author_id: string;
	author_name: string;
	title: string;
	description: string;
	prep_time: number;
	cook_time: number;
	difficulty: "beginner" | "easy" | "medium" | "difficult";
	isPrivate: boolean;
	servings: number;
	image: string | null;
	categories: string[];
	createdAt: string; // ISO Date String
	updatedAt: string; // ISO Date String
	recipeIngredients: RecipeIngredient[];
}

export interface Step {
	order: number;
	description: string;
}

export interface RecipeIngredient {
	id: string;
	recipeId: string;
	ingredientId: string;
	quantity: number;
	unit: string;
}
