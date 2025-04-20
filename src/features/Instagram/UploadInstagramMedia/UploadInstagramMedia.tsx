import React, { useState } from "react";
import { Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import imageCompression from "browser-image-compression";

import { EInstagramType, IInstagramPost } from "@entities/Instagram/model/types";

import { useMessage } from "@shared/hooks/useMessage";
import { INSTAGRAM_URL, SITE_NAME } from "@/shared/config/appConfig";
import { uuidv4 } from "@/shared/utils/uuid";

const { Dragger } = Upload;

interface Props {
  onPostGenerated: (post: IInstagramPost) => void;
}

const UploadInstagramMedia: React.FC<Props> = ({ onPostGenerated }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { errorMessage, successMessage, infoMessage, loadingMessage, destroyMessage } = useMessage();

  const isImage = (file: File) => file.type.startsWith("image/");
  const isVideo = (file: File) => file.type.startsWith("video/");

  const detectUploadType = (files: File[]) => {
    const images = files.filter(isImage);
    const videos = files.filter(isVideo);

    if (videos.length > 0) return EInstagramType.VIDEO;
    if (images.length === 1) return EInstagramType.IMAGE;
    if (images.length > 1) return EInstagramType.CAROUSEL_ALBUM;
    return "unknown";
  };

  const createMockPost = (files: File[]): IInstagramPost => {
    const id = uuidv4();
    const type = detectUploadType(files);

    if (type === EInstagramType.IMAGE) {
      return {
        username: "",
        caption: "",
        thumbnail_url: null,
        timestamp: new Date().toString(),
        permalink: INSTAGRAM_URL,
        id,
        media_type: EInstagramType.IMAGE,
        media_url: URL.createObjectURL(files[0]),
      };
    }

    if (type === EInstagramType.CAROUSEL_ALBUM) {
      return {
        caption: "",
        thumbnail_url: null,
        timestamp: new Date().toString(),
        username: SITE_NAME,
        permalink: INSTAGRAM_URL,
        id,
        media_type: EInstagramType.CAROUSEL_ALBUM,
        media_url: URL.createObjectURL(files[0]),
        children: {
          data: files.map((file, i) => ({
            id: `${id}-${i}`,
            media_url: URL.createObjectURL(file),
            media_type: EInstagramType.IMAGE,
          })),
        },
      };
    }

    throw new Error("Invalid file type");
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    maxCount: 5,
    beforeUpload: (file) => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        errorMessage(`${file.name} is too large. Maximum size is 10MB.`);
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
      //   const filtered = info.fileList.filter((f) => f.status === "done");

      loadingMessage("Uploading...");
      setFileList(info.fileList);

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

      if (compressFiles === null) {
        errorMessage("Failed to generate post");
        return;
      }

      const type = detectUploadType(compressFiles);

      if (type === EInstagramType.VIDEO) {
        errorMessage("Videos are not allowed.");
        return;
      }

      if (compressFiles.length > 0) {
        try {
          const post = createMockPost(compressFiles);
          onPostGenerated?.(post);
        } catch (e) {
          errorMessage("Failed to generate post");
        } finally {
          setFileList([]);
          destroyMessage();
        }
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Dragger {...props} fileList={fileList}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag photo(s) here to upload</p>
        <p className="ant-upload-hint">
          Photos larger than 1 MB will be automatically compressed, which may result in reduced quality. To avoid this,
          please upload images under 1 MB.
        </p>
      </Dragger>
    </div>
  );
};

export default UploadInstagramMedia;
