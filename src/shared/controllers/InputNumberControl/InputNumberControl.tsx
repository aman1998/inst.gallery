import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { InputNumber, type InputNumberProps } from "antd";

interface Props<T extends InputNumberProps> extends InputNumberProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  isPassword?: boolean;
}

const InputNumberControl = <T extends FieldValues>({
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
      <InputNumber
        {...props}
        status={!!errorMessage ? "error" : undefined}
        value={value}
        onChange={(e) => {
          onChange(e);
          onChangeProp?.(e);
        }}
      />
    )}
  />
);

export default InputNumberControl;
