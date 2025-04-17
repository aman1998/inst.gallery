import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Empty, Flex, Typography } from "antd";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useChangeProject } from "@features/ChangeProject/lib/useChangeProject";

import BlockSaveCard from "@entities/Block/components/BlockSaveCard";
import { useProjectStore } from "@entities/Project/model/store";
import { originalProjectSelector, projectSelector, setProjectSelector } from "@entities/Project/model/selectors";

import InputControl from "@shared/controllers/InputControl";
import FormItem from "@shared/ui/FormItem";
import SwitchControl from "@shared/controllers/SwitchControl";
import Show from "@shared/ui/Show";
import TextAreaControl from "@shared/controllers/TextAreaControl";
import { PRIMARY_COLOR, SITE_PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { SITE_NAME } from "@shared/config/appConfig";

import s from "./UserSettings.module.scss";
import { TUserSettingsSchema, userSettingsSchema } from "./lib/schema";

const UserSettings: React.FC = () => {
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
    reset,
  } = useForm<TUserSettingsSchema>({
    defaultValues: {},
    mode: "onChange",
    resolver: zodResolver(userSettingsSchema),
  });

  const values = React.useMemo(() => {
    if (!originalProject) return null;
    return {
      name: originalProject?.user_info?.name,
      profession: originalProject?.user_info?.profession,
      description: originalProject?.user_info?.description,
      avatar: originalProject?.user_info?.avatar,
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

      <Divider>Info</Divider>
      <FormItem>
        <InputControl
          size="middle"
          control={control}
          name="name"
          placeholder="Name"
          errorMessage={errors.name?.message}
          onChange={(e) =>
            handleValueChange("user_info", {
              ...project?.user_info,
              name: e.target.value,
            })
          }
        />
        <InputControl
          size="middle"
          control={control}
          name="profession"
          placeholder="Profession"
          errorMessage={errors.profession?.message}
          onChange={(e) =>
            handleValueChange("user_info", {
              ...project?.user_info,
              profession: e.target.value,
            })
          }
        />
        <TextAreaControl
          rows={7}
          size="middle"
          control={control}
          name="description"
          placeholder="Description"
          errorMessage={errors.description?.message}
          onChange={(e) =>
            handleValueChange("user_info", {
              ...project?.user_info,
              description: e.target.value,
            })
          }
        />
      </FormItem>
    </form>
  );
};

export default React.memo(UserSettings);
