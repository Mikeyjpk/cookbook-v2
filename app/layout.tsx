import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import AppContainer from "./components/Containers/AppContainer";

import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import ContentContainer from "./components/Containers/ContentContainer";

const openSans = Open_Sans({
	variable: "--font-open-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${openSans.variable} antialiased bg-light`}>
					<AppContainer>
						<Navbar />
						<ContentContainer>{children}</ContentContainer>
						<Toaster />
					</AppContainer>
				</body>
			</html>
		</ClerkProvider>
	);
}
