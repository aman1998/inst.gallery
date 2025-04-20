"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cn from "classnames";
import { Collapse, Typography } from "antd";

import BlockHeader from "@widgets/Block/components/BlockHeader";

import { IBlock, isBlock4 } from "@entities/Block/model/types";

import Show from "@shared/ui/Show";

import s from "./BlockCollapseWidget.module.scss";

interface Props {
  block: IBlock;
  className?: string;
}

const BlockCollapseWidget: React.FC<Props> = ({ block, className }) => {
  if (!block || !isBlock4(block)) return null;

  const {
    title,
    subtitle,
    titleLevel,
    headerStyle,
    items,
    buttonSettings,
    advancedSettings: { textColor },
  } = block.customization;

  return (
    <section className={cn(s.block, className)}>
      <BlockHeader
        buttonSettings={buttonSettings}
        color={textColor}
        title={title}
        titleLevel={titleLevel}
        subtitle={subtitle}
        headerStyle={headerStyle}
      />
      <Collapse size="large" bordered={true} ghost={false} items={items} />
    </section>
  );
};

export default BlockCollapseWidget;
