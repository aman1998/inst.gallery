"use client";
import React from "react";
import { Result } from "antd";
import { useRouter } from "next/navigation";
import { NotificationFilled } from "@ant-design/icons";

import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

import s from "./NotFoundPageContainer.module.scss";

const NotFoundPageContainer: React.FC = () => {
  const router = useRouter();
  return (
    <div className={s.page}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => router.push(ROUTES.home)}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPageContainer;
