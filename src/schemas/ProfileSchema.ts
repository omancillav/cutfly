import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be at most 100 characters" })
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
