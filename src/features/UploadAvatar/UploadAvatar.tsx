"use client";
import { Upload, type UploadProps } from "antd";
import imageCompression from "browser-image-compression";

import { useMessage } from "@shared/hooks/useMessage";

const { Dragger } = Upload;

const UploadAvatar = () => {
  const { errorMessage, successMessage, infoMessage, loadingMessage, destroyMessage } = useMessage();

  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    multiple: false,
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file) => {
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        errorMessage(`${file.name} is too large. Maximum size is 50MB.`);
        return Upload.LIST_IGNORE;
      }

      if (file.type.startsWith("video/")) {
        errorMessage(`${file.name} is a video. Only photos are allowed.`);
        return Upload.LIST_IGNORE;
      }

      if (!file.type.startsWith("image/")) {
        errorMessage(`${file.name} is not an image.`);
        return Upload.LIST_IGNORE;
      }

      return true;
    },
    customRequest: ({ file, onSuccess }) => {},
    onChange: async (info) => {
      const files = info.fileList.map((f) => f.originFileObj as File);
      const compressFiles = await Promise.all(
        files.map((file) =>
          imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          })
        )
      );

      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
      } else if (info.file.status === "error") {
      }
    },
  };

  return <div>UploadAvatar</div>;
};

export default UploadAvatar;
