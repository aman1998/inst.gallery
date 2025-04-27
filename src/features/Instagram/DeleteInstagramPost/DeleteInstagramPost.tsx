"use client";

import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useRouter } from "next/navigation";

import { createClient } from "@/shared/config/supabase/client";

import { useInstagramStore } from "@entities/Instagram/model/store";
import { deleteInstagramDownloadedPostsInListSelector } from "@entities/Instagram/model/selectors";

import Button from "@shared/ui/Button";
import { ESupabaseBucket, ESupabaseDB } from "@shared/config/supabase/types";
import { useMessage } from "@shared/hooks/useMessage";
import { useUserInfo } from "@/shared/providers/UserProvider/lib/useUserInfo";
import { EInstagramType, IInstagramDownloadedPost, IInstagramPost } from "@/entities/Instagram/model/types";

interface Props {
  post: IInstagramDownloadedPost;
}
const DeleteInstagramPost: React.FC<Props> = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteInstagramPost = useInstagramStore(deleteInstagramDownloadedPostsInListSelector);

  const { successMessage, errorMessage } = useMessage();

  const supabase = createClient();
  const { user } = useUserInfo();

  const handleDeleteFromStorage = async (filePath: string | string[]) => {
    let fullPath: string[] = [];

    if (Array.isArray(filePath)) {
      filePath.forEach((item) => {
        fullPath.push(`${user?.id}/${item}`);
      });
    } else {
      fullPath = [`${user?.id}/${filePath}`];
    }
    await supabase.storage.from(ESupabaseBucket.instagramMedia).remove(fullPath);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await supabase.from(ESupabaseDB.instagramPosts).delete().eq("uuid", post.uuid);

    if (error) {
      errorMessage(error.message);
    } else {
      deleteInstagramPost(post.uuid);
    }
    setIsLoading(false);
    setOpen(false);
    successMessage("Successfully deleted");

    if (post.media_type === EInstagramType.IMAGE && post.media_url) {
      handleDeleteFromStorage(`images/${post.id}.jpg`);
    }

    if (post.media_type === EInstagramType.VIDEO) {
      if (post.media_url) {
        handleDeleteFromStorage(`videos/${post.id}.mp4`);
      }
      if (post.thumbnail_url) {
        handleDeleteFromStorage(`thumbnails/${post.id}.jpg`);
      }
    }

    if (post.media_type === EInstagramType.CAROUSEL_ALBUM && post.children) {
      const paths = post.children.data.map((child) => {
        return `carousel/${child.id}.jpg`;
      });
      handleDeleteFromStorage(paths);
    }
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
