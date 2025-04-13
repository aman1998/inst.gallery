"use client";

import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useRouter } from "next/navigation";

import { createClient } from "@/shared/config/supabase/client";

import Button from "@shared/ui/Button";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { useMessage } from "@shared/hooks/useMessage";
import { ROUTES } from "@shared/config/routes";

interface Props {
  slug: string;
}
const DeleteInstagramAccount: React.FC<Props> = ({ slug }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { successMessage, errorMessage } = useMessage();
  const router = useRouter();

  const supabase = createClient();

  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await supabase.from(ESupabaseDB.instagramAccounts).delete().eq("instagram_user_id", slug);
    if (error) {
      errorMessage(error.message);
    } else {
      await fetch(ROUTES.apiInstagramTokenId(slug), {
        method: "DELETE",
      });
    }
    setIsLoading(false);
    setOpen(false);
    successMessage("Successfully deleted");
    router.push(ROUTES.profile);
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this account?"
      description="This will delete your account"
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

export default DeleteInstagramAccount;
