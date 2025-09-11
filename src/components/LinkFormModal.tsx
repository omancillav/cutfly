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

interface LinkFormModalProps {
  linksCount: number;
}

export function LinkFormModal({ linksCount }: LinkFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const hasReachedLimit = linksCount >= 30;

  const handleOpenChange = (open: boolean) => {
    if (open && hasReachedLimit) {
      return;
    }
    setIsOpen(open);
  };

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const triggerButton = (
    <div className="w-full md:w-fit">
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
          {hasReachedLimit ? "Link limit reached" : "Create link"}
          <Link size={16} />
        </div>
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader className="mb-2">
            <DialogTitle>Create a link</DialogTitle>
            <DialogDescription className="hidden">
              Fill out the form below to create a new short link.
            </DialogDescription>
          </DialogHeader>
          <LinkForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{triggerButton}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a link</SheetTitle>
          <SheetDescription className="hidden">Fill out the form below to create a new short link.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <LinkForm onSuccess={handleSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
