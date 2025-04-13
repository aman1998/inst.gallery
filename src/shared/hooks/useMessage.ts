"use client";

import React from "react";
import { App } from "antd";
import type { ArgsProps } from "antd/es/message/interface";

export const useMessage = () => {
  const { message } = App.useApp();

  const successMessage = React.useCallback(
    (content: React.ReactNode, config?: Omit<ArgsProps, "content">) => {
      message.open({
        ...config,
        type: "success",
        content,
      });
    },
    [message]
  );

  const errorMessage = React.useCallback(
    (content: React.ReactNode, config?: Omit<ArgsProps, "content">) => {
      message.open({
        ...config,
        type: "error",
        content,
      });
    },
    [message]
  );

  const warningMessage = React.useCallback(
    (content: React.ReactNode, config?: Omit<ArgsProps, "content">) => {
      message.open({
        ...config,
        type: "warning",
        content,
      });
    },
    [message]
  );

  const loadingMessage = React.useCallback(
    (content: React.ReactNode = "Loading...", config?: Omit<ArgsProps, "content">) => {
      message.open({
        ...config,
        type: "loading",
        content,
        duration: config?.duration || 0,
      });
    },
    [message]
  );

  const destroyMessage = React.useCallback(() => {
    message.destroy();
  }, [message]);

  return { successMessage, warningMessage, errorMessage, loadingMessage, destroyMessage };
};
