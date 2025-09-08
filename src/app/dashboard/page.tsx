import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Link2, BarChart3 } from "lucide-react";
import { auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/lib/data";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const links = await getLinksByUserId(Number(session.user.id));
  console.log(links);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {session?.user?.name || "User"}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No links created yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No clicks recorded yet</p>
          </CardContent>
        </Card>
      </div>

      <div>
        {links.length === 0 ? (
          <p className="text-muted-foreground">You have not created any links yet.</p>
        ) : (
          <ul>
            {links.map((link) => {
              const title = link && link.title != null ? String(link.title) : undefined;
              const url = link && link.url != null ? String(link.url) : undefined;
              return (
                <li key={String(link.id)} className="mb-2">
                  <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {title ?? url}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex items-center gap-2">
          <Link2 className="h-4 w-4" />
          Create New Link
        </Button>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
