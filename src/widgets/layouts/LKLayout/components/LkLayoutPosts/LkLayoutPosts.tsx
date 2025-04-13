import React from "react";
import { Divider, Empty } from "antd";

import { useBlockStore } from "@entities/Block/model/store";
import { selectedBlockSelector } from "@entities/Block/model/selectors";
import { EBlockType } from "@entities/Block/model/types";

import CustomizeBlock1Widget from "../../../../../features/Block/CustomizationBlock/components/CustomizeBlock1Widget";
import CustomizeBlock2Widget from "@/features/Block/CustomizationBlock/components/CustomizeBlock2Widget";

const LkLayoutPosts = () => {
  const selectedBlock = useBlockStore(selectedBlockSelector);

  return React.useMemo(() => {
    if (!selectedBlock) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Create/Select block" />;

    switch (selectedBlock.type) {
      case EBlockType.type1:
        return <CustomizeBlock1Widget isPosts />;
      case EBlockType.type2:
        return <CustomizeBlock2Widget isPosts />;
      default:
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Not support posts" />;
    }
  }, [selectedBlock]);
};

export default LkLayoutPosts;
