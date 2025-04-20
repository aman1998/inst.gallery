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

import BlockInstagramPostsSettings from "../../../../Instagram/SettingsBlockInstagramPosts";

import s from "./CustomizeBlock2Widget.module.scss";
import { useModal } from "@/shared/hooks/useModal";
import TextAreaControl from "@/shared/controllers/TextAreaControl";

interface Props {
  isPosts?: boolean;
}

const CustomizeBlock2Widget: React.FC<Props> = ({ isPosts }) => {
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const selectedOriginalBlock = useBlockStore(selectedOriginalBlockSelector);

  const { isLoading, changeBlock: handleSave, handleCustomizeChange } = useChangeBlock();

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
      description: selectedOriginalBlock.customization.description,
      borderRadius: Number(selectedOriginalBlock.customization.imageWrapperStyle.borderRadius),

      postBorderRadius: Number(selectedOriginalBlock.customization.imageWrapperStyle.borderRadius),
      postsGap: Number(selectedOriginalBlock.customization.postsSettings.postsStyle.gap),
      postsLength: Number(selectedOriginalBlock.customization.postsSettings.postsLength),
      postsType: selectedOriginalBlock.customization.postsSettings.postsType,
      postsWithBg: !!selectedOriginalBlock.customization.postsSettings?.postsWithBg,

      posts: selectedOriginalBlock.customization.posts,
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
          <Divider>Text</Divider>
          <TextAreaControl
            onChange={(e) => handleCustomizeChange("description", e.target.value)}
            rows={3}
            control={control}
            errorMessage={errors.description?.message as string}
            name="description"
            placeholder="Description"
          />

          <BlockPostsForm control={control} errors={errors} type="edit" />
        </>
      ) : (
        <>
          <Divider>Portfolio</Divider>
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
