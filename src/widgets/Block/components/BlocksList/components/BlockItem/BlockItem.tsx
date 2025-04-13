import React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { DollarCircleFilled, DollarOutlined, DragOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import DeleteBlock from "@features/Block/DeleteBlock";

import BlockCard from "@entities/Block/components/BlockCard";
import { IBlock } from "@entities/Block/model/types";
import { useBlockStore } from "@entities/Block/model/store";
import { selectedBlockSelector, setSelectedBlockSelector } from "@entities/Block/model/selectors";

import Button from "@shared/ui/Button";

interface Props {
  item: IBlock;
  unavailable?: boolean;
}

const BlockItem: React.FC<Props> = ({ item, unavailable }) => {
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);

  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item value={item} id={item.block_id} style={{ y }} dragListener={false} dragControls={dragControls}>
      <BlockCard
        isActive={selectedBlock?.block_id === item.block_id}
        onClick={(block) => {
          setSelectedBlock({ block, withOriginal: true });
        }}
        endContent={
          <>
            {unavailable && (
              <Tooltip title="Block unavailable under your plan">
                <DollarCircleFilled />
              </Tooltip>
            )}

            <DeleteBlock id={item.block_id} />
            <Button
              size="small"
              type="text"
              style={{ cursor: "move" }}
              icon={<DragOutlined />}
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();

                dragControls.start(e);
              }}
            />
          </>
        }
        block={item}
      />
    </Reorder.Item>
  );
};

export default BlockItem;
