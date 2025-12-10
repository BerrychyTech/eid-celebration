import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  fullName: z.string().optional(),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Full name is required"),

  // validate first, then transform
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^0\d{10}$/, "Phone must start with 0 and be 11 digits (e.g. 08012345678)")
    .transform((val) => val.replace(/\s/g, "")),
});

// Export a common TypeScript type for your form data
export type AuthFormData = z.infer<typeof registerSchema> | z.infer<typeof loginSchema>;
