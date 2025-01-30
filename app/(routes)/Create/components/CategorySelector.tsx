"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CategorySelectorProps {
	categoryOptions: string[];
	categoryFields: { id: string; name: string }[];
	append: (category: { name: string }) => void;
	remove: (index: number) => void;
	register: any;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
	categoryOptions,
	categoryFields,
	append,
	remove,
	register,
}) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4 flex flex-col gap-4">
				{/* Title */}
				<div>
					<Label className="text-dark font-medium">Categories</Label>
					<p className="text-xs text-medium/70">
						Multiple categories can be added
					</p>
				</div>

				{/* Already Selected Categories */}
				<ul className="flex flex-wrap gap-2">
					{categoryFields.map((field, index) => (
						<li
							key={field.id}
							className="flex items-center gap-2 bg-medium/10 px-3 py-1 rounded-md"
						>
							<input
								{...register(
									`categories.${index}.name` as const
								)}
								readOnly
								className="bg-transparent text-dark text-sm"
							/>
							<Button
								variant="ghost"
								className="text-danger hover:bg-danger/20 p-1 rounded-md"
								onClick={() => remove(index)}
							>
								<RiDeleteBin2Fill size={16} />
							</Button>
						</li>
					))}
				</ul>

				{/* Category Selection Dropdown */}
				<Select onValueChange={(value) => append({ name: value })}>
					<SelectTrigger className="w-full border border-medium/60 bg-light">
						<SelectValue placeholder="Select or search for a category" />
					</SelectTrigger>
					<SelectContent>
						{categoryOptions.map((cat) => (
							<SelectItem key={cat} value={cat}>
								{cat}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</CardContent>
		</Card>
	);
};

export default CategorySelector;
