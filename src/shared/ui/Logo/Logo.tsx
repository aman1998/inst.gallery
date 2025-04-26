import React from "react";
import Link from "next/link";

import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { SITE_NAME_SHORT } from "@shared/config/appConfig";

import s from "./Logo.module.scss";
import { Typography } from "antd";

interface Props {
  className?: string;
  href?: string;
  color?: string;
  style?: React.CSSProperties;
  name?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const Logo: React.FC<Props> = ({ onClick, className, href, style, color = PRIMARY_COLOR, name = SITE_NAME_SHORT }) => {
  const content = (
    <div className={s.logo} style={style} onClick={onClick}>
      <Typography.Title level={3} className={s.logo__name}>
        {name}.<span style={{ color }}>gallery</span>
      </Typography.Title>
    </div>
  );

  if (!href) return <div className={className}>{content}</div>;

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
};

export default Logo;
