import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	try {
		const { publicId } = await request.json();

		if (!publicId) {
			return NextResponse.json(
				{ error: "No public ID provided" },
				{ status: 400 }
			);
		}

		// Delete image from Cloudinary
		const deleteResponse = await cloudinary.uploader.destroy(publicId);
		console.log("Cloudinary Image Delete Response:", deleteResponse);

		return NextResponse.json({
			success: true,
			message: "Image deleted from Cloudinary",
			result: deleteResponse,
		});
	} catch (error) {
		console.error("Image deletion failed:", error);
		return NextResponse.json(
			{ error: "Failed to delete image from Cloudinary" },
			{ status: 500 }
		);
	}
}
