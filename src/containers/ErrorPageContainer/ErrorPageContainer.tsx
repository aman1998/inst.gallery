"use client";
import React from "react";
import { Result } from "antd";
import { useRouter } from "next/navigation";

import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

import s from "./ErrorPageContainer.module.scss";

interface Props {
  error: Error;
  reset: () => void;
}
const ErrorPageContainer: React.FC<Props> = ({ error, reset }) => {
  const router = useRouter();
  return (
    <div className={s.page}>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={[
          <Button type="primary" onClick={() => router.push(ROUTES.home)}>
            Back Home
          </Button>,
          <Button
            type="default"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>,
        ]}
      />
    </div>
  );
};

export default ErrorPageContainer;
