import { z, object, string, boolean } from "zod";

import { EMAIL_ERROR_TEXT, EMPTY_ERROR_TEXT } from "@shared/constants/validation";

export const restorePasswordSchema = object({
  email: string().trim().email({ message: EMAIL_ERROR_TEXT }).min(1, { message: EMPTY_ERROR_TEXT }),
});

export type TRestorePasswordSchema = z.infer<typeof restorePasswordSchema>;
