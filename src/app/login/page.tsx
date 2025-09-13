import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { GitHubIcon } from "@/assets/github-icon";
import { signIn, auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import Image from "next/image";

export default async function AuthPanel() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="min-w-[300px] md:min-w-[400px] text-center z-20">
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
          <CardDescription>Please log in using your GitHub account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <RainbowButton type="submit" className="w-full">
              <GitHubIcon />
              Continue with GitHub
            </RainbowButton>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
