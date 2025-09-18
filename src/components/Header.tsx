import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User, ArrowRight, LayoutDashboard } from "lucide-react";
import { GitHubIcon } from "@/assets/github-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth, signOut } from "@/lib/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShinyButton } from "./magicui/shiny-button";

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
                <Image
                  src={`https://api.dicebear.com/9.x/glass/webp?seed=${encodeURIComponent(
                    session.user.email || session.user.name || "default"
                  )}`}
                  alt="Profile"
                  width={35}
                  height={35}
                  className="w-7 h-7 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className=" flex flex-col gap-1 px-2 py-1.5 text-sm font-medium">
                {session.user.name}
                <span className="text-xs text-muted-foreground">{session.user.email}</span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full">
                  <div className="flex items-center gap-2 w-full text-sm py-1">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full">
                  <div className="flex items-center gap-2 w-full text-sm py-1">
                    <User className="h-4 w-4" />
                    My Profile
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button type="submit" variant="ghost" className="w-full p-0">
                    <div className="flex items-center gap-2 w-full text-sm py-1">
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </div>
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <ShinyButton className="!bg-background p-2">
              <div className="flex items-center gap-2 text-sm ">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </div>
            </ShinyButton>
          </Link>
        )}
      </div>
    </header>
  );
}
