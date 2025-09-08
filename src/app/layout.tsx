import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { inter } from "@/ui/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/assets/github-icon";
import { Analytics } from "@vercel/analytics/next";
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
              <header className="flex items-center justify-between gap-2 py-2 md:py-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <Image
                    src="/cutfly_logo.webp"
                    alt="Cutfly Logo"
                    width={100}
                    height={100}
                    className="w-8 h-8"
                    priority={true}
                  />
                  <h1 className="text-xl font-bold">Cutfly</h1>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <a
                    href="https://github.com/omancillav/cutfly"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Cutfly on GitHub"
                  >
                    <Button variant="ghost" size="icon">
                      <GitHubIcon />
                    </Button>
                  </a>
                  <ThemeToggle />
                  <Link href="/login">
                    <Button variant="outline" className="flex items-center gap-2 !bg-background">
                      Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
