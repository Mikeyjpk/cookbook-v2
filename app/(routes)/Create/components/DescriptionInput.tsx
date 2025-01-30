"use client";

import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface DescriptionInputProps {
	register: any;
	errors: any;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
	register,
	errors,
}) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4">
				<Label htmlFor="description" className="text-dark font-medium">
					Recipe Description
				</Label>
				<Textarea
					{...register("description")}
					id="description"
					placeholder="Enter recipe description"
					className="mt-2 bg-light border-medium/60 focus:ring-dark"
				/>
				{errors.description && (
					<span className="text-danger text-sm mt-1 block">
						{errors.description.message}
					</span>
				)}
			</CardContent>
		</Card>
	);
};

export default DescriptionInput;
