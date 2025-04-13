import React from "react";
import type { CheckboxProps } from "antd";
import { Checkbox as CheckboxUI } from "antd";

const Checkbox: React.FC<CheckboxProps> = (props) => <CheckboxUI {...props} />;

export default Checkbox;
