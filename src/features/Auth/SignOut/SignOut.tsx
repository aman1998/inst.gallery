"use client";
import React, { MouseEvent } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { FloatButton, Popconfirm } from "antd";
import type { ButtonProps } from "antd";

import Button from "@shared/ui/Button";
import { createClient } from "@shared/config/supabase/client";
import { ROUTES } from "@shared/config/routes";
import { ERROR_COLOR } from "@/shared/providers/AntdProvider/AntdProvider";

interface Props extends Partial<ButtonProps> {
  isFloating?: boolean;
}

const SignOut: React.FC<Props> = ({ isFloating, ...props }) => {
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
      {isFloating ? (
        <FloatButton
          style={{ color: ERROR_COLOR }}
          className={props.className}
          icon={<LogoutOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        />
      ) : (
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
      )}
    </Popconfirm>
  );
};

export default SignOut;
