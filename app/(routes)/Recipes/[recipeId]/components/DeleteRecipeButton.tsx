"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

const DeleteRecipeButton: React.FC<{ recipeId: string }> = ({ recipeId }) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false); // ✅ State for opening/closing the dialog
	const [isDeleting, setIsDeleting] = useState(false); // ✅ Tracks delete operation

	const handleDeleteRecipe = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/api/recipes/${recipeId}`);
			setIsOpen(false); // Close dialog after successful deletion
			router.push("/Recipes");
		} catch (error) {
			console.error("Error deleting recipe:", error);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="flex pt-10">
			{/* ✅ Delete Button to open the dialog */}
			<Button
				variant="destructive"
				className="text-sm"
				onClick={() => setIsOpen(true)}
			>
				Delete Recipe
			</Button>

			{/* ✅ Confirmation Dialog */}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this recipe? This
							action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-end gap-2">
						<Button
							variant="outline"
							onClick={() => setIsOpen(false)}
							disabled={isDeleting}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={handleDeleteRecipe}
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Confirm Delete"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DeleteRecipeButton;
