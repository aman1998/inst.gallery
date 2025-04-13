import React from "react";
import type { Control, FieldErrors, Path } from "react-hook-form";
import { Divider, Flex, Typography } from "antd";
import { number, object, string, z } from "zod";

import { useChangeBlock } from "@features/ChangeProject/lib/useChangeBlock";
import { useCreateBlock } from "@features/Block/CreateBlock/lib/useCreateBlock";
import { useCreateBlockStore } from "@features/Block/CreateBlock/model/store";
import { createdBlockSelector } from "@features/Block/CreateBlock/model/selectors";
import BlockInstagramPostsSettings from "@features/Instagram/SettingsBlockInstagramPosts";

import { TCustomizeBlocks } from "@entities/Block/model/customizeTypes";
import { useBlockStore } from "@entities/Block/model/store";
import { selectedBlockSelector } from "@entities/Block/model/selectors";
import { isBlock1 } from "@entities/Block/model/types";

import { EMPTY_ERROR_TEXT } from "@shared/constants/validation";
import SelectControl from "@shared/controllers/SelectControl";
import { GAP_OPTIONS, POSTS_LENGTH_OPTIONS, POSTS_TYPE_OPTIONS } from "@shared/constants/options";
import FormItem from "@shared/ui/FormItem";
import SliderControl from "@shared/controllers/SliderControl";

import s from "./BlockPostsForm.module.scss";

export const postsCustomization = object({

  postsLength: number().min(1, { message: "Min 1" }).max(6, { message: "Max 6" }),
  postsType: string().min(1, { message: "Min 1" }),
  postsGap: number().min(0, { message: "Min 0" }).max(24, { message: "Max 24" }),
  postBorderRadius: number().min(0, { message: "Min 0" }).max(100, { message: "Max 100" }),
  posts: z
    .array(
      object({
        id: z.string(),
      })
    )
    .min(1, { message: EMPTY_ERROR_TEXT }),
});

export type TPostsCustomizationSchema = z.infer<typeof postsCustomization>;

interface Props<T extends TPostsCustomizationSchema> {
  control: Control<T>;
  errors: FieldErrors<T>;
  type: "add" | "edit";
  hidePosts?: boolean;
}

const BlockPostsForm = <T extends TPostsCustomizationSchema>({ control, errors, type = "edit" }: Props<T>) => {
  const { handleCustomizeChange } = useChangeBlock();
  const { handleCreateChange } = useCreateBlock();

  const createdBlock = useCreateBlockStore(createdBlockSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);

  const handleChange = (key: keyof TCustomizeBlocks, value: any) => {
    if (type === "add") {
      handleCreateChange(key, value);
    } else {
      handleCustomizeChange(key, value);
    }
  };

  const block = type === "add" ? createdBlock : selectedBlock;

  // TODO: Возможно стоит придумать более изящный способ.
  if (!block || (!isBlock1(block))) return null;

  return (
    <>
      <Divider>Posts</Divider>
      <FormItem className={s.form__item}>
        <Flex justify="space-between" align="center" gap={8}>
          <Typography.Text strong>Type</Typography.Text>
          <SelectControl
            onChange={(value) =>
              handleChange("postsSettings", {
                ...block?.customization.postsSettings,
                postsType: value,
              })
            }
            options={POSTS_TYPE_OPTIONS}
            control={control}
            errorMessage={errors.postsType?.message as string}
            name={"postsType" as Path<T>}
            style={{ minWidth: 96, height: 40, textAlign: "center" }}
          />
        </Flex>

        <Flex justify="space-between" align="center" gap={8}>
          <Typography.Text strong>Length</Typography.Text>
          <SelectControl
            onChange={(value) =>
              handleChange("postsSettings", {
                ...block?.customization.postsSettings,
                postsLength: typeof value === "string" ? parseFloat(value) : value,
              })
            }
            options={POSTS_LENGTH_OPTIONS}
            control={control}
            errorMessage={errors.postsLength?.message as string}
            name={"postsLength" as Path<T>}
            style={{ maxWidth: 100, height: 40, textAlign: "center" }}
          />
        </Flex>

        <Flex justify="space-between" align="center" gap={8}>
          <Typography.Text strong>Gap</Typography.Text>
          <SelectControl
            onChange={(value) =>
              handleChange("postsSettings", {
                ...block?.customization.postsSettings,
                postsStyle: {
                  gap: typeof value === "string" ? parseFloat(value) : value,
                },
              })
            }
            options={GAP_OPTIONS}
            control={control}
            errorMessage={errors.postsGap?.message as string}
            name={"postsGap" as Path<T>}
            style={{ maxWidth: 100, height: 40, textAlign: "center" }}
          />
        </Flex>

        <Typography.Text strong>Border Radius</Typography.Text>
        <SliderControl
          control={control}
          name={"postBorderRadius" as Path<T>}
          onChange={(value) =>
            handleChange("imageWrapperStyle", {
              ...block?.customization.imageWrapperStyle,
              borderRadius: value,
            })
          }
        />
      </FormItem>
    </>
  );
};

export default BlockPostsForm;
