export const extractCloudinaryPublicId = (
	imageUrl: string | null
): string | null => {
	if (!imageUrl) return null;

	try {
		// Cloudinary public ID extraction regex
		const regex = /\/upload\/(?:v\d+\/)?(.+?)\.\w+$/;
		const match = imageUrl.match(regex);

		return match ? match[1] : null;
	} catch (error) {
		console.error("Error extracting Cloudinary Public ID:", error);
		return null;
	}
};
