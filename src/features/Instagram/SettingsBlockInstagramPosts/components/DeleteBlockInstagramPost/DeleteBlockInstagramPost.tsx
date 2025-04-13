"use client";
import React from "react";
import { DeleteFilled } from "@ant-design/icons";

import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";

import Button from "@shared/ui/Button";

interface Props {
  posts: IInstagramDownloadedPost[];
  index: number;
  onChange: (val: IInstagramDownloadedPost[]) => void;
}
const DeleteBlockInstagramPost: React.FC<Props> = ({ posts, index, onChange }) => (
  <Button
    danger
    size="small"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();

      const newList = posts.filter((_, i) => i !== index);
      onChange(newList);
    }}
    icon={<DeleteFilled />}
  />
);

export default DeleteBlockInstagramPost;
