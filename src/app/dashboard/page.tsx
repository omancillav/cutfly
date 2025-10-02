import { auth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/lib/data";
import { LinkCard } from "@/components/dashboard/LinkCard";
import { LinkFormModal } from "@/components/dashboard/LinkFormModal";
import { NoLinks } from "@/components/dashboard/NoLinks";
import { Box } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const links = await getLinksByUserId(Number(session.user.id));
  const linksCount = links.length;

  return (
    <div className="py-4 w-full flex flex-col overflow-x-hidden">
      <div className="flex justify-between items-center gap-2 mb-3 md:mb-4">
        <div
          className="relative flex items-center gap-2 border px-4 py-2 rounded-md text-sm animate-in fade-in slide-in-from-left-4 duration-500 ease-out"
          style={{
            animationFillMode: "both",
          }}
        >
          <BorderBeam duration={8} size={30} colorTo="#808080" colorFrom="#000000" className="dark:hidden" />
          <BorderBeam duration={8} size={30} colorTo="#aaaaaa" colorFrom="#ffffff" className="hidden dark:block" />
          <Box className="w-4 h-4" />
          <span>{linksCount.toString().padStart(2, "0")}/30</span>
        </div>

        <div
          className="flex justify-end w-full animate-in fade-in slide-in-from-right-4 duration-500 ease-out delay-150"
          style={{
            animationFillMode: "both",
          }}
        >
          <LinkFormModal linksCount={linksCount} />
        </div>
      </div>

      <div className="w-full">
        {linksCount === 0 ? (
          <NoLinks />
        ) : (
          <ul className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full">
              {links.map((link, index) => {
                const code = String(link.code);
                const clicks = Number(link.clicks);
                const url = String(link.url);
                const description = link.description ? String(link.description) : "";
                const created_at = String(link.created_at);
                return (
                  <div
                    key={String(link.id)}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <LinkCard link={{ code, url, description, clicks, created_at }} />
                  </div>
                );
              })}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
