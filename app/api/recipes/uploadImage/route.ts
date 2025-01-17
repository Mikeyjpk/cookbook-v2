import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	try {
		const { image } = await request.json();

		if (!image) {
			return NextResponse.json(
				{ error: "No image provided" },
				{ status: 400 }
			);
		}

		// Upload image to Cloudinary
		const result = await cloudinary.uploader.upload(image, {
			folder: "recipes",
		});

		return NextResponse.json({
			success: true,
			imageUrl: result.secure_url,
		});
	} catch (error) {
		console.error("Image upload failed:", error);
		return NextResponse.json(
			{ error: "Image upload failed" },
			{ status: 500 }
		);
	}
}
