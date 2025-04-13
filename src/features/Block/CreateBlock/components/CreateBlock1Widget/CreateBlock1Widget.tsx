import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Flex, Typography } from "antd";
import { motion } from "framer-motion";
import { string } from "zod";

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
  createBlockFlexWidgetSchema,
  TCreateBlockFlexWidgetSchema,
} from "@features/Block/CreateBlock/components/CreateBlock1Widget/lib/schema";

import { isBlock1 } from "@entities/Block/model/types";
import BlockSaveCard from "@entities/Block/components/BlockSaveCard";
import { MOCK_BLOCK_1_CUSTOMIZATION } from "@entities/Block/lib/MOCK";

import SwitchControl from "@shared/controllers/SwitchControl";

import BlockButtonForm from "../../../../../entities/Block/components/forms/BlockButtonForm";
import BlockAdvancedForm from "../../../../../entities/Block/components/forms/BlockAdvancedForm";
import BlockInstagramPostsSettings from "../../../../Instagram/SettingsBlockInstagramPosts";

import s from "./CreateBlock1Widget.module.scss";
import BlockPostsForm from "@/entities/Block/components/forms/BlockPostsForm";

const CreateBlock1Widget: React.FC = () => {
  const createdBlock = useCreateBlockStore(createdBlockSelector);
  const resetCreate = useCreateBlockStore(createBlockResetSelector);
  const step = useCreateBlockStore(createBlockStepSelector);
  const setStep = useCreateBlockStore(createBlockSetStepSelector);
  const selectedPosts = useCreateBlockStore(createBlockSelectedPostsSelector);

  const { handleConfirm, handleCreateChange, resetCreatedBlockCustomization, isLoading } = useCreateBlock();

  const defaultValues: TCreateBlockFlexWidgetSchema = {
    headerAlignItems: MOCK_BLOCK_1_CUSTOMIZATION.headerStyle?.alignItems as string,
    title: MOCK_BLOCK_1_CUSTOMIZATION.title,
    titleLevel: MOCK_BLOCK_1_CUSTOMIZATION.titleLevel,
    subtitle: MOCK_BLOCK_1_CUSTOMIZATION.subtitle,
    isColumn: MOCK_BLOCK_1_CUSTOMIZATION.advancedSettings.isColumn,
    isReverse: MOCK_BLOCK_1_CUSTOMIZATION.advancedSettings.isReverse,


    postBorderRadius: Number(MOCK_BLOCK_1_CUSTOMIZATION.imageWrapperStyle.borderRadius),
    postsGap: Number(MOCK_BLOCK_1_CUSTOMIZATION.postsSettings.postsStyle.gap),
    postsLength: Number(MOCK_BLOCK_1_CUSTOMIZATION.postsSettings.postsLength),
    postsType: MOCK_BLOCK_1_CUSTOMIZATION.postsSettings.postsType,


    withBg: MOCK_BLOCK_1_CUSTOMIZATION.advancedSettings.withBg,
    bgColor: MOCK_BLOCK_1_CUSTOMIZATION.advancedSettings.bgColor,
    textColor: MOCK_BLOCK_1_CUSTOMIZATION.advancedSettings.textColor,

    posts: selectedPosts?.length ? selectedPosts : MOCK_BLOCK_1_CUSTOMIZATION.posts,

    buttonVisible: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonVisible,
    buttonWithArrow: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonWithArrow,
    buttonText: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonText,
    buttonTab: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonTab,
    buttonLink: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonLink,
    buttonSize: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonSize as string,
    buttonType: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonType,
    buttonColor: MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings.buttonColor,
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
  } = useForm<TCreateBlockFlexWidgetSchema>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(createBlockFlexWidgetSchema),
  });

  const handleReset = () => {
    reset(defaultValues);
    resetCreatedBlockCustomization(defaultValues);
    resetCreate();
  };

  const handleSave = (data: TCreateBlockFlexWidgetSchema) => {
    if (!createdBlock?.customization) return;

    if (step === 2) {
      setStep(3);
    } else {
      handleConfirm(createdBlock.customization);
    }
  };

  if (!createdBlock || !isBlock1(createdBlock)) return null;

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
          <BlockAdvancedForm
            hidePosition
            type="add"
            control={control}
            errors={errors}
            endContent={
              <>
                <Flex justify="space-between" align="center" gap={8}>
                  <Typography.Text strong>Reversed</Typography.Text>
                  <SwitchControl
                    onChange={(value) =>
                      handleCreateChange("advancedSettings", {
                        ...createdBlock?.customization?.advancedSettings,
                        isReverse: value,
                      })
                    }
                    control={control}
                    name="isReverse"
                  />
                </Flex>

                <Flex justify="space-between" align="center" gap={8}>
                  <Typography.Text strong>Columned</Typography.Text>
                  <SwitchControl
                    onChange={(value) =>
                      handleCreateChange("advancedSettings", {
                        ...createdBlock?.customization?.advancedSettings,
                        isColumn: value,
                      })
                    }
                    control={control}
                    name="isColumn"
                  />
                </Flex>
              </>
            }
          />

          <BlockPostsForm type="add" control={control} errors={errors} />
          <BlockButtonForm type="add" control={control} errors={errors} />
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

export default CreateBlock1Widget;
