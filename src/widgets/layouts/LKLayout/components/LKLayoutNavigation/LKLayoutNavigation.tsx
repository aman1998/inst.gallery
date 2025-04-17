import React from "react";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  BlockOutlined,
  DesktopOutlined,
  InstagramOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import cn from "classnames";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";
import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";

import { EBlockNavigation } from "@entities/Block/model/types";

import s from "./LKLayoutNavigation.module.scss";

interface Props {
  className?: string;
}

const LKLayoutNavigation: React.FC<Props> = ({ className }) => {
  const { setNavigation, setSubNavigation, isDemo } = useLKLayout();

  const navigation = [
    // {
    //   label: "Blocks",
    //   type: EBlockNavigation.blocks,
    //   icon: <BlockOutlined />,
    // },
    {
      label: "Portfolio",
      type: EBlockNavigation.posts,
      icon: <InstagramOutlined />,
    },
    {
      label: "Customize",
      type: EBlockNavigation.customize,
      icon: <DesktopOutlined />,
    },
    {
      label: "Advanced",
      type: EBlockNavigation.advanced,
      icon: <SettingOutlined />,
    },
  ];

  return (
    <nav className={cn(s.navigation, className)}>
      {navigation.map((item, index) => (
        // if (item.type === "advanced" && isDemo) return null;

        <Button
          className={s.navigation__btn}
          key={index}
          type="text"
          icon={item.icon}
          size="large"
          onClick={() => {
            setSubNavigation(item.type);
            setNavigation(ELKLayoutNavigation.sub);
          }}
        >
          <span>{item.label}</span>
          <span className={s.navigation__arrow}>
            <ArrowRightOutlined />
          </span>
        </Button>
      ))}
    </nav>
  );
};

export default LKLayoutNavigation;
