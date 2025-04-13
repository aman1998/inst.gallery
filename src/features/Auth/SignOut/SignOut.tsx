"use client";
import React, { MouseEvent } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import type { ButtonProps } from "antd";

import Button from "@shared/ui/Button";
import { createClient } from "@shared/config/supabase/client";
import { ROUTES } from "@shared/config/routes";

interface Props extends Partial<ButtonProps> {}

const SignOut: React.FC<Props> = ({ ...props }) => {
  const [open, setOpen] = React.useState(false);

  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = ROUTES.home;
  };

  return (
    <Popconfirm
      title="Are you sure you want to sign out?"
      description="This will log you out of your account"
      open={open}
      okText="Yes, Sign Out"
      okType="danger"
      cancelText="Cancel"
      cancelButtonProps={{ type: "text" }}
      onConfirm={handleLogout}
      onCancel={() => setOpen(false)}
      destroyTooltipOnHide
    >
      <Button
        icon={<LogoutOutlined />}
        size="small"
        type="link"
        iconPosition="start"
        danger
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        {...props}
      >
        Sign Out
      </Button>
    </Popconfirm>
  );
};

export default SignOut;
