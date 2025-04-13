import React from "react";
import { ConfigProvider } from "antd";
import en from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("en");

interface Props {
  children: React.ReactNode;
}

const LocaleProvider: React.FC<Props> = ({ children }) => <ConfigProvider locale={en}>{children}</ConfigProvider>;

export default LocaleProvider;
