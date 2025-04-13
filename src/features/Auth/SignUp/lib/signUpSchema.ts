import { z, object, string } from "zod";

import { EMAIL_ERROR_TEXT, EMPTY_ERROR_TEXT } from "@shared/constants/validation";

export const signUpSchema = object({
  email: string().trim().email({ message: EMAIL_ERROR_TEXT }).min(1, { message: EMPTY_ERROR_TEXT }),
  password: string().trim().min(6, { message: "The password must contain at least 6 characters" }),
  confirmPassword: string().trim().min(6, { message: "Passwords do not match" }),
  agreement: z.boolean({ required_error: EMPTY_ERROR_TEXT }),
})
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(({ agreement }) => agreement, {
    message: "Consent not provided",
    path: ["agreement"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
