import React from "react";
import { Select as SelectUI } from "antd";
import type { SelectProps } from "antd";

import s from "./Select.module.scss";

interface Props extends SelectProps {
  label?: React.ReactNode | string;
}

const Select: React.FC<Props> = ({ label, ...props }) => {
  if (!label) return <SelectUI {...props} />;

  return (
    <div className={s["select-wrapper"]}>
      {typeof label === "string" ? <label>{label}</label> : label}
      <SelectUI {...props} />
    </div>
  );
};

export default Select;
