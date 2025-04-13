import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd";
import cn from "classnames";

import s from "./TextArea.module.scss";

const { TextArea: TextAreaUI } = Input;

export interface ITextAreaProps
  extends Pick<InputProps, "variant" | "value" | "placeholder" | "maxLength" | "minLength" | "status"> {
  size?: "small" | "middle" | "large" | undefined;
  rows?: number;
  className?: string;
  disabled?: boolean;
  onChange: (val: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<ITextAreaProps> = ({ className, ...props }) => (
  <TextAreaUI {...props} className={cn(s.textArea, className)} style={{ resize: "none" }} />
);

export default TextArea;
