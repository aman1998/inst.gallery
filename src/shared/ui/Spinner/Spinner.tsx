"use client";
import React from "react";
import { Spin } from "antd";
import type { SpinProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner: React.FC<SpinProps> = ({ ...props }) => <Spin {...props} indicator={<LoadingOutlined spin />} />;

export default Spinner;
