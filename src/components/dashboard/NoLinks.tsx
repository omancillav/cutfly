'use client';
import { Link } from "lucide-react";
import { Meteors } from "../magicui/meteors";
import { useMediaQuery } from "@/hooks/use-media-query";

export function NoLinks() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className="relative flex flex-col items-center justify-center p-6 border border-dashed rounded-lg overflow-hidden min-h-[200px] animate-in fade-in zoom-in-95 duration-700 ease-out delay-300"
      style={{
        animationFillMode: "both",
      }}
    >
      <Meteors minDuration={5} maxDuration={15} number={isMobile ? 10 : 25} minDelay={0} maxDelay={0} />
      <Link className="mx-auto mb-3 h-12 w-12 text-muted-foreground relative z-10" />
      <h2 className="text-xl font-bold mb-2 text-center relative z-10">No Links Found</h2>
      <p className="text-muted-foreground text-sm text-center relative z-10">
        You have not created any links yet. Click the button below to create your first link.
      </p>
    </div>
  );
}
