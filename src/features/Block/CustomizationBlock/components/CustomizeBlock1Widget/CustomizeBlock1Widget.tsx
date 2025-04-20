import React from "react";
import { type Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Flex, Typography } from "antd";
import { string } from "zod";

import {
  customizeBlockFlexWidgetSchema,
  TCustomizeBlockFlexWidgetSchema,
} from "@features/Block/CustomizationBlock/components/CustomizeBlock1Widget/lib/schema";
import { useChangeBlock } from "@features/ChangeProject/lib/useChangeBlock";

import { isBlock1 } from "@entities/Block/model/types";
import { useBlockStore } from "@entities/Block/model/store";
import {
  selectedBlockSelector,
  selectedOriginalBlockSelector,
  setSelectedBlockSelector,
} from "@entities/Block/model/selectors";
import BlockSaveCard from "@entities/Block/components/BlockSaveCard";
import BlockPostsForm from "@entities/Block/components/forms/BlockPostsForm";

import FormItem from "@shared/ui/FormItem";
import Show from "@shared/ui/Show";
import SliderControl from "@shared/controllers/SliderControl";
import SwitchControl from "@shared/controllers/SwitchControl";
import { TNullable } from "@shared/types/common";
import SelectControl from "@shared/controllers/SelectControl";
import { GAP_OPTIONS } from "@shared/constants/options";

import BlockButtonForm from "../../../../../entities/Block/components/forms/BlockButtonForm";
import BlockInstagramPostsSettings from "../../../../Instagram/SettingsBlockInstagramPosts";
import BlockAdvancedForm from "../../../../../entities/Block/components/forms/BlockAdvancedForm";

import s from "./CustomizeBlock1Widget.module.scss";

interface Props {
  isPosts?: boolean;
}
const CustomizeBlock1Widget: React.FC<Props> = ({ isPosts }) => {
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const selectedOriginalBlock = useBlockStore(selectedOriginalBlockSelector);

  const { isLoading, handleCustomizeChange, changeBlock: handleSave } = useChangeBlock();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
  } = useForm<TCustomizeBlockFlexWidgetSchema>({
    defaultValues: {},
    mode: "onChange",
    resolver: zodResolver(customizeBlockFlexWidgetSchema),
  });

  const values: TNullable<TCustomizeBlockFlexWidgetSchema> = React.useMemo(() => {
    if (!selectedOriginalBlock || !isBlock1(selectedOriginalBlock)) return null;
    return {
      headerAlignItems: selectedOriginalBlock.customization.headerStyle?.alignItems,
      title: selectedOriginalBlock.customization.title,
      titleLevel: selectedOriginalBlock.customization.titleLevel,
      subtitle: selectedOriginalBlock.customization.subtitle,
      borderRadius: Number(selectedOriginalBlock.customization.imageWrapperStyle.borderRadius),
      gap: Number(selectedOriginalBlock.customization.postsSettings.postsStyle.gap),
      isReverse: selectedOriginalBlock.customization.advancedSettings.isReverse,
      isColumn: selectedOriginalBlock.customization.advancedSettings.isColumn,

      withBg: selectedOriginalBlock.customization.advancedSettings.withBg,
      bgColor: selectedOriginalBlock.customization.advancedSettings.bgColor,
      textColor: selectedOriginalBlock.customization.advancedSettings.textColor,

      postBorderRadius: Number(selectedOriginalBlock.customization.imageWrapperStyle.borderRadius),
      postsGap: Number(selectedOriginalBlock.customization.postsSettings.postsStyle.gap),
      postsLength: Number(selectedOriginalBlock.customization.postsSettings.postsLength),
      postsType: selectedOriginalBlock.customization.postsSettings.postsType,
      postsWithBg: !!selectedOriginalBlock.customization.postsSettings?.postsWithBg,

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

  if (!selectedBlock || !isBlock1(selectedBlock)) return null;

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
          <BlockAdvancedForm
            hidePosition
            type="edit"
            control={control}
            errors={errors}
            endContent={
              <>
                <Flex justify="space-between" align="center" gap={8}>
                  <Typography.Text strong>Reversed</Typography.Text>
                  <SwitchControl
                    onChange={(value) =>
                      handleCustomizeChange("advancedSettings", {
                        ...selectedBlock?.customization?.advancedSettings,
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
                      handleCustomizeChange("advancedSettings", {
                        ...selectedBlock?.customization?.advancedSettings,
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

          <BlockPostsForm control={control} errors={errors} type="edit" />
          <BlockButtonForm type="edit" control={control} errors={errors} />
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

export default React.memo(CustomizeBlock1Widget);
