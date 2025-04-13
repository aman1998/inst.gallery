import { object, z } from "zod";

import { postsCustomization } from "@entities/Block/components/forms/BlockPostsForm/BlockPostsForm";

export const createBlock2WidgetSchema = object({})
  .extend(postsCustomization.shape);

export type TCreateBlock2WidgetSchema = z.infer<typeof createBlock2WidgetSchema>;
