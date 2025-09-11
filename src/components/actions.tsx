"use client";
import { useState } from "react";
import { Copy, Pen, Trash } from "lucide-react";
import { deleteLink } from "@/lib/actions";
import { toast } from "sonner";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { LinkFormModal } from "./LinkFormModal";

interface Link {
  code: string;
  url: string;
  description?: string;
  clicks: number;
  created_at: string;
}

export function Actions({ linkData }: { linkData: Link }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    toast.promise(deleteLink(linkData.code), {
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
    const fullLink = `${window.location.origin}/${linkData.code}`;
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
      <LinkFormModal
        editMode={true}
        linkData={linkData}
        buttonIcon={<Pen size={16} />}
        buttonText=""
        triggerClassName=""
      />
      <ConfirmationDialog
        onConfirm={handleDelete}
        isLoading={isDeleting}
        trigger={<Trash size={16} className="cursor-pointer hover:opacity-80" />}
      />
    </div>
  );
}
