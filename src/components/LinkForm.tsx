"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { linkFormSchema } from "@/schemas/LinkSchema";
import { createLink } from "@/lib/actions";

type LinkFormValues = z.infer<typeof linkFormSchema>;

interface LinkFormProps {
  linksCount: number;
}

export function LinkForm({ linksCount }: LinkFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasReachedLimit = linksCount >= 30;

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: "",
      code: "",
      description: "",
    },
  });

  const onSubmit = async (values: LinkFormValues) => {
    // Validación adicional en el frontend
    if (hasReachedLimit) {
      toast.error("Link limit reached", {
        description: "You have reached the maximum of 30 links",
      });
      return;
    }

    try {
      console.log("Form submitted with values:", values);

      const result = await createLink({
        url: values.url,
        code: values.code,
        description: values.description,
      });

      if (result.success) {
        toast.success("Link created successfully!", {
          description: `Short code: ${values.code}`,
        });

        setIsOpen(false);
        form.reset();

        window.location.reload();
      } else {
        if (result.field === "code") {
          form.setError("code", {
            type: "manual",
            message: result.error,
          });
        } else if (result.error.includes("Link limit reached")) {
          toast.error("Link limit reached", {
            description: "You have reached the maximum of 30 links",
          });
        } else if (result.error.includes("Not authenticated")) {
          toast.error("Authentication required", {
            description: "Please log in to create links",
          });
        } else {
          toast.error("Failed to create link", {
            description: result.error,
          });
        }
      }
    } catch (error) {
      console.error("Unexpected error creating link:", error);
      toast.error("Unexpected error", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  // Handler para errores de validación
  const onError = (errors: FieldErrors<LinkFormValues>) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full md:w-fit">
          <Button className="w-full md:w-fit" disabled={hasReachedLimit}>
            <div className="flex items-center gap-2">
              {hasReachedLimit ? "Link limit reached (30/30)" : "Create link"}
              <Link size={16} />
            </div>
          </Button>
          {hasReachedLimit && (
            <p className="text-xs text-muted-foreground mt-1 text-center md:text-left">Maximum of 30 links reached</p>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Create a link</DialogTitle>
          <DialogDescription className="hidden">Fill out the form below to create a new short link.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
            {/* Campo URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Short Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mylink"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // Limpiar error del código cuando el usuario empiece a escribir
                        if (form.formState.errors.code?.type === "manual") {
                          form.clearErrors("code");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Description (opcional) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description for your short link..."
                      className="min-h-[100px] max-h-[200px] resize-y"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create Link"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
