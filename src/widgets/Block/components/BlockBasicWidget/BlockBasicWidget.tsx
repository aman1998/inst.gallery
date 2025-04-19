"use client";
import React from "react";
import { InstagramOutlined } from "@ant-design/icons";

import BlockFlexWidget from "@widgets/Block/BlockFlexWidget";
import BlockCollapseWidget from "@widgets/Block/BlockCollapseWidget";

import { EBlockType, IBlock } from "@entities/Block/model/types";
import { IProject } from "@entities/Project/model/types";

import { TNullable } from "@shared/types/common";
import Logo from "@shared/ui/Logo";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./BlockBasicWidget.module.scss";

import BlockListWidget from "../../BlockListWidget";
import BlockUserInfo from "../BlockUserInfo";
import FormItem from "@/shared/ui/FormItem";
import { Typography } from "antd";

interface Props {
  project: IProject;
  block: TNullable<IBlock>;
}
const BlockBasicWidget: React.FC<Props> = ({ block, project }) => {
  const content = React.useMemo(() => {
    if (!block) return null;

    switch (block.type) {
      case EBlockType.type1:
        return <BlockFlexWidget block={block} />;
      case EBlockType.type2:
        return <BlockListWidget project={project} block={block} />;
      case EBlockType.type4:
        return <BlockCollapseWidget block={block} />;
      default:
        return null;
    }
  }, [block, project]);

  if (!block) return null;

  return (
    <div className={s.layout}>
      <Logo className={s.layout__logo} color={project.primary_color ?? PRIMARY_COLOR} name={project.meta?.title} />

      <div className={s.layout__left}>
        {project?.user_info ? <BlockUserInfo user_info={project.user_info} className={s.layout__user} /> : <div />}
      </div>

      <div className={s.layout__right}>
        {/* <nav className={s.navigation}>
          <div
            className={s.navigation__item}
            style={{
              color: "var(--white)",
              background: project.primary_color ?? PRIMARY_COLOR,
              boxShadow: "0 0 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            <InstagramOutlined />
            <Typography.Text>Portfolio</Typography.Text>
          </div>
          <div className={s.navigation__item}>
            <InstagramOutlined />
            <Typography.Text>Home</Typography.Text>
          </div>
          <div className={s.navigation__item}>
            <InstagramOutlined />
            <Typography.Text>Home</Typography.Text>
          </div>
          <div className={s.navigation__item}>
            <InstagramOutlined />
            <Typography.Text>Home</Typography.Text>
          </div>
        </nav> */}
        <div className={s.layout__main}>{content}</div>
      </div>
    </div>
  );
};

export default BlockBasicWidget;
