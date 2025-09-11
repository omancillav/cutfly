import { z } from "zod";

export const linkFormSchema = z.object({
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url({ message: "Please enter a valid URL" })
    .refine(
      (url) => {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "URL must start with http:// or https://" }
    ),

  code: z
    .string()
    .min(3, { message: "Short code must be at least 3 characters" })
    .max(20, { message: "Short code must be no more than 20 characters" })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: "Short code can only contain letters, numbers, hyphens, and underscores",
    }),

  description: z
    .string()
    .max(200, { message: "Description must be no more than 200 characters" })
    .optional()
    .or(z.literal("")), // Permite string vacío
});
