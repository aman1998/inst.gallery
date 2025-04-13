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

export const blockAdvancedSettingsSchema = object({
  link: string()
    .trim()
    .min(2, { message: "Min 2 symbols" })
    .max(20, { message: "Max 20 symbols" })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Only alphanumeric characters, dashes, and underscores are allowed" })
    .refine((value) => !ignoreLinks.includes(value.toLowerCase()), {
      message: "Invalid word: customize, checkout, or api are not allowed",
    }),
  title: string()
    .trim()
    .min(2, { message: "Min 2 symbols" })
    .max(15, { message: "Max 15 symbols" })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Only alphanumeric characters, dashes, and underscores are allowed" }),
  // .refine((value) => !ignoreLinks.includes(value.toLowerCase()), {
  //   message: "Invalid word: not allowed",
  // })
  description: string().trim().min(2, { message: "Min 2 symbols" }).max(60, { message: "Max 60 symbols" }),
  // .regex(/^[a-zA-Z0-9_-]+$/, { message: "Only alphanumeric characters, dashes, and underscores are allowed" })
  // .refine((value) => !ignoreLinks.includes(value.toLowerCase()), {
  //   message: "Invalid word: not allowed",
  // }),
  primary_color: string().trim().min(1, { message: EMPTY_ERROR_TEXT }),
  favicon: string().trim().min(0).optional(),

  isPublish: boolean(),
});

export type TBlockAdvancedSettingsSchema = z.infer<typeof blockAdvancedSettingsSchema>;
