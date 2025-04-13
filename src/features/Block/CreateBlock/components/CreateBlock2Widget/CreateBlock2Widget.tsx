import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Flex, Typography } from "antd";
import { motion } from "framer-motion";

import { useCreateBlockStore } from "@features/Block/CreateBlock/model/store";
import {
  createBlockResetSelector,
  createBlockSelectedPostsSelector,
  createBlockSetStepSelector,
  createBlockStepSelector,
  createdBlockSelector,
} from "@features/Block/CreateBlock/model/selectors";
import { useCreateBlock } from "@features/Block/CreateBlock/lib/useCreateBlock";
import {
  createBlock2WidgetSchema,
  TCreateBlock2WidgetSchema,
} from "@features/Block/CreateBlock/components/CreateBlock2Widget/lib/schema";

import { isBlock2 } from "@entities/Block/model/types";
import BlockSaveCard from "@entities/Block/components/BlockSaveCard";
import { MOCK_BLOCK_2_CUSTOMIZATION } from "@entities/Block/lib/MOCK";
import BlockPostsForm from "@entities/Block/components/forms/BlockPostsForm";

import s from "./CreateBlock2Widget.module.scss";
import BlockInstagramPostsSettings from "@/features/Instagram/SettingsBlockInstagramPosts/BlockInstagramPostsSettings";

const CreateBlock2Widget: React.FC = () => {
  const createdBlock = useCreateBlockStore(createdBlockSelector);
  const resetCreate = useCreateBlockStore(createBlockResetSelector);
  const step = useCreateBlockStore(createBlockStepSelector);
  const setStep = useCreateBlockStore(createBlockSetStepSelector);
  const selectedPosts = useCreateBlockStore(createBlockSelectedPostsSelector);

  const { handleConfirm, handleCreateChange, resetCreatedBlockCustomization, isLoading } = useCreateBlock();

  const defaultValues: TCreateBlock2WidgetSchema = {
    postBorderRadius: Number(MOCK_BLOCK_2_CUSTOMIZATION.imageWrapperStyle.borderRadius),
    postsGap: Number(MOCK_BLOCK_2_CUSTOMIZATION.postsSettings.postsStyle.gap),
    postsLength: Number(MOCK_BLOCK_2_CUSTOMIZATION.postsSettings.postsLength),
    postsType: MOCK_BLOCK_2_CUSTOMIZATION.postsSettings.postsType,
    posts: selectedPosts?.length ? selectedPosts : MOCK_BLOCK_2_CUSTOMIZATION.posts,
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
  } = useForm<TCreateBlock2WidgetSchema>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(createBlock2WidgetSchema),
  });

  const handleReset = () => {
    reset(defaultValues);
    resetCreatedBlockCustomization(defaultValues);
    resetCreate();
  };

  const handleSave = (data: TCreateBlock2WidgetSchema) => {
    if (!createdBlock?.customization) return;

    if (step === 2) {
      setStep(3);
    } else {
      handleConfirm(createdBlock.customization);
    }
  };

  if (!createdBlock || !isBlock2(createdBlock)) return null;

  return (
    <form className={s.form}>
      <BlockSaveCard
        isDisabled={!isValid}
        isLoading={isLoading}
        onSave={handleSubmit(handleSave)}
        saveText={step === 2 ? "Next" : "Create"}
        resetText={step === 2 ? "Back" : "Reset"}
        onReset={handleReset}
      />

      {step === 3 ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: 0, height: "100%" }}
        >
          <BlockPostsForm control={control} errors={errors} type="add" />
        </motion.div>
      ) : (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: 0, height: "100%" }}
        >
          <Divider>Posts</Divider>
          <div className={s.form__item}>
            <BlockInstagramPostsSettings
              type="add"
              control={control}
              name="posts"
              errorMessage={errors.posts?.message}
            />
          </div>
        </motion.div>
      )}
    </form>
  );
};

export default React.memo(CreateBlock2Widget);
