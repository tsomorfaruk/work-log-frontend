import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

export const forgotPasswordDefaultValues: TForgotPasswordSchema = {
  email: "",
};
