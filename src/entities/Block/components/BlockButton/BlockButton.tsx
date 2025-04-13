"use client";

import React from "react";
import cn from "classnames";
import { ConfigProvider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { ICustomizeButton } from "@entities/Block/model/customizeTypes";

import Button from "@shared/ui/Button";

import s from "./BlockButton.module.scss";

interface Props {
  settings: ICustomizeButton;
  className?: string;
}
const BlockButton: React.FC<Props> = ({ settings, className }) => {
  if (!settings) return null;

  const {
    buttonVisible,
    buttonText,
    buttonSize,
    buttonType,
    buttonTab,
    buttonStyle = {},
    buttonLink,
    buttonColor,
    buttonWithArrow,
  } = settings;

  if (!buttonVisible || !buttonText || !buttonLink) return null;

  const handleBtnClick = () => {
    if (buttonTab === "new") {
      window.open(buttonLink);
    } else {
      window.location.href = buttonLink;
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: buttonColor,
        },
        components: {
          Button: {
            colorPrimary: buttonColor,
            colorLink: buttonColor,
            colorLinkHover: buttonColor,
            defaultColor: buttonColor,
            colorText: buttonColor,
          },
        },
      }}
    >
      <Button
        icon={buttonWithArrow && <ArrowRightOutlined />}
        type={buttonType}
        size={buttonSize}
        onClick={handleBtnClick}
        style={{ width: "max-content", ...buttonStyle }}
        className={cn(s.btn, className)}
      >
        {buttonText}
      </Button>
    </ConfigProvider>
  );
};

export default BlockButton;
