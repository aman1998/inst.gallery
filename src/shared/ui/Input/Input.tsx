import React from "react";
import type { InputProps } from "antd";
import { Input as InputUI } from "antd";
import cn from "classnames";

import EyeIcon from "@shared/icons/EyeIcon";
import { EColorVariables } from "@shared/types/colors";

import s from "./Input.module.scss";

interface Props extends InputProps {
  isPassword?: boolean;
}

const Input: React.FC<Props> = ({ isPassword, ...props }) => {
  if (isPassword)
    return (
      <InputUI.Password
        {...props}
        className={cn(s.input, props?.className, props.status === "error" && s["input--error"])}
        iconRender={(visible) => (
          <a className={s.input__password}>
            <EyeIcon visible={visible} color={EColorVariables.PRIMARY_COLOR} />
          </a>
        )}
      />
    );

  return <InputUI {...props} />;
};

export default Input;
