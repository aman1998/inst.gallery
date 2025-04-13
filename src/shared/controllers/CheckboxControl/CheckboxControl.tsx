import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { CheckboxProps } from "antd";

import Checkbox from "@shared/ui/Checkbox";

interface Props<T extends CheckboxProps> extends CheckboxProps {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
}

const CheckboxControl = <T extends FieldValues>({ control, name, errorMessage, children, ...props }: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Checkbox {...props} value={value} onChange={onChange}>
        {children}
      </Checkbox>
    )}
  />
);

export default CheckboxControl;
