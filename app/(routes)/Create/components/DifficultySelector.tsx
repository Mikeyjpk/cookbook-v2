"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DifficultySelectorProps {
	watch: any;
	setValue: any;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
	watch,
	setValue,
}) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4">
				<Label className="block text-dark font-medium pb-2">
					Difficulty Level
				</Label>
				<RadioGroup
					defaultValue={watch("difficulty")}
					onValueChange={(value) => setValue("difficulty", value)}
					className="flex flex-col gap-3 hover:cursor-pointer"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="beginner" id="beginner" />
						<Label
							htmlFor="beginner"
							className="hover:cursor-pointer"
						>
							Beginner
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="easy" id="easy" />
						<Label htmlFor="easy" className="hover:cursor-pointer">
							Easy
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="medium" id="medium" />
						<Label
							htmlFor="medium"
							className="hover:cursor-pointer"
						>
							Medium
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="difficult" id="difficult" />
						<Label
							htmlFor="difficult"
							className="hover:cursor-pointer"
						>
							Difficult
						</Label>
					</div>
				</RadioGroup>
			</CardContent>
		</Card>
	);
};

export default DifficultySelector;
