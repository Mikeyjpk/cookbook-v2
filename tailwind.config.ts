import type { Config } from "tailwindcss";

// todo: add user toggle light>dark mode

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				// dev colors light
				light: "#EDF2DE",
				medium: "#ACBFA4",
				dark: "#034C3C",
				danger: "#D52941",
				font: "#000000",

				// // Dev colours dark
				// light: "#034C3C",
				// medium: "#ACBFA4",
				// dark: "#EDF2DE",
				// danger: "#D52941",
				// font: "#000000",

				// // Dev colours dark
				// light: "#2B2D42",
				// medium: "#8D99AE",
				// dark: "#EDF2DE",
				// danger: "#D52941",
				// font: "#000000",

				// // Dev colours dark
				// light: "#EDF2DE",
				// medium: "#8D99AE",
				// dark: "#2B2D42",
				// danger: "#D52941",
				// font: "#000000",

				// // Dev colours dark
				// light: "#FEFAE0",
				// medium: "#606C38",
				// dark: "#283618",
				// danger: "#D52941",
				// font: "#000000",

				// // Dev colours dark
				// light: "#F2545B",
				// medium: "#19323C",
				// dark: "#19323C",
				// danger: "#D52941",
				// font: "#000000",

				// // Dev colours dark
				// light: "#FCFCFC",
				// medium: "#FEA82F",
				// dark: "#AF1B3F",
				// danger: "#D52941",
				// font: "#000000",

				// // Dev colours dark
				// light: "#EADDCF",
				// medium: "#D7A554",
				// dark: "#363635",
				// danger: "#D52941",
				// font: "#000000",

				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
