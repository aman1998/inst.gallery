"use client";
import React from "react";
import Image from "next/image";
import { Divider } from "antd";

import { EBlockType } from "@entities/Block/model/types";
import { TCustomizeBlock } from "@entities/Block/model/customizeTypes";
import { MOCK_BLOCK_1_CUSTOMIZATION } from "@entities/Block/lib/MOCK";

import s from "./SelectBlockType.module.scss";

interface Props {
  onSelect: (customization: TCustomizeBlock, type: EBlockType) => void;
  isLoading?: boolean;
}

const blockGroups = [
  {
    title: "Hero",
    blocks: [
      { type: EBlockType.type1, customization: MOCK_BLOCK_1_CUSTOMIZATION, image: "/screens/screen-about-2.png" },
    ],
  },
];

const SelectBlockType: React.FC<Props> = ({ onSelect, isLoading }) => {
  const handleClick = (customization: TCustomizeBlock, type: EBlockType) => {
    if (isLoading) return;

    onSelect(customization, type);
  };

  return (
    <div className={s.groups}>
      {blockGroups.map((group) => (
        <div key={group.title} className={s.group}>
          <Divider>{group.title}</Divider>
          <div className={s.group__list}>
            {group.blocks.map((block) => (
              <div
                className={s["group__item"]}
                key={block.type}
                onClick={() => handleClick(block.customization, block.type)}
              >
                <Image src={block.image} alt="Created type" quality={75} fill />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectBlockType;
