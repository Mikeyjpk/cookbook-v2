import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

// Check if we are in development mode
const isDev = process.env.NODE_ENV === "development";

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"no-var": "off",
			"@typescript-eslint/no-unused-vars": "off",
		},
	},
];

export default eslintConfig;
