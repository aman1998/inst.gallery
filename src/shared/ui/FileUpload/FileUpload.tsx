"use client";

import React from "react";
import { Upload } from "antd";
import type { UploadProps } from "antd";
const { Dragger } = Upload;

const FileUploader: React.FC<UploadProps> = ({ name = "file", children, ...props }) => (
  <Dragger {...props} name={name}>
    {children}
  </Dragger>
);

export default FileUploader;
