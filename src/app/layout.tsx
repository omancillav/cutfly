import type { Metadata } from "next";
import { inter } from "@/ui/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cutfly",
  description: "URL shortening made easy",
  icons: {
    icon: "/cutfly_logo.webp",
    shortcut: "/cutfly_logo.webp",
    apple: "/cutfly_logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-[1440px] mx-auto px-5 w-full">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
