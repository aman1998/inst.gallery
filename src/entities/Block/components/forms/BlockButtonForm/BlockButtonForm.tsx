import React from "react";
import type { Control, FieldValues, Path, FieldErrors } from "react-hook-form";
import { Divider, Flex, Switch, Typography } from "antd";
import { boolean, object, string, z } from "zod";

import { useChangeBlock } from "@features/ChangeProject/lib/useChangeBlock";
import { useCreateBlock } from "@features/Block/CreateBlock/lib/useCreateBlock";
import { useCreateBlockStore } from "@features/Block/CreateBlock/model/store";
import { createdBlockSelector } from "@features/Block/CreateBlock/model/selectors";

import { TCustomizeBlocks } from "@entities/Block/model/customizeTypes";
import { useBlockStore } from "@entities/Block/model/store";
import { selectedBlockSelector } from "@entities/Block/model/selectors";
import { isBlock1, isBlock2 } from "@entities/Block/model/types";

import SelectControl from "@shared/controllers/SelectControl";
import { BUTTON_SIZE_OPTIONS, BUTTON_TAB_OPTIONS, BUTTON_TYPE_OPTIONS } from "@shared/constants/options";
import InputControl from "@shared/controllers/InputControl";
import FormItem from "@shared/ui/FormItem";
import SwitchControl from "@shared/controllers/SwitchControl";
import ColorPickerControl from "@shared/controllers/ColorPickerControl";

import s from "./BlockButtonForm.module.scss";

export const buttonCustomization = object({
  buttonVisible: boolean(),
  buttonWithArrow: boolean(),
  buttonText: string().trim().min(0).max(20, { message: "Max 20" }),
  buttonType: string().trim().min(1),
  buttonSize: string().trim().min(1),
  buttonTab: string().trim().min(1),
  buttonColor: string().trim().min(1),
  buttonLink: string()
    .trim()
    .min(0)
    .max(255, { message: "Max 255 symbols" })
    .regex(/^$|^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/, { message: "Invalid URL" }),
});

export type TButtonCustomizationSchema = z.infer<typeof buttonCustomization>;

interface Props<T extends TButtonCustomizationSchema> {
  control: Control<T>;
  errors: FieldErrors<T>;
  type: "add" | "edit";
}

const BlockButtonForm = <T extends TButtonCustomizationSchema>({ control, errors, type = "edit" }: Props<T>) => {
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

  // Нужно проверить на все блоки, где используется кнопка.
  // TODO: Возможно стоит придумать более изящный способ.
  if (!block || (!isBlock1(block) && !isBlock2(block))) return null;

  return (
    <>
      <Divider>Button</Divider>
      <FormItem className={s.form__item}>
        <Flex justify="space-between" gap={8}>
          <Typography.Text strong>Show</Typography.Text>
          <SwitchControl
            defaultValue={true}
            onChange={(value) =>
              handleChange("buttonSettings", {
                ...block?.customization.buttonSettings,
                buttonVisible: value,
              })
            }
            control={control}
            name={"buttonVisible" as Path<T>}
            size="default"
          />
        </Flex>

        <InputControl
          onChange={(e) =>
            handleChange("buttonSettings", {
              ...block?.customization.buttonSettings,
              buttonText: e.target.value,
            })
          }
          control={control}
          errorMessage={errors.buttonText?.message as string}
          name={"buttonText" as Path<T>}
          placeholder="Text"
        />

        <InputControl
          disabled={!block?.customization?.buttonSettings.buttonText}
          onChange={(e) =>
            handleChange("buttonSettings", {
              ...block?.customization.buttonSettings,
              buttonLink: e.target.value,
            })
          }
          control={control}
          errorMessage={errors.buttonLink?.message as string}
          name={"buttonLink" as Path<T>}
          placeholder="Link"
        />

        <Flex gap={4}>
          <SelectControl
            onChange={(value) =>
              handleChange("buttonSettings", {
                ...block?.customization.buttonSettings,
                buttonType: value,
              })
            }
            size="small"
            errorMessage={errors.buttonType?.message as string}
            onClick={(e) => e.stopPropagation()}
            options={BUTTON_TYPE_OPTIONS}
            name={"buttonType" as Path<T>}
            control={control}
            style={{ width: "max-content", minWidth: 90 }}
          />

          <SelectControl
            onChange={(value) =>
              handleChange("buttonSettings", {
                ...block?.customization.buttonSettings,
                buttonSize: value,
              })
            }
            size="small"
            errorMessage={errors.buttonSize?.message as string}
            onClick={(e) => e.stopPropagation()}
            options={BUTTON_SIZE_OPTIONS}
            name={"buttonSize" as Path<T>}
            control={control}
            style={{ width: "max-content", minWidth: 90 }}
          />

          <SelectControl
            onChange={(value) =>
              handleChange("buttonSettings", {
                ...block?.customization.buttonSettings,
                buttonTab: value,
              })
            }
            size="small"
            errorMessage={errors.buttonTab?.message as string}
            onClick={(e) => e.stopPropagation()}
            options={BUTTON_TAB_OPTIONS}
            name={"buttonTab" as Path<T>}
            control={control}
            style={{ width: "max-content", minWidth: 90 }}
          />
        </Flex>

        <Flex justify="space-between" gap={8}>
          <Typography.Text strong>With arrow</Typography.Text>
          <SwitchControl
            defaultValue={true}
            onChange={(value) =>
              handleChange("buttonSettings", {
                ...block?.customization.buttonSettings,
                buttonWithArrow: value,
              })
            }
            control={control}
            name={"buttonWithArrow" as Path<T>}
            size="default"
          />
        </Flex>

        <Flex justify="space-between" gap={8}>
          <Typography.Text strong>Color</Typography.Text>
          <ColorPickerControl
            control={control}
            errorMessage={errors.buttonColor?.message as string}
            name={"buttonColor" as Path<T>}
            size="small"
            onChange={(value, css) =>
              handleChange("buttonSettings", {
                ...block?.customization.buttonSettings,
                buttonColor: css,
              })
            }
          />
        </Flex>
      </FormItem>
    </>
  );
};

export default BlockButtonForm;
