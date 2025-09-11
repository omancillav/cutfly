"use client";

import * as React from "react";

interface CustomBackdropProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function CustomBackdrop({ isOpen, onClose, children }: CustomBackdropProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when dialog is open
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-200"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)", // Para Safari
        zIndex: 50,
      }}
      onClick={(e) => {
        // Only close if clicking the backdrop itself, not the content
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}
