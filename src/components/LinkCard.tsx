"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartNoAxesColumn, Link2, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Actions } from "./actions";
import Link from "next/link";
import { useState } from "react";

interface LinkData {
  code: string;
  url: string;
  description?: string;
  clicks: number;
  created_at: string;
}

export function LinkCard({ link }: { link: LinkData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDescription = Boolean(link.description?.trim());

  return (
    <Card
      className={`gap-2 transition-all duration-300 ease-in-out ${isExpanded ? "pb-4" : "pb-2"}`}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>/{link.code}</CardTitle>
          <div className="flex items-center gap-3">
            <p className="text-sm flex items-center gap-1">
              <ChartNoAxesColumn size={16} aria-label="Clicks" />
              {link.clicks} clicks
            </p>
            <span className="text-muted-foreground">|</span>
            <Actions linkData={link} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Link
          href={link.url}
          className="text-sm text-muted-foreground line-clamp-1 break-all hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          title={link.url}
        >
          <Link2 size={16} className="inline mr-1" aria-label="External link" />
          {link.url}
        </Link>

        <div className="flex justify-between items-center mt-1">
          {hasDescription && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto px-0 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors !bg-transparent"
            >
              {isExpanded ? (
                <div className="flex items-center gap-1 justify-start">
                  Ver menos
                  <ChevronUp size={14} />
                </div>
              ) : (
                <div className="flex items-center gap-1 justify-start">
                  Ver más
                  <ChevronDown size={14} />
                </div>
              )}
            </Button>
          )}

          <time className={`text-sm text-muted-foreground ${!hasDescription ? "ml-auto" : ""}`}>
            {formatDate(link.created_at)}
          </time>
        </div>

        {/* Descripción expandible con animación */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          {hasDescription && (
            <div className="p-3 bg-muted/30 rounded-md border-l-2 border-primary/20">
              <p className="text-sm text-muted-foreground leading-relaxed">{link.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
