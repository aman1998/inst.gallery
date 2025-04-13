"use client";

import React from "react";
import { Tooltip } from "antd";
import { InstagramOutlined, LinkedinOutlined, MailOutlined, WhatsAppOutlined, PhoneOutlined } from "@ant-design/icons";

import Button from "@shared/ui/Button";
import TelegramIcon from "@shared/icons/TelegramIcon";

import s from "./BlockLinks.module.scss";

const links = [
  {
    title: "Instagram",
    icon: <InstagramOutlined />,
  },
  {
    title: "Telegram",
    icon: <TelegramIcon size={14} />,
  },
  {
    title: "Linkedin",
    icon: <LinkedinOutlined />,
  },
  {
    title: "WhatsApp",
    icon: <WhatsAppOutlined />,
  },
  {
    title: "Mail",
    icon: <MailOutlined />,
  },
  {
    title: `Phone`,
    icon: <PhoneOutlined />,
  },
];

interface Props {}

const BlockLinks: React.FC<Props> = () => (
  <div className={s.links}>
    {links.map((link) => (
      <Tooltip title={link.title} key={link.title}>
        <Button icon={link.icon} size="small" />
      </Tooltip>
    ))}
  </div>
);

export default BlockLinks;
