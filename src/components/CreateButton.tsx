"use client";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { toast } from "sonner";

export function CreateButton({variant}: {variant?: "default" | "outline"}) {
  const handleClick = () => {
    console.log("Create new link button clicked");
    toast.info("Funcionality not implemented yet");
  };

  return (
    <Button onClick={handleClick} variant={variant} className="w-full md:w-fit ">
      Create link
      <Link size={16} />
    </Button>
  );
}
