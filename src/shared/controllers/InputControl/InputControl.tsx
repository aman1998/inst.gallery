import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { InputProps } from "antd";

import Input from "@shared/ui/Input";

interface Props<T extends InputProps> extends InputProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  isPassword?: boolean;
  isCustomInput?: boolean;
}

const InputControl = <T extends FieldValues>({
  control,
  onChange: onChangeProp,
  name,
  errorMessage,
  isCustomInput,
  ...props
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => {
      if (isCustomInput) {
        return (
          <input
            placeholder={props.placeholder}
            onChange={(e) => {
              onChange(e);
              onChangeProp?.(e);
            }}
            value={value}
          />
        );
      } else {
        return (
          <Input
            {...props}
            status={!!errorMessage ? "error" : undefined}
            value={value}
            onChange={(e) => {
              onChange(e);
              onChangeProp?.(e);
            }}
          />
        );
      }
    }}
  />
);

export default InputControl;
