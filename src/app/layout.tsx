import type { Metadata } from "next";
import { inter } from "@/ui/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-svh w-full">
            <div className="relative z-10 max-w-[1440px] mx-auto w-full px-3 md:px-6 min-h-svh flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Toaster position="bottom-right" richColors />
            </div>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
