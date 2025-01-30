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

export interface RecipeFormData {
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
	image?: string;
}
