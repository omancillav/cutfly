import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";

interface Link {
  code: string;
  url: string;
  description?: string;
  clicks: number;
}

export function LinkCard({ link }: { link: Link }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>/{link.code}</CardTitle>
          <p className="text-sm flex items-center gap-1">
            <ChartNoAxesColumn size={16} />
            {link.clicks} clicks
          </p>
        </div>
        <CardDescription className="text-sm text-muted-foreground">{link.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={link.url}
          className="text-sm text-muted-foreground line-clamp-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.url}
        </Link>
      </CardContent>
    </Card>
  );
}
