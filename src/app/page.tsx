import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { GitHubIcon } from "@/assets/github-icon";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import TextType from "@/components/reactbits/TextType";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="fixed inset-0 -z-10 w-screen h-screen pointer-events-none">
        <AnimatedGridPattern
          maxOpacity={0.05}
          className="[mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_90%)]"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 md:gap-8 px-2 md:mt-0 -mt-6 min-h-[calc(100vh-200px)]">
        <h2
          className="text-5xl md:text-6xl font-bold text-center animate-in fade-in slide-in-from-top-6 duration-1000 ease-out delay-300"
          style={{
            animationFillMode: "both",
          }}
        >
          <TextType text="Fly shorter, Reach further" typingSpeed={70} showCursor={false} />
        </h2>
        <p
          className="text-center max-w-4xl text-[15px] md:text-lg animate-in fade-in zoom-in-95 duration-700 ease-out delay-300"
          style={{
            animationFillMode: "both",
          }}
        >
          Short links, smart insights. Open-source URL shortener designed for developers who demand control, built with
          modern web technologies and scalable architecture.
        </p>
        <div
          className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out delay-300"
          style={{
            animationFillMode: "both",
          }}
        >
          <Link href="/dashboard">
            <Button variant="default" className="md:text-base p-5 md:p-6 transition-all duration-300 ">
              <Link2 className="size-5" />
              Shorten a link
            </Button>
          </Link>
          <a
            href="https://github.com/omancillav/cutfly"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cutfly on GitHub"
          >
            <Button
              variant="secondary"
              className="md:text-base p-5 md:p-6 border bg-background transition-all duration-300"
            >
              <GitHubIcon />
              Star on Github
            </Button>
          </a>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-20 text-center py-4">
        <p className="text-sm text-muted-foreground">Made by Omar Mancilla</p>
      </footer>
    </div>
  );
}
