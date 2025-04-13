import React from "react";
import cn from "classnames";

import s from "./BlockLayout.module.scss";

interface Props {
  children: React.ReactNode;
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

const BlockLayout: React.FC<Props> = ({ children, className, endContent, startContent, title }) => (
  <div className={cn(s.layout, className)}>
    <div className={s.layout__header}>
      <div className={s.layout__left}>
        {title && <h1 className={s.layout__title}>{title}</h1>}
        {startContent}
      </div>
      {endContent}
    </div>
    {children}
  </div>
);

export default BlockLayout;
