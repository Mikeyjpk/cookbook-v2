import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RiDeleteBin2Fill } from "react-icons/ri";

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
		<div className="flex flex-col gap-2">
			<div className="flex flex-col">
				<label className="text-lg">Categories</label>
				<p className="text-xs text-black/70">
					multiple categories can be added
				</p>
			</div>

			{/* Render already-added categories */}
			<ul className="flex flex-col gap-1">
				{categoryFields.map((field, index) => (
					<li key={field.id} className="flex items-center gap-2">
						<input
							{...register(`categories.${index}.name` as const)}
							readOnly
							className="border rounded p-1 bg-gray-100"
						/>
						<button
							type="button"
							onClick={() => remove(index)}
							className="text-danger/40 hover:text-danger"
						>
							<RiDeleteBin2Fill size={18} />
						</button>
					</li>
				))}
			</ul>

			{/* Category Selection Dropdown */}
			<Select onValueChange={(value) => append({ name: value })}>
				<SelectTrigger className="w-[250px]">
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
		</div>
	);
};

export default CategorySelector;
