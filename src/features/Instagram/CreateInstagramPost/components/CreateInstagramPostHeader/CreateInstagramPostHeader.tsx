"use client";
import React from "react";
import cn from "classnames";

import s from "./CreateInstagramPostHeader.module.scss";
import { Typography } from "antd";
import Button from "@/shared/ui/Button";

interface Props {
  className?: string;
  isValid?: boolean;
  isDirty?: boolean;
  onSubmit: () => void;
  onReset: () => void;
}
const CreateInstagramPostHeader: React.FC<Props> = ({ className, isDirty, isValid, onReset, onSubmit }) => (
  <aside className={cn(s.header, className)}>
    <Typography.Title level={5} style={{ margin: 0 }}>
      Create work
    </Typography.Title>
    <div>
      <Button type="text" size="small" style={{ marginRight: 8 }} disabled={!isDirty} onClick={onReset}>
        reset
      </Button>
      <Button type="primary" size="small" disabled={!isValid || !isDirty} onClick={onSubmit}>
        Save
      </Button>
    </div>
  </aside>
);

export default CreateInstagramPostHeader;
