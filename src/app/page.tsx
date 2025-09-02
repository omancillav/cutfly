import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";

export default function Home() {
  return (
    <header className="flex items-center justify-between gap-2 py-4">
      <div className="flex items-center gap-2">
        <Image src="/cutfly_logo.webp" alt="Cutfly Logo" width={100} height={100} className="w-8 h-8" />
        <span className="text-lg font-bold">Cutfly</span>
      </div>
      <div className="flex items-center gap-2">
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
        <Button variant="outline" className="flex items-center gap-2">
          Get started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
