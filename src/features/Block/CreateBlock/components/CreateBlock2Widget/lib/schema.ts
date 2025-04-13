import { object, number, z, boolean } from "zod";

import {
  advancedCustomization,
  TAdvancedCustomizationSchema,
} from "@entities/Block/components/forms/BlockAdvancedForm/BlockAdvancedForm";
import { buttonCustomization } from "@entities/Block/components/forms/BlockButtonForm/BlockButtonForm";
import { postsCustomization } from "@entities/Block/components/forms/BlockPostsForm/BlockPostsForm";

import { EMPTY_ERROR_TEXT } from "@shared/constants/validation";
// eslint-disable-next-line max-len

export const createBlock2WidgetSchema = object({})
  .extend(advancedCustomization.shape)
  .extend(buttonCustomization.shape)
  .extend(postsCustomization.shape);

export type TCreateBlock2WidgetSchema = z.infer<typeof createBlock2WidgetSchema>;
