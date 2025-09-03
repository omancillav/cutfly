import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, Link2 } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function Home() {
  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <DotPattern glow={true} className="opacity-60"/>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-3 md:px-6">
        <header className="flex items-center justify-between gap-2 py-4">
          <div className="flex items-center gap-2">
            <Image src="/cutfly_logo.webp" alt="Cutfly Logo" width={100} height={100} className="w-8 h-8" />
            <h1 className="text-lg font-bold">Cutfly</h1>
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
            <Button variant="outline" className="flex items-center gap-2 !bg-background">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="min-h-svh w-full flex flex-col items-center justify-center gap-6 md:gap-8 px-2 -mt-20">
          <h2 className=" text-5xl md:text-6xl font-bold text-center">Fly shorter, reach further</h2>
          <p className="text-center max-w-3xl text-[15px] md:text-lg">
            An open-source URL shortener designed for the modern web — fast link creation, detailed analytics, and
            flexible, customizable features that adapt to individual and team needs.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="default" className="md:text-base p-5 md:p-6">
              <Link2 className="size-6" />
              Create a link
            </Button>
            <Button variant="outline" className="md:text-base p-5 md:p-6">
              <GitHubIcon />
              Star on Github
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
