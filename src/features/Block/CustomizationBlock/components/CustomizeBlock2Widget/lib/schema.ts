import { object, number, z, boolean } from "zod";

import {
  advancedCustomization,
  TAdvancedCustomizationSchema,
} from "@entities/Block/components/forms/BlockAdvancedForm/BlockAdvancedForm";
import { buttonCustomization } from "@entities/Block/components/forms/BlockButtonForm/BlockButtonForm";
import { postsCustomization } from "@entities/Block/components/forms/BlockPostsForm/BlockPostsForm";

import { EMPTY_ERROR_TEXT } from "@shared/constants/validation";
// eslint-disable-next-line max-len

export const customizeBlock2WidgetSchema = object({
  posts: z
    .array(
      object({
        id: z.string(),
      })
    )
    .min(1, { message: EMPTY_ERROR_TEXT }),
})
  .extend(advancedCustomization.shape)
  .extend(buttonCustomization.shape)
  .extend(postsCustomization.shape);

export type TCustomizeBlock2WidgetSchema = z.infer<typeof customizeBlock2WidgetSchema>;
