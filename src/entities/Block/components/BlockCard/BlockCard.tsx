import React from "react";
import { BlockOutlined } from "@ant-design/icons";
import cn from "classnames";

import { IBlock } from "@entities/Block/model/types";

import { formattedDate } from "@shared/utils/times";

import s from "./BlockCard.module.scss";

interface Props {
  className?: string;
  isActive?: boolean;
  block: IBlock;
  onClick?: (val: IBlock) => void;
  endContent?: React.ReactNode;
}
const BlockCard: React.FC<Props> = ({ className, isActive, block, endContent, onClick }) => (
  <a className={cn(s.block, isActive && s["block--active"], className)} onClick={() => onClick?.(block)}>
    <BlockOutlined className={s.block__icon} />
    <div className={s.block__text}>{formattedDate(block.created_at)}</div>

    {endContent && <div className={s.block__btns}>{endContent}</div>}
  </a>
);

export default BlockCard;
