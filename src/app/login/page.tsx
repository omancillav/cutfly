import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { GitHubIcon } from "@/assets/github-icon";
import { GoogleIcon } from "@/assets/google-icon";
import { signIn, auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function AuthPanel() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="min-w-[350px] md:min-w-[400px] text-center z-20">
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
          <CardDescription>Please log in using one of the providers below</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5 p-4">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit" className="w-full" variant="outline">
              <GoogleIcon />
              <span>Continue with Google</span>
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <RainbowButton type="submit" className="w-full rounded-lg">
              <GitHubIcon />
              Continue with GitHub
            </RainbowButton>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
