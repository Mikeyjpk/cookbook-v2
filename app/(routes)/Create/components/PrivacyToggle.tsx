"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PrivacyToggleProps {
	watch: any;
	setValue: any;
}

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({ watch, setValue }) => {
	return (
		<Card className="w-full bg-light rounded-lg border border-medium/50 shadow-md">
			<CardContent className="p-4 flex items-center justify-between py-5">
				<div className="flex flex-col gap-2">
					<Label
						htmlFor="isPrivate"
						className="text-dark font-medium"
					>
						Secret Recipe
					</Label>
					<p className="text-xs text-font/50">
						Make this recipe just for you!
					</p>
				</div>
				<Switch
					id="isPrivate"
					checked={watch("isPrivate")}
					onCheckedChange={(checked) =>
						setValue("isPrivate", checked)
					}
					className="mr-4"
				/>
			</CardContent>
		</Card>
	);
};

export default PrivacyToggle;
