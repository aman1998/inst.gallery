import { z, object, string, boolean } from "zod";

import { EMAIL_ERROR_TEXT, EMPTY_ERROR_TEXT } from "@shared/constants/validation";

export const signInSchema = object({
  email: string().trim().email({ message: EMAIL_ERROR_TEXT }).min(1, { message: EMPTY_ERROR_TEXT }),
  password: string().trim().min(1, { message: "Enter your password" }),
  remember: boolean({ required_error: EMPTY_ERROR_TEXT }),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
