import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { DatePickerProps } from "antd";

import DatePicker from "@shared/ui/DatePicker";

interface Props<T extends FieldValues> extends DatePickerProps<Date> {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  className?: string;
}

const DatePickerControl = <T extends FieldValues>({ control, name, className, ...props }: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <DatePicker {...props} className={className} onChange={onChange} value={value ? new Date(value) : null} />
    )}
  />
);

export default DatePickerControl;
