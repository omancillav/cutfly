import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { linkFormSchema } from "@/schemas/LinkSchema";
import { createLink } from "@/lib/actions";

type LinkFormValues = z.infer<typeof linkFormSchema>;

interface LinkFormProps {
  onSuccess: () => void;
}

export function LinkForm({ onSuccess }: LinkFormProps) {
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: "",
      code: "",
      description: "",
    },
  });

  const onSubmit = async (values: LinkFormValues) => {
    try {
      const result = await createLink({
        url: values.url,
        code: values.code,
        description: values.description,
      });

      if (result.success) {
        toast.success("Link created successfully!", {
          description: `Short code: ${values.code}`,
        });

        form.reset();
        onSuccess();
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

  const onError = (errors: FieldErrors<LinkFormValues>) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Campo URL */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="https://example.com" {...field} />
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
                  maxLength={20}
                  autoComplete="off"
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
                  maxLength={200}
                  autoComplete="off"
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

        <div className="flex flex-col md:flex-row justify-end space-x-2 pt-2 gap-2.5 md:gap-0">
          <Button
            className="w-full md:w-fit"
            variant="outline"
            type="button"
            onClick={() => {
              form.reset();
              onSuccess();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-fit">
            {form.formState.isSubmitting ? "Creating..." : "Create Link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
