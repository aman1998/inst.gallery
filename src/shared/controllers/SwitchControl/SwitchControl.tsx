import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { type SwitchProps, Switch } from "antd";

interface Props<T extends SwitchProps> extends SwitchProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  isPassword?: boolean;
}

const SwitchControl = <T extends FieldValues>({
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
      <Switch
        {...props}
        value={value}
        onChange={(val, e) => {
          onChange(val);
          onChangeProp?.(val, e);
        }}
      />
    )}
  />
);

export default SwitchControl;
