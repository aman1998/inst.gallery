import { object, z, string } from "zod";

import { postsCustomization } from "@entities/Block/components/forms/BlockPostsForm/BlockPostsForm";

import { EMPTY_ERROR_TEXT } from "@shared/constants/validation";
// eslint-disable-next-line max-len

export const customizeBlock2WidgetSchema = object({
  description: string().trim().min(0).max(500, { message: "Max 255 symbols" }),
}).extend(postsCustomization.shape);

export type TCustomizeBlock2WidgetSchema = z.infer<typeof customizeBlock2WidgetSchema>;
