"use client";
import React from "react";

import BlockPosts from "@widgets/Block/components/BlockPosts";

import { IBlock, isBlock2 } from "@entities/Block/model/types";
import { IProject } from "@entities/Project/model/types";

import FormItem from "@shared/ui/FormItem";

import s from "./BlockListWidget.module.scss";

interface Props {
  block: IBlock;
  project: IProject;
}

const BlockListWidget: React.FC<Props> = ({ block, project }) => {
  if (!block || !isBlock2(block)) return null;

  return (
    <div className={s.block}>
      {/* <Title level={3}>Portfolio</Title> */}
      {block.customization.description && (
        <FormItem className={s.info__contacts}>{block.customization.description}</FormItem>
      )}
      <BlockPosts customization={block.customization} className={s.block__list} />
    </div>
  );
};
export default BlockListWidget;
