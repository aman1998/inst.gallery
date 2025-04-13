import React from "react";
import { type Control, type Path, type FieldErrors, Controller } from "react-hook-form";
import { ColorPicker, Divider, Flex, Typography } from "antd";
import { boolean, number, object, string, z } from "zod";

import { useChangeBlock } from "@features/ChangeProject/lib/useChangeBlock";
import { useCreateBlock } from "@features/Block/CreateBlock/lib/useCreateBlock";
import { useCreateBlockStore } from "@features/Block/CreateBlock/model/store";
import { createdBlockSelector } from "@features/Block/CreateBlock/model/selectors";

import { TCustomizeBlocks } from "@entities/Block/model/customizeTypes";
import { useBlockStore } from "@entities/Block/model/store";
import { selectedBlockSelector } from "@entities/Block/model/selectors";
import { isAdvancedBlock } from "@entities/Block/components/forms/BlockAdvancedForm/model/types";

import SelectControl from "@shared/controllers/SelectControl";
import { ALIGN_ITEMS_OPTIONS, HEADLINE_OPTIONS } from "@shared/constants/options";
import InputControl from "@shared/controllers/InputControl";
import TextAreaControl from "@shared/controllers/TextAreaControl";
import FormItem from "@shared/ui/FormItem";
import ColorPickerControl from "@shared/controllers/ColorPickerControl";
import SwitchControl from "@shared/controllers/SwitchControl";

import s from "./BlockAdvancedForm.module.scss";

export const advancedCustomization = object({
  headerAlignItems: string().trim().min(0).optional(),
  title: string().trim().min(0).max(60, { message: "Max 60" }),
  titleLevel: number().min(1, { message: "Min 1" }).max(5, { message: "Max 5" }),
  subtitle: string().trim().min(0).max(250, { message: "Max 250" }),
  bgColor: string().trim().min(1),
  textColor: string().trim().min(1),
  withBg: boolean(),
});

export type TAdvancedCustomizationSchema = z.infer<typeof advancedCustomization>;

interface Props<T extends TAdvancedCustomizationSchema> {
  control: Control<T>;
  errors: FieldErrors<T>;
  hidePosition?: boolean;
  hideTitleSize?: boolean;
  type: "add" | "edit";
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const BlockAdvancedForm = <T extends TAdvancedCustomizationSchema>({
  control,
  errors,
  hidePosition,
  hideTitleSize,
  type = "edit",
  startContent,
  endContent,
}: Props<T>) => {
  const createdBlock = useCreateBlockStore(createdBlockSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);

  const { handleCustomizeChange } = useChangeBlock();
  const { handleCreateChange } = useCreateBlock();

  const handleChange = (key: keyof TCustomizeBlocks, value: any) => {
    if (type === "add") {
      handleCreateChange(key, value);
    } else {
      handleCustomizeChange(key, value);
    }
  };

  const block = type === "add" ? createdBlock : selectedBlock;

  if (!block || !isAdvancedBlock(block)) return null;

  return (
    <>
      <Divider>Advanced</Divider>
      <FormItem className={s.form__item}>
        {startContent}
        {!hidePosition && (
          <SelectControl
            onChange={(value) =>
              handleChange("headerStyle", {
                alignItems: value,
              })
            }
            onClick={(e) => e.stopPropagation()}
            options={ALIGN_ITEMS_OPTIONS}
            name={"headerAlignItems" as Path<T>}
            control={control}
            style={{ width: "max-content", minWidth: 90 }}
          />
        )}
        <Flex justify="space-between" align="center" gap={8}>
          <Typography.Text strong>With bg</Typography.Text>
          <SwitchControl
            onChange={(value) =>
              handleChange("advancedSettings", {
                ...block?.customization?.advancedSettings,
                withBg: value,
              })
            }
            control={control}
            name={"withBg" as Path<T>}
          />
        </Flex>

        <Flex justify="space-between" gap={8}>
          <Flex justify="space-between" gap={8}>
            <Typography.Text strong>Bg color</Typography.Text>

            <Controller
              name={"bgColor" as Path<T>}
              control={control}
              render={({ field: { onChange, value } }) => (
                <ColorPicker
                  mode={["single", "gradient"]}
                  size="small"
                  // value={value}
                  onChange={(color) => {
                    console.log("color =>", color.toHexString());
                    // Для градиента используем toCssString(), для других режимов - строку
                    const newValue = color.toRgbString();
                    onChange(newValue);
                    handleChange("advancedSettings", {
                      ...block?.customization.advancedSettings,
                      bgColor: color.toCssString(),
                    });
                  }}
                />
              )}
            />

            {/*<ColorPickerControl*/}
            {/*  control={control}*/}
            {/*  errorMessage={errors.bgColor?.message as string}*/}
            {/*  name={"bgColor" as Path<T>}*/}
            {/*  mode="gradient"*/}
            {/*  size="small"*/}
            {/*  onChange={(value, css) =>*/}
            {/*    handleChange("advancedSettings", {*/}
            {/*      ...block?.customization.advancedSettings,*/}
            {/*      bgColor: value.toCssString(),*/}
            {/*    })*/}
            {/*  }*/}
            {/*/>*/}
          </Flex>

          <Flex justify="space-between" gap={8}>
            <Typography.Text strong>Text color</Typography.Text>
            <ColorPickerControl
              control={control}
              errorMessage={errors.textColor?.message as string}
              name={"textColor" as Path<T>}
              size="small"
              onChange={(value, css) =>
                handleChange("advancedSettings", {
                  ...block?.customization.advancedSettings,
                  textColor: css,
                })
              }
            />
          </Flex>
        </Flex>

        <Flex justify="space-between" gap={8}>
          <InputControl
            onChange={(e) => handleChange("title", e.target.value)}
            control={control}
            errorMessage={errors.title?.message as string}
            name={"title" as Path<T>}
            placeholder="Title"
            suffix={
              !hideTitleSize && (
                <SelectControl
                  onChange={(value) => handleChange("titleLevel", value)}
                  onClick={(e) => e.stopPropagation()}
                  options={HEADLINE_OPTIONS}
                  name={"titleLevel" as Path<T>}
                  control={control}
                />
              )
            }
          />
        </Flex>
        <TextAreaControl
          onChange={(e) => handleChange("subtitle", e.target.value)}
          rows={3}
          control={control}
          errorMessage={errors.subtitle?.message as string}
          name={"subtitle" as Path<T>}
          placeholder="Description"
        />
        {endContent}
      </FormItem>
    </>
  );
};

export default BlockAdvancedForm;
