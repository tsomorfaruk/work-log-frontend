import { z } from "zod";
export const createLoginSchema = () =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z.string().trim().min(1, "Password is required"),
  });

export const LoginSchema = createLoginSchema();
export type TLoginSchema = z.infer<typeof LoginSchema>;

export const loginDefaultValues: TLoginSchema = {
  email: "admin@worklog.pylabsolution.com",
  password: "admin.password",
};
