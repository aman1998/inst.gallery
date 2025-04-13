"use client";
import React from "react";
import { Button, Divider, Modal } from "antd";
import { motion } from "framer-motion";
import cn from "classnames";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";
import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import SelectBlockType from "@features/Block/SelectBlockType";
import { useCreateBlockStore } from "@features/Block/CreateBlock/model/store";
import {
  createBlockResetSelector,
  createBlockSelectedPostsSelector,
  createBlockSetSelectedPostsSelector,
  createBlockSetStepSelector,
  createBlockStepSelector,
  createdBlockSelector,
  setCreatedBlockSelector,
} from "@features/Block/CreateBlock/model/selectors";
import SelectInstagramPosts from "@features/Instagram/SelectInstagramPosts";

import { EBlockType } from "@entities/Block/model/types";
import { checkIsBlockWithPosts } from "@entities/Block/lib/utils";
import { TCustomizeBlock } from "@entities/Block/model/customizeTypes";

import { useModal } from "@shared/hooks/useModal";

import CreateBlock1Widget from "./components/CreateBlock1Widget";
import CreateBlock2Widget from "./components/CreateBlock2Widget";
import s from "./CreateBlock.module.scss";

interface Props {
  className?: string;
}
const CreateBlock: React.FC<Props> = ({ className }) => {
  const selectedPosts = useCreateBlockStore(createBlockSelectedPostsSelector);
  const setSelectedPosts = useCreateBlockStore(createBlockSetSelectedPostsSelector);
  const step = useCreateBlockStore(createBlockStepSelector);
  const setStep = useCreateBlockStore(createBlockSetStepSelector);
  const createdBlock = useCreateBlockStore(createdBlockSelector);
  const setCreatedBlock = useCreateBlockStore(setCreatedBlockSelector);
  const reset = useCreateBlockStore(createBlockResetSelector);

  const { setNavigation } = useLKLayout();
  const { openModal, isOpen, closeModal } = useModal();

  const handleTypeSelect = React.useCallback(
    (customization: TCustomizeBlock, type: EBlockType) => {
      setCreatedBlock({
        block_id: nanoid(),
        created_at: new Date(),
        type,
        customization,
      });

      if (checkIsBlockWithPosts(type)) {
        openModal();
      } else {
        setStep(2);
      }
    },
    [openModal, setCreatedBlock, setStep]
  );

  const handleSelectingPostsConfirm = React.useCallback(() => {
    if (!createdBlock) return;

    setCreatedBlock({
      ...createdBlock,
      customization: { ...createdBlock.customization, posts: selectedPosts },
    });
    setStep(2);
    closeModal();
  }, [createdBlock, setCreatedBlock, selectedPosts, closeModal, setStep]);

  const content = React.useMemo(() => {
    if (step === 1)
      return (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: 0, height: "100%" }}
        >
          <Divider>Select widget type</Divider>
          <SelectBlockType onSelect={handleTypeSelect} />
        </motion.div>
      );

    if (!createdBlock) return <div>Block not selected</div>;

    switch (createdBlock.type) {
      case EBlockType.type2:
        return <CreateBlock1Widget />;
      case EBlockType.type2:
        return <CreateBlock2Widget />;
      case EBlockType.type4:
      default:
        return null;
    }
  }, [step, createdBlock, handleTypeSelect]);

  const limit = React.useMemo(() => {
    if (!createdBlock?.type) return 0;

    switch (createdBlock.type) {
      case EBlockType.type1:
        return 6;
      default:
        return 0;
    }
  }, [createdBlock?.type]);

  React.useEffect(
    () => () => {
      reset();
    },
    [reset]
  );

  return (
    <>
      <section className={cn(s.create, className)}>
        <Button
          style={{ width: "100%", height: 60 }}
          type="text"
          icon={<ArrowLeftOutlined />}
          size="large"
          onClick={() => (step === 1 ? setNavigation(ELKLayoutNavigation.sub) : reset())}
          className={s.create__btn}
        >
          Back
        </Button>
        <div className={s.create__content}>{content}</div>
      </section>
      <Modal
        title="Select posts"
        destroyOnClose
        open={isOpen}
        onCancel={closeModal}
        width={1000}
        closable={false}
        footer={
          <Button
            type="primary"
            disabled={selectedPosts.length <= 0 || selectedPosts.length > 8}
            onClick={handleSelectingPostsConfirm}
          >
            Confirm
          </Button>
        }
      >
        <SelectInstagramPosts limit={limit} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts} />
      </Modal>
    </>
  );
};

export default CreateBlock;
