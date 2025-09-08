import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { GitHubIcon } from "@/assets/github-icon";
import Image from "next/image";
import { getUsers } from "@/lib/actions";

export default async function AuthPanel() {
  const users = await getUsers();
  console.log(users);

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="min-w-[300px] md:min-w-[400px] text-center">
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
          <Button variant="outline" className="w-full">
            <GitHubIcon />
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
