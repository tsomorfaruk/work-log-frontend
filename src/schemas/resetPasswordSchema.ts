import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    token: z.string().trim().min(1, "Token is required"),
    password: z.string().trim().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export const resetPasswordDefaultValues: TResetPasswordSchema = {
  email: "",
  token: "",
  password: "",
  password_confirmation: "",
};
