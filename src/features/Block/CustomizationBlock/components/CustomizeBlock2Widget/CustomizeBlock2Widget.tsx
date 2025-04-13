import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Flex, Typography } from "antd";

import { useChangeBlock } from "@features/ChangeProject/lib/useChangeBlock";
import {
  TCustomizeBlock2WidgetSchema,
  customizeBlock2WidgetSchema,
} from "@features/Block/CustomizationBlock/components/CustomizeBlock2Widget/lib/schema";

import { isBlock2 } from "@entities/Block/model/types";
import { useBlockStore } from "@entities/Block/model/store";
import {
  selectedBlockSelector,
  selectedOriginalBlockSelector,
  setSelectedBlockSelector,
} from "@entities/Block/model/selectors";
import BlockSaveCard from "@entities/Block/components/BlockSaveCard";
import BlockPostsForm from "@entities/Block/components/forms/BlockPostsForm";
import BlockButtonForm from "@entities/Block/components/forms/BlockButtonForm";

import Show from "@shared/ui/Show";
import { TNullable } from "@shared/types/common";

import BlockAdvancedForm from "../../../../../entities/Block/components/forms/BlockAdvancedForm";
import BlockInstagramPostsSettings from "../../../../Instagram/SettingsBlockInstagramPosts";

import s from "./CustomizeBlock2Widget.module.scss";
import { log } from "console";

interface Props {
  isPosts?: boolean;
}

const CustomizeBlock2Widget: React.FC<Props> = ({ isPosts }) => {
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const selectedOriginalBlock = useBlockStore(selectedOriginalBlockSelector);

  const { isLoading, changeBlock: handleSave } = useChangeBlock();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
  } = useForm<TCustomizeBlock2WidgetSchema>({
    defaultValues: {
      posts: [],
    },
    mode: "onChange",
    resolver: zodResolver(customizeBlock2WidgetSchema),
  });

  const values: TNullable<TCustomizeBlock2WidgetSchema> = React.useMemo(() => {
    if (!selectedOriginalBlock || !isBlock2(selectedOriginalBlock)) return null;
    return {
      headerAlignItems: selectedOriginalBlock.customization.headerStyle?.alignItems,
      title: selectedOriginalBlock.customization.title,
      titleLevel: selectedOriginalBlock.customization.titleLevel,
      subtitle: selectedOriginalBlock.customization.subtitle,
      borderRadius: Number(selectedOriginalBlock.customization.imageWrapperStyle.borderRadius),

      withBg: selectedOriginalBlock.customization.advancedSettings.withBg,
      bgColor: selectedOriginalBlock.customization.advancedSettings.bgColor,
      textColor: selectedOriginalBlock.customization.advancedSettings.textColor,

      postBorderRadius: Number(selectedOriginalBlock.customization.imageWrapperStyle.borderRadius),
      postsGap: Number(selectedOriginalBlock.customization.postsSettings.postsStyle.gap),
      postsLength: Number(selectedOriginalBlock.customization.postsSettings.postsLength),
      postsType: selectedOriginalBlock.customization.postsSettings.postsType,

      posts: selectedOriginalBlock.customization.posts,

      buttonVisible: selectedOriginalBlock.customization.buttonSettings.buttonVisible,
      buttonWithArrow: selectedOriginalBlock.customization.buttonSettings.buttonWithArrow,
      buttonText: selectedOriginalBlock.customization.buttonSettings.buttonText,
      buttonTab: selectedOriginalBlock.customization.buttonSettings.buttonTab,
      buttonLink: selectedOriginalBlock.customization.buttonSettings.buttonLink,
      buttonSize: selectedOriginalBlock.customization.buttonSettings.buttonSize as string,
      buttonType: selectedOriginalBlock.customization.buttonSettings.buttonType,
      buttonColor: selectedOriginalBlock.customization.buttonSettings.buttonColor,
    };
  }, [selectedOriginalBlock]);

  const handleReset = () => {
    if (!values) return;
    reset(values);
    setSelectedBlock({ block: selectedOriginalBlock });
  };

  React.useEffect(() => {
    if (!values) return;

    reset(values);
  }, [values, reset]);

  if (!selectedBlock || !isBlock2(selectedBlock)) return null;

  console.log('hello');

  return (
    <form className={s.form}>
      <Show show={isDirty}>
        <BlockSaveCard
          isDisabled={!isValid}
          isLoading={isLoading}
          onSave={handleSubmit((data) => handleSave())}
          onReset={handleReset}
        />
      </Show>

      {!isPosts ? (
        <>
          <BlockAdvancedForm type="edit" control={control} errors={errors} />
          <BlockPostsForm control={control} errors={errors} type="edit" />
          <BlockButtonForm control={control} errors={errors} type="edit" />
        </>
      ) : (
        <>
          <Divider>Posts</Divider>
          <div className={s.form__item}>
            <BlockInstagramPostsSettings
              type="edit"
              control={control}
              name="posts"
              errorMessage={errors.posts?.message}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default React.memo(CustomizeBlock2Widget);
