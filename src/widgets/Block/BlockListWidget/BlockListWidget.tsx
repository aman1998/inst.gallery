"use client";
import React from "react";

import BlockPosts from "@widgets/Block/components/BlockPosts";

import { IBlock, isBlock2 } from "@entities/Block/model/types";

import FormItem from "@shared/ui/FormItem";
import Title from "@shared/ui/Title";

import s from "./BlockListWidget.module.scss";
import BlockUserInfo from "../components/BlockUserInfo";

interface Props {
  block: IBlock;
}

const BlockListWidget: React.FC<Props> = ({ block }) => {
  if (!block || !isBlock2(block)) return null;

  return (
    <div className={s.layout}>
      <BlockUserInfo className={s.layout__user} />
      <div className={s.block}>
        <Title level={2}>Portfolio</Title>
        <FormItem className={s.info__contacts}>
          Hello there! I'm thrilled to welcome you to my portfolio. I am a passionate and versatile
          full-stack developer with a keen interest in exploring the latest cutting-edge technologies.
          My journey in the world of web development has been nothing short of exhilarating, and
          I constantly strive to enhance my skills and embrace emerging trends in the industry.
        </FormItem>
        <BlockPosts customization={block.customization} className={s.block__list} />
      </div>
    </div>

  );
};
export default BlockListWidget;
