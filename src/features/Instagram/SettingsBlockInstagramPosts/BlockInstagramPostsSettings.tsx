import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Flex, Modal } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

import { useChangeBlock } from "@features/ChangeProject/lib/useChangeBlock";
import SelectInstagramPosts from "@features/Instagram/SelectInstagramPosts";
import { useCreateBlock } from "@features/Block/CreateBlock/lib/useCreateBlock";

import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";
import InstagramCardPost from "@entities/Instagram/components/InstagramCardPost";

import Button from "@shared/ui/Button";
import { useModal } from "@shared/hooks/useModal";
import { TNullable } from "@shared/types/common";

import DeleteBlockInstagramPost from "./components/DeleteBlockInstagramPost";

interface Props<T extends object> {
  control: Control<T>;
  errorMessage?: string;
  name: Path<T>;
  uploadLimit?: number;
  type: "add" | "edit";
}

const BlockInstagramPostsSettings = <T extends FieldValues>({
  control,
  name,
  errorMessage,
  uploadLimit = 10,
  type = "edit",
}: Props<T>) => {
  const [editableIndex, setEditableIndex] = React.useState<TNullable<number>>(null);
  const [selectedPosts, setSelectedPosts] = React.useState<IInstagramDownloadedPost[]>([]);

  const { isOpen: isOpenAdd, closeModal: closeModalAdd, openModal: openModalAdd } = useModal();
  const { isOpen: isOpenEdit, closeModal: closeModalEdit, openModal: openModalEdit } = useModal();

  const { handleCustomizeChange } = useChangeBlock();
  const { handleCreateChange } = useCreateBlock();

  const handleChange = (posts: IInstagramDownloadedPost[]) => {
    if (type === "add") {
      handleCreateChange("posts", posts);
    } else {
      handleCustomizeChange("posts", posts);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [] as IInstagramDownloadedPost[], onChange } }) => (
        <div>
          <Button
            iconPosition="start"
            icon={<PlusOutlined />}
            type="dashed"
            onClick={openModalAdd}
            style={{ marginBottom: 16, width: "100%" }}
            size="large"
          >
            Add
          </Button>
          <ul>
            <Flex gap={8} vertical>
              {value.map((item, index) => (
                <li key={index}>
                  <InstagramCardPost
                    index={index}
                    post={item}
                    posts={value}
                    ActionsComponent={
                      <>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            openModalEdit();
                            setEditableIndex(index);
                          }}
                          size="small"
                          type="default"
                          icon={<EditOutlined />}
                        />
                        <DeleteBlockInstagramPost
                          posts={value}
                          index={index}
                          onChange={(newList) => {
                            handleChange(newList);
                            onChange(newList);
                          }}
                        />
                      </>
                    }
                  />
                </li>
              ))}
            </Flex>
          </ul>
          {errorMessage && <p className="error">{errorMessage}</p>}

          <Modal
            closeIcon={null}
            width={1000}
            open={isOpenAdd}
            onCancel={closeModalAdd}
            onClose={closeModalAdd}
            title={`Add posts (${selectedPosts.length})`}
            destroyOnClose
            afterClose={() => setSelectedPosts([])}
            footer={
              <Button
                type="primary"
                disabled={!selectedPosts.length}
                onClick={() => {
                  if (!selectedPosts.length) return;

                  const newList = [...selectedPosts, ...value.filter((v) => !selectedPosts.some((p) => p.id === v.id))];

                  handleChange(newList);
                  onChange(newList);
                  closeModalAdd();
                }}
              >
                Confirm Selection ({selectedPosts.length})
              </Button>
            }
          >
            <SelectInstagramPosts
              limit={uploadLimit - value.length}
              selectedPosts={selectedPosts}
              setSelectedPosts={setSelectedPosts}
            />
          </Modal>

          <Modal
            closeIcon={null}
            width={1000}
            open={isOpenEdit}
            onCancel={closeModalEdit}
            onClose={closeModalEdit}
            title="Edit selected post"
            destroyOnClose
            afterClose={() => setSelectedPosts([])}
            footer={
              <Button
                type="primary"
                disabled={selectedPosts.length !== 1}
                onClick={() => {
                  if (editableIndex === null || selectedPosts.length > 1) return;
                  const newList = [...value];
                  newList[editableIndex] = selectedPosts[0];

                  handleChange(newList);
                  onChange(newList);
                  closeModalEdit();
                }}
              >
                Confirm Selection
              </Button>
            }
          >
            <SelectInstagramPosts limit={1} selectedPosts={selectedPosts} setSelectedPosts={setSelectedPosts} />
          </Modal>
        </div>
      )}
    />
  );
};

export default BlockInstagramPostsSettings;
