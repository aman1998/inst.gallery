import { object, string, z } from "zod";

import { postsCustomization } from "@entities/Block/components/forms/BlockPostsForm/BlockPostsForm";
import { EMPTY_ERROR_TEXT } from "@/shared/constants/validation";

export const customizeCreateInstagramPostSchema = object({
  title: string().trim().min(1).max(60, { message: "Max 60" }),
  content: string().trim().min(1).max(3000, { message: "Max 3000" }),
  link: string().trim().min(0).max(60, { message: "Max 60" }).nullable(),
  posts: z.array(z.object({}).passthrough()).min(1, { message: EMPTY_ERROR_TEXT }),
});

export type TCustomizeCreateInstagramPostSchema = z.infer<typeof customizeCreateInstagramPostSchema>;
