"use client";
import React from "react";
import cn from "classnames";

import BlockPosts from "@widgets/Block/components/BlockPosts";

import { IBlock, isBlock2 } from "@entities/Block/model/types";

import FormItem from "@shared/ui/FormItem";

import s from "./BlockListWidget.module.scss";
import { Typography } from "antd";

interface Props {
  block: IBlock;
  className?: string;
}

const BlockListWidget: React.FC<Props> = ({ block, className }) => {
  if (!block || !isBlock2(block)) return null;

  return (
    <section className={cn(s.block, className)}>
      {/* <Typography.Title level={3} style={{ margin: 0 }}>
        Portfolio
      </Typography.Title> */}
      {block.customization.description && (
        <FormItem className={s.info__contacts}>{block.customization.description}</FormItem>
      )}
      <BlockPosts customization={block.customization} className={s.block__list} />
    </section>
  );
};
export default BlockListWidget;
