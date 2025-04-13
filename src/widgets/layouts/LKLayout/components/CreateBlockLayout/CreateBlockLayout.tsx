"use client";
import { Splitter } from "antd";
import React from "react";
import cn from "classnames";

import s from "./CreateBlockLayout.module.scss";

const SPLITTER_WIDTH = 60;

interface Props {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const CreateBlockLayout: React.FC<Props> = ({ children, className, wrapperClassName }) => (
  <div style={{ display: "flex", height: "auto", width: "100%" }} className={wrapperClassName}>
    <Splitter className={cn(s.splitter, className)}>
      <Splitter.Panel
        className={s.splitter__left}
        min={SPLITTER_WIDTH}
        max={SPLITTER_WIDTH}
        resizable={false}
        defaultSize={SPLITTER_WIDTH}
      />
      <div className={s.splitter__content}>{children}</div>
      <Splitter.Panel
        className={s.splitter__left}
        min={SPLITTER_WIDTH}
        max={SPLITTER_WIDTH}
        resizable={false}
        defaultSize={SPLITTER_WIDTH}
        style={{ position: "relative" }}
      />
    </Splitter>
  </div>
);

export default CreateBlockLayout;
