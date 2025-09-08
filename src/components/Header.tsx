import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { GitHubIcon } from "@/assets/github-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth, signOut } from "@/lib/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight } from "lucide-react";

export async function Header() {
  const session = await auth();

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

        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {(session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U").toUpperCase()}
                    </span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className=" flex flex-col gap-1 px-2 py-1.5 text-sm font-medium">
                {session.user.name}
                <span className="text-xs text-muted-foreground">{session.user.email}</span>
              </div>
              <DropdownMenuItem asChild>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <div className="flex items-center gap-10 justify-between w-full py-1.5   text-sm">
                    Sign out
                    <LogOut className="h-4 w-4" />
                  </div>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="!bg-background">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
