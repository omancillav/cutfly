"use client";
import { Copy, Pen, Trash } from "lucide-react";
import { deleteLink } from "@/lib/actions";

export function Actions({ linkCode }: { linkCode: string }) {
  const handleDelete = async () => {
    try {
      await deleteLink(linkCode);
      // Opcional: recargar la página o actualizar el estado
      window.location.reload();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Copy size={16} className="cursor-pointer" />
      <Pen size={16} className="cursor-pointer" />
      <Trash onClick={handleDelete} size={16} className="cursor-pointer" />
    </div>
  );
}
