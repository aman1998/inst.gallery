import React from "react";
import { DatePicker as DatePickerUI } from "antd";
import type { DatePickerProps } from "antd";
import cn from "classnames";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";
import { FormatType } from "rc-picker/lib/interface";

import { defaultDatePickerFormat } from "@shared/ui/DatePicker/lib/constants";

import s from "./DatePicker.module.scss";

const CustomDatePicker = DatePickerUI.generatePicker<any>(dateFnsGenerateConfig);

const DatePicker: React.FC<DatePickerProps<Date>> = ({ rootClassName, format = defaultDatePickerFormat, ...props }) => (
  <CustomDatePicker {...props} rootClassName={cn(s.datepicker, rootClassName)} format={format as FormatType<Date>} />
);

export default DatePicker;
