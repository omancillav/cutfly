import { getLinkByCode } from "@/lib/data";
import { incrementClicks } from "@/lib/actions";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = params;

  let link;

  try {
    link = await getLinkByCode(code);
  } catch (error) {
    console.error("Error fetching link:", error);
    notFound();
  }

  if (!link) {
    notFound();
  }

  incrementClicks(code).catch((error) => {
    console.error("Error incrementing clicks:", error);
  });

  redirect(String(link.url));
}
