"use client";
import { Splitter } from "antd";
import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import cn from "classnames";

import BlockFloatSettings from "@widgets/Block/components/BlockFloatSettings";

import { useBlockStore } from "@entities/Block/model/store";
import { blocksSelector, selectedBlockSelector, setSelectedBlockSelector } from "@entities/Block/model/selectors";

import Button from "@shared/ui/Button";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";


import s from "./CustomizeBlockLayout.module.scss";

const SPLITTER_WIDTH = 60;

interface Props {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const CustomizeBlockLayout: React.FC<Props> = ({ children, className, wrapperClassName }) => {
  const blocks = useBlockStore(blocksSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);

  const currentIndex = blocks.findIndex((block) => block.block_id === selectedBlock?.block_id);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < blocks.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setSelectedBlock({ block: blocks[currentIndex - 1], withOriginal: true });
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setSelectedBlock({ block: blocks[currentIndex + 1], withOriginal: true });
    }
  };

  return (
    <div style={{ display: "flex", height: "auto", width: "100%" }} className={wrapperClassName}>
      <Splitter className={cn(s.splitter, className)}>
        <Splitter.Panel className={s.splitter__left} resizable={false} defaultSize={SPLITTER_WIDTH}>
          <Button
            disabled={!canGoPrevious}
            onClick={handlePrevious}
            type="text"
            icon={<ArrowUpOutlined />}
            style={{ color: canGoPrevious ? PRIMARY_COLOR : "inherit" }}
          />
        </Splitter.Panel>
        {/*<Splitter.Panel min={MIN_SECOND_PANEL_WIDTH} style={{ padding: "0 16px 32px 16px" }}>*/}
        {/*  <SplitterSize size={Math.floor(sizes[1])} />*/}
        {/*  <div className={s.splitter__content}>{children}</div>*/}
        {/*</Splitter.Panel>*/}
        <div className={s.splitter__content}>{children}</div>
        <Splitter.Panel
          className={s.splitter__left}
          resizable={false}
          defaultSize={SPLITTER_WIDTH}
          style={{ position: "relative" }}
        >
          <BlockFloatSettings />
          <Button
            disabled={!canGoNext}
            onClick={handleNext}
            type="text"
            icon={<ArrowDownOutlined />}
            style={{ color: canGoNext ? PRIMARY_COLOR : "inherit" }}
          />
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

export default CustomizeBlockLayout;
