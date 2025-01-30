"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface TitleInputProps {
	register: any;
	errors: any;
}

const TitleInput: React.FC<TitleInputProps> = ({ register, errors }) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4">
				<Label htmlFor="title" className="text-dark font-medium">
					Recipe Title
				</Label>
				<Input
					{...register("title", { required: "Title is required" })}
					id="title"
					type="text"
					placeholder="Enter recipe title"
					className="mt-2 bg-light border-medium/60 focus:ring-dark"
				/>
				{errors.title && (
					<span className="text-danger text-sm mt-1 block">
						{errors.title.message}
					</span>
				)}
			</CardContent>
		</Card>
	);
};

export default TitleInput;
