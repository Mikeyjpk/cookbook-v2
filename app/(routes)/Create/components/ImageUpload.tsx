"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";
import { extractCloudinaryPublicId } from "@/app/utilities/cloudinaryUtils";

interface ImageUploadProps {
	imageUrl: string | null;
	setImageUrl: (url: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, setImageUrl }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [previousImageUrl, setPreviousImageUrl] = useState<string | null>(
		null
	);

	const deleteImageFromCloudinary = async (
		imageUrlToDelete: string | null
	) => {
		const publicId = extractCloudinaryPublicId(imageUrlToDelete);
		if (publicId) {
			try {
				const deleteResponse = await axios.post(
					"/api/recipes/deleteImage",
					{
						publicId,
					}
				);
			} catch (error) {
				console.error("Failed to delete previous image:", error);
			}
		}
	};

	const onImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsLoading(true);
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async () => {
			try {
				// Delete the previous image before uploading a new one
				if (previousImageUrl) {
					await deleteImageFromCloudinary(previousImageUrl);
				}

				// Upload the new image
				const response = await axios.post("/api/recipes/uploadImage", {
					image: reader.result,
				});
				setImageUrl(response.data.imageUrl);
				setPreviousImageUrl(response.data.imageUrl); // Store new image for future deletions
			} catch (error) {
				console.error("Error uploading image:", error);
			} finally {
				setIsLoading(false);
			}
		};
		reader.readAsDataURL(file);
	};

	const removeImage = async () => {
		if (imageUrl) {
			await deleteImageFromCloudinary(imageUrl);
		}

		setImageUrl(null);
		setPreviousImageUrl(null);
	};

	return (
		<div className="flex justify-center">
			<Card className="w-[300px] lg:w-[280px] rounded-lg border border-medium/50 bg-light shadow-md">
				<CardContent className="p-4 flex flex-col items-center justify-center">
					{imageUrl ? (
						<div className="relative flex justify-center">
							<div className="relative w-52 h-52 rounded-md overflow-hidden border border-medium">
								<img
									src={imageUrl}
									alt="Uploaded Recipe"
									className="absolute top-0 left-0 w-full h-full object-cover"
								/>
							</div>
							{/* Remove Button */}
							<Button
								variant="ghost"
								className="absolute top-2 right-2 bg-danger/80 hover:bg-danger text-light rounded-full p-1"
								onClick={removeImage}
							>
								<Trash2 className="w-5 h-5" />
							</Button>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-4 w-52 h-52 border-2 border-dashed border-medium/60 rounded-lg bg-medium/10">
							{isLoading ? (
								<Loader2 className="animate-spin w-8 h-8 text-dark" />
							) : (
								<>
									<p className="text-dark font-semibold text-sm text-center mx-2">
										Upload an image for your recipe
									</p>
									<label
										htmlFor="image"
										className="px-4 py-2 bg-dark text-light rounded-md text-sm font-medium hover:bg-dark/90 cursor-pointer"
									>
										Choose File
									</label>
									<input
										type="file"
										id="image"
										accept="image/*"
										onChange={onImageUpload}
										className="hidden"
									/>
								</>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default ImageUpload;
