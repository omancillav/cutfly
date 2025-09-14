"use client";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "lucide-react";
import { toast } from "sonner";
import { LinkForm } from "./LinkForm";
import { BorderBeam } from "./magicui/border-beam";

interface Link {
  code: string;
  url: string;
  description?: string;
  clicks: number;
  created_at: string;
}

interface LinkFormModalProps {
  linksCount?: number;
  editMode?: boolean;
  linkData?: Link;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  triggerClassName?: string;
}

export function LinkFormModal({
  linksCount = 0,
  editMode = false,
  linkData,
  buttonText,
  buttonIcon,
  triggerClassName = "",
}: LinkFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const hasReachedLimit = !editMode && linksCount >= 30;

  const handleOpenChange = (open: boolean) => {
    if (open && hasReachedLimit) {
      return;
    }
    setIsOpen(open);
  };

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const defaultButtonText = editMode ? "Edit link" : "Create link";
  const defaultButtonIcon = <Link size={16} />;

  const triggerButton = editMode ? (
    // Para modo edición, renderizar solo el ícono
    <div className={`cursor-pointer hover:opacity-80 ${triggerClassName}`}>{buttonIcon || defaultButtonIcon}</div>
  ) : (
    // Para modo creación, renderizar el botón completo
    <div className={`w-full md:w-fit ${triggerClassName}`}>
      <Button
        className="w-full md:w-fit"
        disabled={hasReachedLimit}
        onClick={(e) => {
          if (hasReachedLimit) {
            e.preventDefault();
            e.stopPropagation();
            toast.error("Link limit reached", {
              description: "You have reached the maximum of 30 links",
            });
          }
        }}
      >
        <div className="flex items-center gap-2">
          {hasReachedLimit ? "Link limit reached" : buttonText || defaultButtonText}
          {buttonIcon || defaultButtonIcon}
        </div>
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <BorderBeam
            borderWidth={1}
            size={100}
            duration={10}
            colorFrom="#ffffff"
            colorTo="#808080"
            className="hidden dark:block"
          />
          <BorderBeam
            borderWidth={2}
            size={120}
            duration={10}
            colorFrom="#000000"
            colorTo="#aaaaaa"
            className="dark:hidden"
          />
          <DialogHeader className="mb-2">
            <DialogTitle>{editMode ? "Edit link" : "Create a link"}</DialogTitle>
            <DialogDescription className="hidden">
              {editMode
                ? "Edit the details of your short link."
                : "Fill out the form below to create a new short link."}
            </DialogDescription>
          </DialogHeader>
          <LinkForm onSuccess={handleSuccess} editMode={editMode} linkData={linkData} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{triggerButton}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{editMode ? "Edit link" : "Create a link"}</SheetTitle>
          <SheetDescription className="hidden">
            {editMode ? "Edit the details of your short link." : "Fill out the form below to create a new short link."}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <LinkForm onSuccess={handleSuccess} editMode={editMode} linkData={linkData} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
