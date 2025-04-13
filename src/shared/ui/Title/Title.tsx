"use client";

import React from "react";
import cn from "classnames";
import { Typography } from "antd";

import s from "./Title.module.scss";

interface Props {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: React.CSSProperties;
}
const Title: React.FC<Props> = ({ level, children, className, style }) => {
  if (level === 1) {
    return (
      <h1 className={cn(s.title, className)} style={style}>
        {children}
      </h1>
    );
  }

  return (
    <Typography.Title level={level} className={cn(s.title, className)} style={{ margin: 0, ...style }}>
      {children}
    </Typography.Title>
  );
};

export default Title;
