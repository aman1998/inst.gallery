"use client";
import React from "react";
import cn from "classnames";
import { Skeleton, Typography } from "antd";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { getSubscriptionsConfig } from "@entities/Subscription/lib/utils";
import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";

import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";
import { capitalizeFirstLetter } from "@shared/utils/text";

import s from "./UserInfoWidget.module.scss";
import { useBlockStore } from "@/entities/Block/model/store";
import { selectedBlockSelector } from "@/entities/Block/model/selectors";

interface Props {
  className?: string;
  ActionComponent?: React.ReactNode;
}
const UserInfoWidget: React.FC<Props> = ({ className, ActionComponent }) => {
  const project = useProjectStore(projectSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const { isDemo } = useLKLayout();
  const { plan } = useSubscriptionsInfo();
  const { maxUploadPosts } = getSubscriptionsConfig(plan);

  return (
    <div className={cn(s.card, className)}>
      <div className={s.card__header}>
        <Typography.Title level={4} className={s.card__title} style={{ margin: 0 }}>
          {isDemo ? "DEMO" : "Page Settings"}
        </Typography.Title>
        {ActionComponent}
      </div>
      <div className={s.stats}>
        <div className={s.stat}>
          <p className={s.stat__title}>Status</p>
          <p className={s.stat__text}>{!project ? "" : !!project?.isPublish ? "Online" : "Offline"}</p>
        </div>
        <div className={s.stat}>
          <p className={s.stat__title}>Plan</p>
          <p className={s.stat__text}>{capitalizeFirstLetter(plan)}</p>
        </div>
        {/* <div className={s.stat}>
          <p className={s.stat__title}>Widget</p>
          <p className={s.stat__text}>Basic</p>
        </div> */}
        {/* <div className={s.stat}>
          <p className={s.stat__title}>Works</p>
          <p className={s.stat__text}>
            {!selectedBlock ? "" : `${selectedBlock?.customization?.posts?.length} / ${maxUploadPosts}`}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default UserInfoWidget;
