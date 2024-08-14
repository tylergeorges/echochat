import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { ModalRenderer } from "@/lib/modal";
import { ReactQueryProvider } from "@/providers/react-query-client-provider";

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: siteConfig.name,
	},
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"relative flex size-full flex-1 bg-background font-sans text-foreground antialiased",
					fontSans.variable,
				)}
			>
				<ReactQueryProvider>
					<ModalRenderer />
					<Toaster richColors />

					<main className="relative z-0 flex-1 horizontal">{children}</main>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
