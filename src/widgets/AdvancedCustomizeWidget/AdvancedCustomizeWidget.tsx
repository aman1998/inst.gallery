import React from "react";
import cn from "classnames";
import { Tabs } from "antd";
import Image from "next/image";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { projectSelector } from "@entities/Project/model/selectors";
import { useProjectStore } from "@entities/Project/model/store";
import { useBlockStore } from "@entities/Block/model/store";
import { selectedBlockSelector } from "@entities/Block/model/selectors";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@shared/config/appConfig";
import { ROUTES } from "@shared/config/routes";
import Input from "@shared/ui/Input";

import s from "./AdvancedCustomizeWidget.module.scss";

interface Props {
  className?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
}

const AdvancedCustomizeWidget: React.FC<Props> = ({ className, wrapperClassName, children }) => {
  const project = useProjectStore(projectSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);

  const { isDemo } = useLKLayout();

  if (!project) return null;

  const { link } = project;
  const url = isDemo ? `${SITE_URL}${ROUTES.demoSite}` : `${SITE_URL}/${link}`;
  const fullUrl = `www.${url}`;
  const title = `${project?.meta?.title} | ${project?.meta?.description} | ${SITE_NAME}`;
  const description = project?.meta?.description || SITE_DESCRIPTION;
  const favicon = project?.meta?.favicon ?? "/logo.png";

  return (
    <>
      {/* <AdvancedCustomizeLayout className={cn(s.widget, className)} wrapperClassName={wrapperClassName}> */}
      <div className={s.widget__topPanel}>
        <div className={s.widget__windowControls}>
          <div className={s.widget__dot} />
          <div className={s.widget__dot} />
          <div className={s.widget__dot} />

          <Tabs
            type="editable-card"
            className="antd-advanced-tabs"
            items={[
              {
                label: (
                  <div className={s.widget__tab}>
                    <Image src={favicon} alt="logo" width={20} height={20} />
                    <p>{title}</p>
                  </div>
                ),
                key: "1",
              },
              {
                label: (
                  <div className={s.widget__tab}>
                    <Image src="/images/instagram_icon.png" alt="instagram logo" width={20} height={20} />
                    <p>Instagram</p>
                  </div>
                ),
                key: "2",
              },
            ]}
            activeKey="1"
          />
        </div>

        <div className={s.widget__address}>
          <Input value={fullUrl} readOnly />
        </div>
      </div>
      {children}
      {/* </AdvancedCustomizeLayout> */}
    </>
  );
};

export default AdvancedCustomizeWidget;
