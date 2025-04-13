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
import BlockButtonForm from "@entities/Block/components/forms/BlockButtonForm";
import BlockAdvancedForm from "@entities/Block/components/forms/BlockAdvancedForm";


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
    headerAlignItems: MOCK_BLOCK_2_CUSTOMIZATION.headerStyle?.alignItems as string,
    title: MOCK_BLOCK_2_CUSTOMIZATION.title,
    titleLevel: MOCK_BLOCK_2_CUSTOMIZATION.titleLevel,
    subtitle: MOCK_BLOCK_2_CUSTOMIZATION.subtitle,

    postBorderRadius: Number(MOCK_BLOCK_2_CUSTOMIZATION.imageWrapperStyle.borderRadius),
    postsGap: Number(MOCK_BLOCK_2_CUSTOMIZATION.postsSettings.postsStyle.gap),
    postsLength: Number(MOCK_BLOCK_2_CUSTOMIZATION.postsSettings.postsLength),
    postsType: MOCK_BLOCK_2_CUSTOMIZATION.postsSettings.postsType,

    posts: selectedPosts?.length ? selectedPosts : MOCK_BLOCK_2_CUSTOMIZATION.posts,

    withBg: MOCK_BLOCK_2_CUSTOMIZATION.advancedSettings.withBg,
    bgColor: MOCK_BLOCK_2_CUSTOMIZATION.advancedSettings.bgColor,
    textColor: MOCK_BLOCK_2_CUSTOMIZATION.advancedSettings.textColor,

    buttonVisible: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonVisible,
    buttonWithArrow: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonWithArrow,
    buttonText: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonText,
    buttonTab: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonTab,
    buttonLink: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonLink,
    buttonSize: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonSize as string,
    buttonType: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonType,
    buttonColor: MOCK_BLOCK_2_CUSTOMIZATION.buttonSettings.buttonColor,
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
          <BlockAdvancedForm type="add" control={control} errors={errors} />
          <BlockPostsForm control={control} errors={errors} type="add" />
          <BlockButtonForm control={control} errors={errors} type="add" />
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
