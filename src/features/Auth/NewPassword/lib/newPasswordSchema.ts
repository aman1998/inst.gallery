import { z, object, string } from "zod";

export const newPasswordSchema = object({
  password: string().trim().min(6, { message: "The password must contain at least 6 characters" }),
  confirmPassword: string().trim().min(6, { message: "Passwords do not match" }),
}).refine(({ confirmPassword, password }) => password === confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type TNewPasswordSchema = z.infer<typeof newPasswordSchema>;
