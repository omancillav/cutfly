import type { Metadata } from "next";
import { inter } from "@/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cutfly",
  description: "URL shortening made easy",
  icons: {
    icon: '/cutfly_logo.webp',
    shortcut: '/cutfly_logo.webp',
    apple: '/cutfly_logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased max-w-[1440px] mx-auto px-5`}>{children}</body>
    </html>
  );
}
