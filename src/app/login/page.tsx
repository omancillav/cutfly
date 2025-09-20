import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { GitHubLoginButton } from "@/components/auth/GithubLoginButton";
import Image from "next/image";

export default async function AuthPanel() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Card
        className="min-w-[350px] md:min-w-[400px] lg:min-w-[450px] animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out"
        style={{ animationFillMode: "both" }}
      >
        <CardHeader className="flex flex-col items-center justify-center gap-3">
          <Image
            src="/cutfly_logo.webp"
            alt="Cutfly Logo"
            width={100}
            height={100}
            className="w-15 h-15"
            priority={true}
          />
          <CardTitle className="text-xl font-bold">Log in to Cutfly</CardTitle>
          <CardDescription className="text-center">
            Please log in using your favorite provider to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5 px-4">
          <GoogleLoginButton />
          <GitHubLoginButton />
        </CardContent>
      </Card>
    </main>
  );
}
