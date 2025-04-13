"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Result } from "antd";

import { ROUTES } from "@shared/config/routes";
import Button from "@shared/ui/Button";

const AuthErrorPageContainer = () => {
  const router = useRouter();

  return (
    <Result
      status="403"
      title="Authentication Failed"
      subTitle="You do not have access to this page. Please log in."
      extra={
        <Button type="primary" onClick={() => router.push(ROUTES.signIn)}>
          Sign in
        </Button>
      }
    />
  );
};

export default AuthErrorPageContainer;
