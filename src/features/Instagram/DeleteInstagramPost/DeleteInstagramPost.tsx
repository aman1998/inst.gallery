"use client";

import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useRouter } from "next/navigation";

import { createClient } from "@/shared/config/supabase/client";

import { useInstagramStore } from "@entities/Instagram/model/store";
import { deleteInstagramDownloadedPostsInListSelector } from "@entities/Instagram/model/selectors";

import Button from "@shared/ui/Button";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { useMessage } from "@shared/hooks/useMessage";

interface Props {
  id: string;
}
const DeleteInstagramPost: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteInstagramPost = useInstagramStore(deleteInstagramDownloadedPostsInListSelector);

  const { successMessage, errorMessage } = useMessage();

  const supabase = createClient();

  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await supabase.from(ESupabaseDB.instagramPosts).delete().eq("uuid", id);
    if (error) {
      errorMessage(error.message);
    } else {
      deleteInstagramPost(id);
    }
    setIsLoading(false);
    setOpen(false);
    successMessage("Successfully deleted");
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this post?"
      description="This will delete your post"
      open={open}
      okText="Yes, delete"
      okType="danger"
      cancelText="Cancel"
      okButtonProps={{ loading: isLoading }}
      cancelButtonProps={{ type: "text" }}
      onConfirm={handleDelete}
      onCancel={() => setOpen(false)}
      destroyTooltipOnHide
    >
      <Button danger size="small" icon={<DeleteOutlined />} onClick={() => setOpen(true)} />
    </Popconfirm>
  );
};

export default DeleteInstagramPost;
