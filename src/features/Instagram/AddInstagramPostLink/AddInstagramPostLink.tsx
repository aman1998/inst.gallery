"use client";

import React from "react";
import { type ButtonProps } from "antd";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";

import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

interface Props extends Partial<ButtonProps> {
  className?: string;
  newTab?: boolean;
}
const AddInstagramPostLink: React.FC<Props> = ({ className, newTab, ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    if (newTab) {
      window.open(ROUTES.instagramSelectAccount);
    } else {
      router.push(ROUTES.instagramSelectAccount);
    }
  };

  return (
    <Button
      type="dashed"
      icon={<PlusOutlined />}
      iconPosition="start"
      onClick={handleClick}
      className={className}
      style={{ height: "auto" }}
      {...props}
    >
      <div>Add Post</div>
    </Button>
  );
};

export default AddInstagramPostLink;
