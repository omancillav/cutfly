import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Actions } from "./actions";

interface Link {
  code: string;
  url: string;
  description?: string;
  clicks: number;
  created_at: string;
}

export function LinkCard({ link }: { link: Link }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>/{link.code}</CardTitle>
          <div className="flex items-center gap-2">
            <p className="text-sm flex items-center gap-1">
              <ChartNoAxesColumn size={16} />
              {link.clicks} clicks
            </p>
            |
            <Actions linkCode={link.code} />
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground">{link.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          href={link.url}
          className="text-sm text-muted-foreground line-clamp-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.url}
        </Link>
        <span className="text-sm text-end flex justify-end">{formatDate(link.created_at)}</span>
      </CardContent>
    </Card>
  );
}
