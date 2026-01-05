import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  gender: z.string().min(1, "Gender is required"),
  state: z.string().min(1, "State is required"),
  lga: z.string().min(1, "LGA is required"),
  nin: z.string().regex(/^\d{11}$/, "NIN must be exactly 11 digits"),
  phone: z
    .string()
    .regex(/^0\d{10}$/, "Phone must start with 0 and be 11 digits"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


// Export a common TypeScript type for your form data
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
