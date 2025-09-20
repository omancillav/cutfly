"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { exportUserLinks } from "@/lib/actions";

export function ExportLinksButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const result = await exportUserLinks();

      if (!result.success || !result.data) {
        toast.error("Export failed", {
          description: result.error || "Failed to export links",
        });
        return;
      }

      // Create and download the JSON file
      const jsonData = JSON.stringify(result.data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `cutfly-links-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Links exported", {
        description: `${result.data.links.length} links exported successfully`,
      });
    } catch (error) {
      console.error("Error exporting links:", error);
      toast.error("Export failed", {
        description: "An unexpected error occurred while exporting your links",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="flex-1"
      onClick={handleExport}
      disabled={isExporting}
      title="Export all your links"
    >
      <Download className="w-4 h-4" />
      {isExporting ? "Exporting..." : "Export Links"}
    </Button>
  );
}
