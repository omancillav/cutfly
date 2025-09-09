"use client";
import { useState } from "react";
import { Copy, Pen, Trash } from "lucide-react";
import { deleteLink } from "@/lib/actions";
import { toast } from "sonner";
import { ConfirmationDialog } from "./ConfirmationDialog";

export function Actions({ linkCode }: { linkCode: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    toast.promise(deleteLink(linkCode), {
      loading: "Deleting link...",
      success: () => {
        window.location.reload();
        return "Link deleted successfully!";
      },
      error: "Failed to delete link",
    });
    setIsDeleting(false);
  };

  const handleCopy = () => {
    const fullLink = `${window.location.origin}/${linkCode}`;
    navigator.clipboard.writeText(fullLink);
    toast.success(
      <div>
        <div>Link copied to clipboard!</div>
        <div className="text-muted-foreground">{fullLink}</div>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-3">
      <Copy onClick={handleCopy} size={16} className="cursor-pointer hover:opacity-80" />
      <Pen size={16} className="cursor-pointer hover:opacity-80" />
      <ConfirmationDialog 
        onConfirm={handleDelete}
        isLoading={isDeleting}
        trigger={
          <Trash size={16} className="cursor-pointer hover:opacity-80" />
        }
      />
    </div>
  );
}
