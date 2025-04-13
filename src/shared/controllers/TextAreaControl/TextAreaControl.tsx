import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

import TextArea, { ITextAreaProps } from "@shared/ui/TextArea/TextArea";

interface Props<T extends FieldValues> extends Omit<ITextAreaProps, "value" | "onChange"> {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaControl = <T extends FieldValues>({
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
      <TextArea
        {...props}
        status={!!errorMessage ? "error" : undefined}
        onChange={(e) => {
          onChange(e);
          onChangeProp?.(e);
        }}
        value={value}
      />
    )}
  />
);

export default TextAreaControl;
