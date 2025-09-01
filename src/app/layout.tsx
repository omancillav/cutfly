import type { Metadata } from "next";
import { inter } from "@/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cutfly",
  description: "URL shortening made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>{children}</body>
    </html>
  );
}
