"use client";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { toast } from "sonner";

export function CreateButton() {
  const handleClick = () => {
    console.log("Create new link button clicked");
    toast.info("Funcionality not implemented yet");
  };

  return (
    <Button onClick={handleClick} className="w-full md:w-fit">
      <div className="flex items-center gap-2">
        Create link
        <Link size={16} />
      </div>
    </Button>
  );
}
