import { auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/lib/data";
import { LinkCard } from "@/components/LinkCard";
import { LinkForm } from "@/components/LinkForm";
import { NoLinks } from "@/components/NoLinks";
import { Box } from "lucide-react";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const links = await getLinksByUserId(Number(session.user.id));
  const linksCount = links.length;

  return (
    <div className="py-4 w-full flex flex-col">
      <div className="flex justify-between items-center gap-2 mb-3 md:mb-4">
        <div className="flex justify-start">
          <div className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm">
            <Box className="w-4 h-4" />
            <span>{linksCount.toString().padStart(2, "0")}/30</span>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <LinkForm />
        </div>
      </div>

      <div className="w-full">
        {linksCount === 0 ? (
          <NoLinks />
        ) : (
          <ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
              {links.map((link) => {
                const code = String(link.code);
                const clicks = Number(link.clicks);
                const url = String(link.url);
                const description = String(link.description);
                const created_at = String(link.created_at);
                return <LinkCard key={String(link.id)} link={{ code, url, description, clicks, created_at }} />;
              })}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
