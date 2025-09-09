"use client";
import { Copy, Pen, Trash } from "lucide-react";
import { deleteLink } from "@/lib/actions";
import { toast } from "sonner";

export function Actions({ linkCode }: { linkCode: string }) {
  const handleDelete = async () => {
    toast.promise(deleteLink(linkCode), {
      loading: "Deleting link...",
      success: () => {
        window.location.reload();
        return "Link deleted successfully!";
      },
      error: "Failed to delete link",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${linkCode}`);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-3">
      <Copy onClick={handleCopy} size={18} className="cursor-pointer hover:opacity-80" />
      <Pen size={18} className="cursor-pointer hover:opacity-80" />
      <Trash onClick={handleDelete} size={18} className="cursor-pointer hover:opacity-80  " />
    </div>
  );
}
