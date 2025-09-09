"use client";
import { Copy, Pen, Trash } from "lucide-react";
import { deleteLink } from "@/lib/actions";

export function Actions({ linkCode }: { linkCode: string }) {
  const handleDelete = async () => {
    try {
      await deleteLink(linkCode);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${linkCode}`);
  };

  return (
    <div className="flex items-center gap-3">
      <Copy onClick={handleCopy} size={18} className="cursor-pointer hover:opacity-80" />
      <Pen size={18} className="cursor-pointer hover:opacity-80" />
      <Trash onClick={handleDelete} size={18} className="cursor-pointer hover:opacity-80  " />
    </div>
  );
}
