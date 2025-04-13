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

  return (
    <div className={s.layout}>
      <div ></div>
      <div className={s.block}>
        {/* <Title level={2}>Portfolio</Title> */}
        <BlockPosts customization={block.customization} />
      </div>
    </div>

  );
};
export default BlockListWidget;
