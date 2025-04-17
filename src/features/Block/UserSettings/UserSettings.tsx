import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Empty, Flex, Typography, Button, Modal, Select, Input, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

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
import { TProjectLink } from "@/entities/Project/model/types";

const UserSettings: React.FC = () => {
  const [linkValue, setLinkValue] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newLink, setNewLink] = React.useState<{ type: TProjectLink; value: string }>({ type: "email", value: "" });

  const project = useProjectStore(projectSelector);
  const originalProject = useProjectStore(originalProjectSelector);
  const setProject = useProjectStore(setProjectSelector);

  const { isLoading, handleValueChange, changeBlock: handleSave } = useChangeProject();
  const { isDemo } = useLKLayout();

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
    getValues,
    reset,
  } = useForm<TUserSettingsSchema>({
    defaultValues: {},
    mode: "onChange",
    resolver: zodResolver(userSettingsSchema),
  });

  const linkIcons: Record<string, React.ReactNode> = {
    email: <MailOutlined />,
    phone: <PhoneOutlined />,
    twitch: <VideoCameraOutlined />,
    linkedin: <LinkedinOutlined />,
  };

  const handleAddLink = () => {
    if (!newLink.value) return;

    const updated = [...(project?.user_info?.links || []), newLink];
    handleValueChange("user_info", { ...project?.user_info, links: updated });
    reset({ ...getValues(), links: updated });
    setNewLink({ type: "email", value: "" });
    setIsModalOpen(false);
  };

  const handleRemoveLink = (index: number) => {
    const updated = (project?.user_info?.links || []).filter((_, i) => i !== index);
    handleValueChange("user_info", { ...project?.user_info, links: updated });
    reset({ ...getValues(), links: updated });
  };

  const values = React.useMemo(() => {
    if (!originalProject) return null;
    return {
      name: originalProject?.user_info?.name,
      profession: originalProject?.user_info?.profession,
      description: originalProject?.user_info?.description,
      avatar: originalProject?.user_info?.avatar,
      links: originalProject?.user_info?.links,
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
          rows={5}
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

      <Divider>Links</Divider>
      <FormItem>
        <Flex vertical gap={8}>
          {(project?.user_info?.links || []).map((link, index) => (
            <Flex key={index} align="center" justify="space-between">
              <Space>
                {linkIcons[link.type]} <Typography.Text>{link.value}</Typography.Text>
              </Space>
              <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleRemoveLink(index)} />
            </Flex>
          ))}

          <Button icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Add Link
          </Button>
        </Flex>
      </FormItem>

      <Modal
        title="Add Link"
        open={isModalOpen}
        onOk={handleAddLink}
        onCancel={() => setIsModalOpen(false)}
        okText="Add"
        destroyOnClose
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            value={newLink.type}
            onChange={(value) => setNewLink((prev) => ({ ...prev, type: value }))}
            style={{ width: "100%" }}
            options={[
              { value: "email", label: "Email", icon: <MailOutlined /> },
              { value: "phone", label: "Phone", icon: <PhoneOutlined /> },
              { value: "twitch", label: "Twitch", icon: <VideoCameraOutlined /> },
              { value: "linkedin", label: "LinkedIn", icon: <LinkedinOutlined /> },
            ]}
          />
          <Input
            placeholder="Enter value"
            value={newLink.value}
            onChange={(e) => setNewLink((prev) => ({ ...prev, value: e.target.value }))}
          />
        </Space>
      </Modal>
    </form>
  );
};

export default React.memo(UserSettings);
