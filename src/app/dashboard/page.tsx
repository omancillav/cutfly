import { auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/lib/data";
import { LinkCard } from "@/components/LinkCard";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const links = await getLinksByUserId(Number(session.user.id));
  console.log(links);

  return (
    <div className="py-4 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session?.user?.name || "User"}!</p>
      </div>

      <div className="w-full">
        {links.length === 0 ? (
          <p className="text-muted-foreground">You have not created any links yet.</p>
        ) : (
          <ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full">
              {links.map((link) => {
                const code = String(link.code);
                const clicks = Number(link.clicks);
                const url = String(link.url);
                const description = String(link.description);
                return <LinkCard key={String(link.id)} link={{ code, url, description, clicks }} />;
              })}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
