import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppContainer from "./components/Containers/AppContainer";

import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import ContentContainer from "./components/Containers/ContentContainer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
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
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased bg-light`}
				>
					<AppContainer>
						<Navbar />
						<ContentContainer>{children}</ContentContainer>
					</AppContainer>
				</body>
			</html>
		</ClerkProvider>
	);
}
