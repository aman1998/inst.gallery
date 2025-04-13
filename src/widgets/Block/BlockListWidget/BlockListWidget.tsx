"use client";
import React from "react";
import { Typography } from "antd";

import BlockHeader from "@widgets/Block/components/BlockHeader";
import BlockPosts from "@widgets/Block/components/BlockPosts";

import { IBlock, isBlock2 } from "@entities/Block/model/types";

import Show from "@shared/ui/Show";
import Title from "@shared/ui/Title";

import s from "./BlockListWidget.module.scss";

interface Props {
  block: IBlock;
}

const BlockListWidget: React.FC<Props> = ({ block }) => {
  if (!block || !isBlock2(block)) return null;

  const { headerStyle, title, subtitle, titleLevel, advancedSettings, buttonSettings } = block.customization;
  const { withBg, bgColor, textColor } = advancedSettings;

  return (
    <div className={s.layout}>
      <div ></div>
      <div className={s.block}>
        <Show show={!!title}>
          <Title level={titleLevel} className={s.block__title} style={{ color: textColor }}>
            {title}
          </Title>
        </Show>
        <Show show={!!subtitle}>
          <Typography.Text className={s.block__text} style={{ color: textColor }}>
            {subtitle}
          </Typography.Text>
        </Show>
        <Title level={3}>My works</Title>
        <BlockPosts customization={block.customization} />
      </div>
    </div>

  );
};
export default BlockListWidget;
