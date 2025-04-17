import { object, z } from "zod";

import { postsCustomization } from "@entities/Block/components/forms/BlockPostsForm/BlockPostsForm";

import { EMPTY_ERROR_TEXT } from "@shared/constants/validation";
// eslint-disable-next-line max-len

export const customizeBlock2WidgetSchema = object({}).extend(postsCustomization.shape);

export type TCustomizeBlock2WidgetSchema = z.infer<typeof customizeBlock2WidgetSchema>;
