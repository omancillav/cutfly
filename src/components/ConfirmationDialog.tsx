"use client";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Trash, TriangleAlert } from "lucide-react";

interface ConfirmationDialogProps {
  onConfirm: () => void;
  isLoading?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  requireConfirmation?: {
    text: string;
    placeholder: string;
    confirmationText: string;
  };
}

export function ConfirmationDialog({
  onConfirm,
  isLoading = false,
  trigger,
  title = "Delete Link",
  description = "Are you sure you want to delete this link? This action cannot be undone.",
  requireConfirmation,
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
    setConfirmationInput("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setConfirmationInput("");
    }
  };

  const isConfirmationValid = !requireConfirmation || confirmationInput.trim() === requireConfirmation.text.trim();

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <Trash size={16} />
    </Button>
  );

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>{trigger || defaultTrigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          {requireConfirmation && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{requireConfirmation.confirmationText}</p>
              <Input
                placeholder={requireConfirmation.placeholder}
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                disabled={isLoading}
                className="font-mono"
              />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isLoading || !isConfirmationValid}
              className={cn(buttonVariants({ variant: "destructive" }))}
            >
              {isLoading ? "Deleting..." : "Delete"}
              <TriangleAlert />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{trigger || defaultTrigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <TriangleAlert className="mx-auto w-25 h-25 my-4 text-destructive" />
          <DrawerTitle className="text-lg">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {requireConfirmation && (
          <div className="px-4 space-y-3">
            <p className="text-sm text-muted-foreground">{requireConfirmation.confirmationText}</p>
            <Input
              placeholder={requireConfirmation.placeholder}
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              disabled={isLoading}
              className="font-mono"
            />
          </div>
        )}
        <DrawerFooter>
          <Button variant="destructive" onClick={handleConfirm} disabled={isLoading || !isConfirmationValid}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
