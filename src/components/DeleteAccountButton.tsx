"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteUserAccountAction } from "@/lib/actions";
import { signOut } from "@/lib/auth-actions";

export function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteUserAccountAction();

      if (result.success) {
        toast.success("Account deleted", {
          description: "Your account and all your links have been permanently deleted.",
        });

        setTimeout(async () => {
          await signOut();
        }, 1000);
      } else {
        toast.error("Delete error", {
          description: result.error || "There was a problem deleting your account. Please try again.",
        });
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Delete error", {
        description: "There was a problem deleting your account. Please try again.",
      });
      setIsDeleting(false);
    }
  };

  return (
    <ConfirmationDialog
      onConfirm={handleDeleteAccount}
      isLoading={isDeleting}
      title="Delete Account"
      description="Are you sure you want to delete your account? This will permanently remove your account and all your links. This action cannot be undone."
      trigger={
        <Button variant="destructive" className="flex-1" disabled={isDeleting} title="Permanently delete account">
          <Trash2 className="w-4 h-4" />
          {isDeleting ? "Deleting..." : "Delete Account"}
        </Button>
      }
    />
  );
}
