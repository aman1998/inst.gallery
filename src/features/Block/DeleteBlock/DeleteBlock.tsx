"use client";
import React from "react";
import { Button, FloatButton, Modal } from "antd";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useBlockStore } from "@entities/Block/model/store";
import {
  blocksSelector,
  removeBlockSelector,
  selectedBlockSelector,
  setBlocksSelector,
  setSelectedBlockSelector,
} from "@entities/Block/model/selectors";

import { createClient } from "@shared/config/supabase/client";
import { useMessage } from "@shared/hooks/useMessage";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { ERROR_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

interface Props {
  isFloating?: boolean;
  className?: string;
  id: string;
}

const DeleteBlock: React.FC<Props> = ({ className, id, isFloating }) => {
  const blocks = useBlockStore(blocksSelector);
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const setBlocks = useBlockStore(setBlocksSelector);

  const { errorMessage, successMessage, destroyMessage, loadingMessage } = useMessage();
  const removeBlock = useBlockStore(removeBlockSelector);

  const { isDemo } = useLKLayout();

  const handleDemoDelete = () => {
    const updatedBlocks = blocks.filter((block) => block.block_id !== id);
    successMessage("Successfully deleted");
    setBlocks(updatedBlocks);

    if (updatedBlocks.length) {
      setSelectedBlock({ block: updatedBlocks[0], withOriginal: true });
    } else {
      setSelectedBlock({ block: null, withOriginal: false });
    }
  };

  const handleDelete = async () => {
    loadingMessage("Deleting block");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const updatedBlocks = blocks.filter((block) => block.block_id !== id);

    const { error: e } = await supabase
      .from(ESupabaseDB.projects)
      .update({ blocks: updatedBlocks })
      .eq("email", user?.email);

    destroyMessage();
    successMessage("Successfully deleted");

    if (e) {
      errorMessage(e.message);
      return;
    }
    removeBlock(id);

    if (selectedBlock?.block_id !== id) return;

    if (updatedBlocks.length) {
      setSelectedBlock({ block: updatedBlocks[0], withOriginal: true });
    } else {
      setSelectedBlock({ block: null, withOriginal: false });
    }
  };

  const showConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    Modal.confirm({
      title: "Are you sure you want to delete this block?",
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "Cancel",
      cancelButtonProps: { type: "text" },
      onOk: () => {
        if (isDemo) {
          handleDemoDelete();
        } else {
          handleDelete();
        }
      },
    });
  };

  if (isFloating)
    return (
      <FloatButton
        style={{ color: ERROR_COLOR }}
        className={className}
        icon={<DeleteOutlined />}
        onClick={showConfirm}
      />
    );

  return (
    <Button
      // disabled={isLoading}
      className={className}
      size="small"
      danger
      icon={<DeleteFilled />}
      onClick={showConfirm}
    />
  );
};

export default DeleteBlock;
