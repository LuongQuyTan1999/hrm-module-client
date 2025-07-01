import { z } from "zod";

export const createAccountSchema = z
  .object({
    username: z.string().min(2, "First name must be at least 2 characters"),
    // email: z
    //   .string()
    //   .min(1, "Email is required")
    //   .email("Please enter a valid email"),
    role: z.string().min(2, "Role must be at least 2 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    sendWelcomeEmail: z.boolean(),
    requirePasswordChange: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
