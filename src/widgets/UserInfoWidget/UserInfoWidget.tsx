"use client";
import React from "react";
import cn from "classnames";
import { BlockOutlined, DollarCircleFilled, LinkOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";
import { useBlockStore } from "@entities/Block/model/store";
import { blocksSelector } from "@entities/Block/model/selectors";

import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { SITE_URL } from "@shared/config/appConfig";
import { ROUTES } from "@shared/config/routes";

import s from "./UserInfoWidget.module.scss";

interface Props {
  className?: string;
  ActionComponent?: React.ReactNode;
}
const UserInfoWidget: React.FC<Props> = ({ className, ActionComponent }) => {
  const project = useProjectStore(projectSelector);
  const blocks = useBlockStore(blocksSelector);

  const { isDemo } = useLKLayout();
  const router = useRouter();

  const handleLinkClick = () => {
    if (!project?.link) return;

    if (isDemo) {
      router.push(ROUTES.demoSite);
    } else {
      window.open(ROUTES.siteId(project.link));
    }
  };

  return (
    <div className={cn(s.card, className)}>
      <div className={s.card__header}>
        <h4 className={s.card__title}>{isDemo ? "DEMO" : "My Page"}</h4>
        {ActionComponent}
      </div>
      <div className={s.card__content}>
        <div className={s["card-item"]}>
          <LinkOutlined width={16} height={16} style={{ color: PRIMARY_COLOR }} />
          <a onClick={handleLinkClick} className={s["card-item__title"]}>
            {SITE_URL}/{project?.link}
          </a>
        </div>
        <div className={s["card-item"]}>
          <DollarCircleFilled width={16} height={16} style={{ color: PRIMARY_COLOR }} />
          <p className={s["card-item__title"]}>Plan: PRO</p>
        </div>
        <div className={s["card-item"]}>
          <BlockOutlined width={16} height={16} style={{ color: PRIMARY_COLOR }} />
          <p className={s["card-item__title"]}>Blocks: {blocks.length}/10</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoWidget;
