import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Empty, Flex, Typography, Button, Modal, Select, Input, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useChangeProject } from "@features/ChangeProject/lib/useChangeProject";
import UploadAvatar from "@features/UploadAvatar";

import BlockSaveCard from "@entities/Block/components/BlockSaveCard";
import { useProjectStore } from "@entities/Project/model/store";
import { originalProjectSelector, projectSelector, setProjectSelector } from "@entities/Project/model/selectors";

import InputControl from "@shared/controllers/InputControl";
import FormItem from "@shared/ui/FormItem";
import Show from "@shared/ui/Show";
import TextAreaControl from "@shared/controllers/TextAreaControl";
import ContactsIcon from "@shared/ui/ContactsIcon";
import { TProjectLink } from "@shared/ui/ContactsIcon/ContactsIcon";
import { useModal } from "@shared/hooks/useModal";
import { TNullable } from "@shared/types/common";

import { TUserSettingsSchema, userSettingsSchema } from "./lib/schema";
import s from "./UserSettings.module.scss";

const MAX_CONTACTS = 12;

const UserSettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newLink, setNewLink] = React.useState<{ type: TProjectLink; value: string }>({ type: "email", value: "" });

  const project = useProjectStore(projectSelector);
  const originalProject = useProjectStore(originalProjectSelector);
  const setProject = useProjectStore(setProjectSelector);

  const { isLoading, handleValueChange, changeBlock: handleSave } = useChangeProject();
  const { isDemo } = useLKLayout();
  const { isOpen, openModal, closeModal } = useModal();

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

  const values = React.useMemo(() => {
    if (!originalProject) return null;
    return {
      name: originalProject?.user_info?.name,
      profession: originalProject?.user_info?.profession,
      description: originalProject?.user_info?.description,
      avatar: originalProject?.user_info?.avatar,
      contacts: originalProject?.user_info?.contacts,
    };
  }, [originalProject]);

  const handleReset = () => {
    if (!values) return;
    reset(values);
    setProject({ project: originalProject });
  };

  const handleUploadAvatar = (avatar: TNullable<string>) => {
    closeModal();
    handleValueChange("user_info", {
      ...project?.user_info,
      avatar,
    });
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

      <Divider>Avatar</Divider>
      <Button style={{ display: "flex", margin: "0 auto" }} type="primary" size="small" onClick={openModal}>
        Upload/Edit
      </Button>
      <Modal title="Upload avatar" open={isOpen} onCancel={closeModal} footer={null} destroyOnClose>
        <UploadAvatar onSuccess={handleUploadAvatar} defaultImageUrl={project?.user_info?.avatar} />
      </Modal>

      <Divider>About</Divider>
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

      <Divider>Contacts</Divider>
      <FormItem>
        <Controller
          control={control}
          name="contacts"
          render={({ field: { value = [], onChange } }) => (
            <Flex vertical gap={8}>
              {value.map((link, index) => (
                <Flex key={index} align="center" justify="space-between">
                  <Space>
                    <ContactsIcon type={link.type} /> <Typography.Text>{link.value}</Typography.Text>
                  </Space>
                  <Button
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      const updated = value.filter((_, i) => i !== index);
                      onChange(updated);
                      handleValueChange("user_info", { ...project?.user_info, contacts: updated });
                    }}
                  />
                </Flex>
              ))}

              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
                disabled={value.length >= MAX_CONTACTS}
              >
                Add Link
              </Button>

              <Modal
                title="Contacts"
                open={isModalOpen}
                onOk={() => {
                  if (!newLink.value || value.length >= MAX_CONTACTS) return;

                  const updated = [...value, newLink];
                  onChange(updated);
                  handleValueChange("user_info", { ...project?.user_info, contacts: updated });

                  setNewLink({ type: "email", value: "" });
                  setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)}
                okText="Add"
                destroyOnClose
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Select
                    value={newLink.type}
                    onChange={(type) => setNewLink((prev) => ({ ...prev, type }))}
                    style={{ width: "100%" }}
                    options={[
                      { value: "email", label: "Email" },
                      { value: "phone", label: "Phone" },
                      { value: "whatsapp", label: "WhatsApp" },
                      { value: "linkedin", label: "LinkedIn" },
                      { value: "instagram", label: "Instagram" },
                      { value: "facebook", label: "Facebook" },
                      { value: "twitter", label: "Twitter" },
                      { value: "github", label: "Github" },
                      { value: "gitlab", label: "Gitlab" },
                      { value: "youtube", label: "Youtube" },
                      { value: "twitch", label: "Twitch" },
                    ]}
                  />
                  <Input
                    placeholder="Enter value"
                    value={newLink.value}
                    onChange={(e) => setNewLink((prev) => ({ ...prev, value: e.target.value }))}
                  />
                </Space>
              </Modal>
            </Flex>
          )}
        />
      </FormItem>
    </form>
  );
};

export default React.memo(UserSettings);
