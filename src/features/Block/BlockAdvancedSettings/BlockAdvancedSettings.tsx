import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Empty, Flex, Typography } from "antd";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import {
  blockAdvancedSettingsSchema,
  TBlockAdvancedSettingsSchema,
} from "@features/Block/BlockAdvancedSettings/lib/schema";
import { useChangeProject } from "@features/ChangeProject/lib/useChangeProject";
import CheckBlockLink from "@features/Block/CheckBlockLink";
import SelectProjectFavicon from "@features/SelectProjectFavicon";

import BlockSaveCard from "@entities/Block/components/BlockSaveCard";
import { useProjectStore } from "@entities/Project/model/store";
import { originalProjectSelector, projectSelector, setProjectSelector } from "@entities/Project/model/selectors";

import InputControl from "@shared/controllers/InputControl";
import FormItem from "@shared/ui/FormItem";
import SwitchControl from "@shared/controllers/SwitchControl";
import Show from "@shared/ui/Show";
import TextAreaControl from "@shared/controllers/TextAreaControl";
import { PRIMARY_COLOR, SITE_PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import ColorPickerControl from "@shared/controllers/ColorPickerControl";
import { SITE_NAME } from "@shared/config/appConfig";

import s from "./BlockAdvancedSettings.module.scss";

const BlockAdvancedSettings: React.FC = () => {
  const [linkValue, setLinkValue] = React.useState<string>("");

  const project = useProjectStore(projectSelector);
  const originalProject = useProjectStore(originalProjectSelector);
  const setProject = useProjectStore(setProjectSelector);

  const { isLoading, handleValueChange, changeBlock: handleSave } = useChangeProject();
  const { isDemo } = useLKLayout();

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
    setError,
    clearErrors,
    reset,
  } = useForm<TBlockAdvancedSettingsSchema>({
    defaultValues: {},
    mode: "onChange",
    resolver: zodResolver(blockAdvancedSettingsSchema),
  });

  const values = React.useMemo(() => {
    if (!originalProject) return null;
    return {
      link: originalProject.link,
      isPublish: originalProject.isPublish,
      title: originalProject?.meta?.title,
      description: originalProject?.meta?.description,
      primary_color: originalProject?.primary_color ?? PRIMARY_COLOR,
      favicon: originalProject?.meta?.favicon,
    };
  }, [originalProject]);

  const handleReset = () => {
    if (!values) return;
    setLinkValue("");
    reset(values);
    setProject({ project: originalProject });
  };

  React.useEffect(() => {
    if (!values) return;

    reset(values);
  }, [values, reset]);

  if (!project) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Create block" />;

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

      <Divider>Page</Divider>
      <FormItem>
        <Flex justify="space-between" gap={8}>
          <Typography.Text strong>Online</Typography.Text>
          <SwitchControl
            disabled={isDemo}
            defaultValue={true}
            onChange={(val) => handleValueChange("isPublish", val)}
            control={control}
            name="isPublish"
            size="default"
          />
        </Flex>
        <CheckBlockLink
          disabled={isDemo}
          linkValue={linkValue}
          setLinkValue={setLinkValue}
          control={control}
          name="link"
          errorMessage={errors.link?.message}
          onChange={(e) => {
            handleValueChange("link", e.target.value);
          }}
          setError={setError}
          clearErrors={clearErrors}
        />
        {/*<Flex justify="space-between" gap={8}>*/}
        {/*  <Typography.Text strong>Logo color</Typography.Text>*/}
        {/*  <ColorPickerControl*/}
        {/*    control={control}*/}
        {/*    errorMessage={errors.primary_color?.message}*/}
        {/*    name="primary_color"*/}
        {/*    defaultValue={project?.primary_color ?? SITE_PRIMARY_COLOR}*/}
        {/*    size="small"*/}
        {/*    showText*/}
        {/*    style={{ justifyContent: "flex-start", width: "100%", maxWidth: 140 }}*/}
        {/*    onChange={(value, css) => handleValueChange("primary_color", css)}*/}
        {/*  />*/}
        {/*</Flex>*/}
      </FormItem>

      <Divider>Metadata</Divider>
      <FormItem>
        <Flex justify="space-between" gap={8}>
          <Typography.Text strong>Favicon</Typography.Text>
          <SelectProjectFavicon
            control={control}
            name="favicon"
            onChange={(value) =>
              handleValueChange("meta", {
                ...project?.meta,
                favicon: value,
              })
            }
          />
        </Flex>
        <InputControl
          size="middle"
          addonAfter={<div>| «description» | {SITE_NAME}</div>}
          control={control}
          name="title"
          placeholder="Title"
          errorMessage={errors.title?.message}
          onChange={(e) =>
            handleValueChange("meta", {
              ...project?.meta,
              title: e.target.value,
            })
          }
        />
        <TextAreaControl
          size="middle"
          control={control}
          name="description"
          placeholder="Description"
          errorMessage={errors.description?.message}
          onChange={(e) =>
            handleValueChange("meta", {
              ...project?.meta,
              description: e.target.value,
            })
          }
        />
      </FormItem>
    </form>
  );
};

export default React.memo(BlockAdvancedSettings);
