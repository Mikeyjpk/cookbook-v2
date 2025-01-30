"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface TimeInputsProps {
	register: any;
	errors: any;
}

const TimeInputs: React.FC<TimeInputsProps> = ({ register, errors }) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4 grid grid-cols-2 gap-4">
				{/* Prep Time */}
				<div>
					<Label
						htmlFor="prep_time"
						className="text-dark font-medium"
					>
						Prep Time
					</Label>
					<Input
						{...register("prep_time", { required: "Required" })}
						id="prep_time"
						type="number"
						placeholder="Minutes"
						className="mt-2 bg-light border-medium/60 focus:ring-dark [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					/>
					{errors.prep_time && (
						<span className="text-danger text-sm mt-1 block">
							{errors.prep_time.message}
						</span>
					)}
				</div>

				{/* Cook Time */}
				<div>
					<Label
						htmlFor="cook_time"
						className="text-dark font-medium"
					>
						Cook Time
					</Label>
					<Input
						{...register("cook_time", { required: "Required" })}
						id="cook_time"
						type="number"
						placeholder="Minutes"
						className="mt-2 bg-light border-medium/60 focus:ring-dark [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					/>
					{errors.cook_time && (
						<span className="text-danger text-sm mt-1 block">
							{errors.cook_time.message}
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default TimeInputs;
