import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be at most 100 characters" })
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s0-9\-_\.]+$/, {
      message: "Name can only contain letters, numbers, spaces, hyphens, underscores, and dots",
    }),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
