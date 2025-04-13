import React from "react";
import { Typography } from "antd";
import cn from "classnames";

import BlockButton from "@entities/Block/components/BlockButton";
import { ICustomizeButton } from "@entities/Block/model/customizeTypes";

import Show from "@shared/ui/Show";
import Title from "@shared/ui/Title";

import s from "./BlockHeader.module.scss";

interface Props {
  title: string;
  titleLevel: 1 | 2 | 3 | 4 | 5;
  subtitle: string;
  headerStyle: Pick<React.CSSProperties, "alignItems">;
  color: string;
  className?: string;
  buttonSettings: ICustomizeButton;
}
const BlockHeader: React.FC<Props> = ({
  title,
  subtitle,
  titleLevel,
  headerStyle,
  color,
  buttonSettings,
  className,
}) => {
  if (!title && !subtitle) return null;

  const style: React.CSSProperties = {
    color,
    margin: 0,
    textAlign:
      headerStyle?.alignItems === "flex-start" ? "left" : headerStyle?.alignItems === "flex-end" ? "right" : "center",
  };

  return (
    <div
      className={cn(s.header, (!title || (titleLevel !== 1 && !subtitle)) && s["header--small"], className)}
      style={{ alignItems: headerStyle?.alignItems }}
    >
      <Show show={!!title}>
        <Title level={titleLevel} className={s.header__title} style={style}>
          {title}
        </Title>
      </Show>
      <Show show={!!subtitle}>
        <Typography.Text className={s.header__text} style={style}>
          {subtitle}
        </Typography.Text>
      </Show>
      <BlockButton settings={buttonSettings} />
    </div>
  );
};

export default BlockHeader;
