import React from "react";
import { Controller } from "react-hook-form";
import { Slider } from "antd";
import type { Control, FieldValues, Path } from "react-hook-form";
import { type SliderProps } from "rc-slider";

interface Props<T extends FieldValues> extends Omit<SliderProps, "range" | "onChange" | "handleStyle" | "trackStyle"> {
  control: Control<T>;
  name: Path<T>;
  onChange?: (value: number) => void;
}

const SliderControl = <T extends FieldValues>({
  control,
  name,
  min = 0,
  max = 100,
  step = 1,
  onChange: onChangeProp,
  ...props
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Slider
        {...props}
        range={false}
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        value={value}
        onChange={(val) => {
          onChange(val);
          onChangeProp?.(val);
        }}
      />
    )}
  />
);

export default SliderControl;
