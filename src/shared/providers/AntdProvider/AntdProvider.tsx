import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";

export const SITE_PRIMARY_COLOR = "#d5ac8a";
// export const PRIMARY_COLOR = "rgb(120, 0, 22)";
export const PRIMARY_COLOR = "#d4b106";

export const ERROR_COLOR = "rgb(255, 77, 79)";

interface Props {
  children: React.ReactNode;
  primaryColor?: string;
}

const AntdProvider: React.FC<Props> = ({ children, primaryColor = PRIMARY_COLOR }) => (
  <AntdRegistry>
    <ConfigProvider
      theme={{
        token: {
          colorLink: "inherit",
          fontFamily: "inherit",
          colorText: "inherit",
          colorBgLayout: "inherit",
          colorPrimary: primaryColor,
        },
        components: {
          Layout: {
            bodyBg: "#F5F5FA",
            headerBg: "#FFF",
            siderBg: "#FFF",
          },
          Button: {
            fontWeight: 500,
            fontSize: 16,
            lineHeight: 20,
            borderRadius: 8,
            paddingInline: 32,
            primaryShadow: "none",

            colorPrimary: primaryColor,
            // colorTextLightSolid: "#2D2D2D",

            colorLink: primaryColor,
            colorLinkHover: primaryColor,

            defaultColor: primaryColor,

            controlHeight: 44,
            controlHeightLG: 60,
            controlHeightSM: 24,
          },
          Input: {
            borderRadius: 12,
            controlHeight: 48,
            controlHeightXS: 20,
            activeBorderColor: primaryColor,
          },
          Checkbox: {
            colorBorder: primaryColor,
          },
          DatePicker: {},
          Menu: {},
          Pagination: {},
          Table: {},
          Modal: {},
          Upload: {},
          Select: {
            hoverBorderColor: primaryColor,
          },
          Popover: {},
          Typography: {
            fontSize: 16,
          },
          Carousel: {
            dotHeight: 12,
            dotWidth: 12,
            dotActiveWidth: 24,
          },
          Message: {
            colorInfo: primaryColor,
            colorSuccess: primaryColor,
            colorWarning: primaryColor,
          },
          Alert: {},
          Result: {
            colorSuccess: primaryColor,
          },
          Slider: {
            trackBg: primaryColor,
            trackHoverBg: primaryColor,
          },
        },
      }}
    >
      <App style={{ width: "100%" }}>{children}</App>
    </ConfigProvider>
  </AntdRegistry>
);

export default AntdProvider;
