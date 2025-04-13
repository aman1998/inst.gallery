import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { ColorPicker, type ColorPickerProps } from "antd";

interface Props<T extends ColorPickerProps> extends ColorPickerProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
}

const ColorPickerControl = <T extends FieldValues>({
  control,
  onChange: onChangeProp,
  name,
  errorMessage,
  ...props
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <ColorPicker
        {...props}
        value={value}
        onChange={(color, hexString) => {
          onChange(hexString);
          onChangeProp?.(color, hexString);
        }}
      />
    )}
  />
);

export default ColorPickerControl;
