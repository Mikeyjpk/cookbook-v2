import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const DeleteRecipeButton: React.FC<{ recipeId: string }> = ({ recipeId }) => {
	const router = useRouter();

	const handleDeleteRecipe = async () => {
		try {
			await axios.delete(`/api/recipes/${recipeId}`);
			alert("Recipe deleted successfully");
			router.push("/Recipes");
		} catch (error) {
			console.error("Error deleting recipe:", error);
			alert("Failed to delete recipe");
		}
	};

	return (
		<div className="w-full flex justify-end pt-6">
			<Button
				variant="destructive"
				className="text-sm"
				onClick={handleDeleteRecipe}
			>
				Delete Recipe
			</Button>
		</div>
	);
};

export default DeleteRecipeButton;
