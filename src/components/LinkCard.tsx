import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartNoAxesColumn, Link2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Actions } from "./actions";
import Link from "next/link";

interface Link {
  code: string;
  url: string;
  description?: string;
  clicks: number;
  created_at: string;
}

export function LinkCard({ link }: { link: Link }) {
  return (
    <Card className="gap-2 bg-background">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>/{link.code}</CardTitle>
          <div className="flex items-center gap-3">
            <p className="text-sm flex items-center gap-1">
              <ChartNoAxesColumn size={16} />
              {link.clicks} clicks
            </p>
            |
            <Actions linkCode={link.code} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          href={link.url}
          className="text-sm text-muted-foreground line-clamp-1 break-all hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Link2 size={16} className="inline mr-1" />
          {link.url}
        </Link>
        <span className="text-sm text-end flex justify-end">{formatDate(link.created_at)}</span>
      </CardContent>
    </Card>
  );
}
