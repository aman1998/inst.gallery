"use client";
import React from "react";
import cn from "classnames";
import { Typography } from "antd";

import { IBlock, isBlock1 } from "@entities/Block/model/types";
import BlockButton from "@entities/Block/components/BlockButton";

import Title from "@shared/ui/Title";
import Show from "@shared/ui/Show";

import BlockPosts from "../components/BlockPosts";

import s from "./BlockFlexWidget.module.scss";

interface Props {
  block: IBlock;
  className?: string;
  classNameWrapper?: string;
}

const BlockFlexWidget: React.FC<Props> = ({ className, classNameWrapper, block }) => {
  if (!block || !isBlock1(block)) return null;

  const { title, subtitle, titleLevel, advancedSettings, buttonSettings } = block.customization;
  const { withBg, bgColor, textColor, isReverse, isColumn } = advancedSettings;
  // const style = withBg ? { background: `linear-gradient(135deg, ${bgColor}, var(--block-bg))` } : {};

  return (
    <section
      className={cn(s["block-wrapper"], classNameWrapper)}
      style={{ background: withBg ? bgColor : "transparent" }}
    >
      <div
        className={cn(
          s.block,

          isReverse && s["block--reverse"],
          isColumn && s["block--column"],
          isReverse && isColumn && s["block--column-reverse"],

          className
        )}
      >
        <div className={s.block__left}>
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
          <BlockButton settings={buttonSettings} />
        </div>
        <div className={s.block__right}>
          <BlockPosts customization={block.customization} />
        </div>
      </div>
    </section>
  );
};

export default BlockFlexWidget;
