import React from "react";
import { Flex } from "antd";
import cn from "classnames";

import s from "./FormItem.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const FormItem: React.FC<Props> = ({ className, children }) => (
  <Flex vertical gap={16} className={cn(s.block, className)}>
    {children}
  </Flex>
);

export default FormItem;
