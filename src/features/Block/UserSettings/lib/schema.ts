import { object, z, string, boolean, number } from "zod";

import { EMPTY_ERROR_TEXT } from "@shared/constants/validation";

export const ignoreLinks = [
  "lk",
  "profile",
  "checkout",
  "api",
  "privacy",
  "terms",
  "contacts",
  // "demo",
  "page",
  "customize",
];

export const userSettingsSchema = object({
  name: string().trim().min(2, { message: "Min 2 symbols" }).max(50, { message: "Max 50 symbols" }),
  profession: string().trim().min(2, { message: "Min 2 symbols" }).max(50, { message: "Max 50 symbols" }),
  description: string().trim().min(2, { message: "Min 2 symbols" }).max(500, { message: "Max 500 symbols" }),
  avatar: string().nullable().optional(),
  links: z
    .array(
      z.object({
        type: z.enum(["email", "phone", "twitch", "linkedin"]),
        value: z.string().min(1, "Required"),
      })
    )
    .optional(),
});

export type TUserSettingsSchema = z.infer<typeof userSettingsSchema>;
