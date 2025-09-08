import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/assets/github-icon";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-2 py-2 md:py-4">
      <Link href="/">
        <div className="flex items-center gap-2 md:gap-3 hover:opacity-85 ease-in-out duration-150">
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
      </Link>
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
  );
}
