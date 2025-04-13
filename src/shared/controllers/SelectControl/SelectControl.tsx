import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { SelectProps } from "antd";

import Select from "@shared/ui/Select";

interface Props<T extends SelectProps> extends SelectProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  className?: string;
  label?: React.ReactNode | string;
}

const SelectControl = <T extends FieldValues>({
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
      <Select
        {...props}
        status={!!errorMessage ? "error" : undefined}
        value={value}
        onChange={(val) => {
          onChange(val);
          onChangeProp?.(val);
        }}
      />
    )}
  />
);

export default SelectControl;
