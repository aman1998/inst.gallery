"use client";
import React from "react";

import BlockFlexWidget from "@widgets/Block/BlockFlexWidget";
import BlockCollapseWidget from "@widgets/Block/BlockCollapseWidget";

import { EBlockType, IBlock } from "@entities/Block/model/types";
import { IProject, TProjectInfo } from "@entities/Project/model/types";

import { TNullable } from "@shared/types/common";
import BlockListWidget from "../../BlockListWidget";

interface Props {
  project: IProject | TProjectInfo;
  block: TNullable<IBlock>;
}
const BlockWidget: React.FC<Props> = ({ block, project }) => {
  const content = React.useMemo(() => {
    if (!block) return null;

    switch (block.type) {
      case EBlockType.type1:
        return <BlockFlexWidget block={block} />;
      case EBlockType.type2:
        return <BlockListWidget project={project} block={block} />;
      case EBlockType.type4:
        return <BlockCollapseWidget block={block} />;
      default:
        return null;
    }
  }, [block]);

  if (!block) return null;

  return content;
};

export default BlockWidget;
