import { object, z, string, boolean, number } from "zod";

import {
  advancedCustomization
} from "@entities/Block/components/forms/BlockAdvancedForm/BlockAdvancedForm";
import {
  buttonCustomization,
} from "@entities/Block/components/forms/BlockButtonForm/BlockButtonForm";
import { postsCustomization } from "@entities/Block/components/forms/BlockPostsForm/BlockPostsForm";

import { EMPTY_ERROR_TEXT } from "@shared/constants/validation";

export const customizeBlockFlexWidgetSchema = object({
  isReverse: z.boolean({ required_error: EMPTY_ERROR_TEXT }),
  isColumn: z.boolean({ required_error: EMPTY_ERROR_TEXT }),
})
  .extend(advancedCustomization.shape)
  .extend(buttonCustomization.shape)
  .extend(postsCustomization.shape);

export type TCustomizeBlockFlexWidgetSchema = z.infer<typeof customizeBlockFlexWidgetSchema>;
