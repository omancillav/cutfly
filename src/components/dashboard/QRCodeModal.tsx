"use client";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { QRCodeGenerator } from "./QRCodeGenerator";

interface QRCodeModalProps {
  linkCode: string;
  trigger?: React.ReactNode;
}

export function QRCodeModal({ linkCode, trigger }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const fullUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${linkCode}`;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const content = (
    <QRCodeGenerator 
      url={fullUrl} 
      linkCode={linkCode}
      onClose={() => setIsOpen(false)}
    />
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>QR Code for /{linkCode}</DialogTitle>
            <DialogDescription className="hidden">
              Download and share the QR code for your shortened link
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>QR Code for /{linkCode}</DrawerTitle>
          <DrawerDescription className="hidden">
            Download and share the QR code for your shortened link
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-8">
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
