import React from "react";
import { Button as ButtonUI } from "antd";
import type { ButtonProps } from "antd";
import cn from "classnames";

import s from "./Button.module.scss";

export interface IButtonProps extends Omit<ButtonProps, "type"> {
  children?: React.ReactNode;
  type?: "default" | "primary" | "dashed" | "link" | "text";
}

const Button: React.FC<IButtonProps> = ({ children, type, className, ...props }) => (
  <ButtonUI
    {...props}
    iconPosition={props.iconPosition || "end"}
    type={type}
    className={cn(s.btn, type && s[`btn--${type}`], className)}
  >
    {children}
  </ButtonUI>
);

export default Button;
