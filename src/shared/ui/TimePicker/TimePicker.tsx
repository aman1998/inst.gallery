import React from "react";
import { DatePicker as DatePickerUI } from "antd";
import type { DatePickerProps } from "antd";
import cn from "classnames";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

import { defaultTimePickerFormat } from "@shared/ui/TimePicker/lib/constants";

import s from "./TimePicker.module.scss";

const CustomDatePicker = DatePickerUI.generatePicker<any>(dateFnsGenerateConfig);

const TimePicker: React.FC<DatePickerProps<Date>> = ({
  rootClassName,
  format = defaultTimePickerFormat,
  showNow = false,
  ...props
}) => (
  <CustomDatePicker
    {...props}
    picker="time"
    mode={undefined}
    rootClassName={cn(s.timepicker, rootClassName)}
    showNow={showNow}
    format={format}
  />
);

export default TimePicker;
