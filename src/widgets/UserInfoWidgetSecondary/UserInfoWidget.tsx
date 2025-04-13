"use client";
import React from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";

import s from "./UserInfoWidget.module.scss";

interface Props {
  className?: string;
  ActionComponent?: React.ReactNode;
}
const UserInfoWidget: React.FC<Props> = ({ className, ActionComponent }) => {
  const project = useProjectStore(projectSelector);

  const { isDemo } = useLKLayout();
  const router = useRouter();

  return (
    <div className={cn(s.card, className)}>
      <div className={s.card__header}>
        <h4 className={s.card__title}>{isDemo ? "DEMO" : "My Page"}</h4>
        {ActionComponent}
      </div>
    </div>
  );
};

export default UserInfoWidget;
