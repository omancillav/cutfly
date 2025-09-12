"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3, Save, X } from "lucide-react";
import { toast } from "sonner";
import { profileUpdateSchema, type ProfileUpdateData } from "@/schemas/ProfileSchema";

interface ProfileFormProps {
  initialName: string;
}

export function ProfileForm({ initialName }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: initialName,
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({ name: initialName });
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to update user name
      // const response = await updateUserProfile(userId, data);

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Profile updated", {
        description: "Your name has been updated successfully",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Update error", {
        description: "There was a problem updating your profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Name
        </Label>
        <div className="flex gap-2">
          <Input
            id="name"
            name="name"
            type="text"
            value={initialName}
            className="flex-1 bg-muted/50"
            disabled
            readOnly
          />
          <Button size="icon" variant="outline" onClick={handleEdit} title="Edit name">
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Label htmlFor="name-edit" className="text-sm font-medium">
        Name
      </Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id="name-edit"
            type="text"
            placeholder="Your name"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div className="flex gap-1">
          <Button type="submit" size="icon" variant="default" disabled={isSubmitting} title="Guardar cambios">
            <Save className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
