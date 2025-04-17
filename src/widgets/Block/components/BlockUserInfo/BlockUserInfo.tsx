"use client";

import React from "react";
import cn from "classnames";
import { Avatar, Typography } from "antd";
import {
  GithubOutlined,
  GitlabOutlined,
  InstagramOutlined,
  TwitchOutlined,
  PhoneOutlined,
  MailOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import { projectSelector } from "@entities/Project/model/selectors";
import { useProjectStore } from "@entities/Project/model/store";
import { IProjectUserInfo } from "@entities/Project/model/types";

import FormItem from "@shared/ui/FormItem";

import s from "./BlockUserInfo.module.scss";
import Image from "next/image";

interface Props {
  className?: string;
  user_info: IProjectUserInfo;
}

const BlockUserInfo: React.FC<Props> = ({ className, user_info }) => {
  const [avatarLoading, setAvatarLoading] = React.useState(true);

  const project = useProjectStore(projectSelector);

  const links = [
    { icon: <GithubOutlined />, link: "https://github.com/aman1998" },
    { icon: <GitlabOutlined />, link: "https://github.com/aman1998" },
    { icon: <InstagramOutlined />, link: "https://github.com/aman1998" },
    { icon: <TwitchOutlined />, link: "https://github.com/aman1998" },
    // { icon: <PhoneOutlined />, link: "https://github.com/aman1998" },
    // { icon: <MailOutlined />, link: "https://github.com/aman1998" },
    { icon: <TwitterOutlined />, link: "https://github.com/aman1998" },
  ];

  if (!user_info) return null;

  const { name, profession, description } = user_info;

  return (
    <section className={cn(s.info, className, "block-user-info")}>
      <div
        className={cn(s["info__avatar-wrapper"], avatarLoading && s["info__avatar-wrapper--loading"])}
        style={{ width: 200, height: 200 }}
      >
        <Image
          className={s.info__avatar}
          style={{ width: 200, minWidth: 200, height: 200 }}
          width={200}
          height={200}
          alt="avatar"
          onLoad={() => setAvatarLoading(false)}
          src="https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/18343023511179378/images/18343023511179378.jpg"
        />
      </div>

      <Typography.Title level={2} style={{ textAlign: "center", margin: "8px 0" }}>
        {name}
      </Typography.Title>
      <Typography.Text style={{ textAlign: "center", color: "gray" }}>{profession}</Typography.Text>
      <Typography.Text style={{ textAlign: "center", fontSize: 14, marginTop: 4 }}>
        <span>
          <PhoneOutlined /> 0555 82 28 37
        </span>
        ,{"  "}
        <span>
          <PhoneOutlined /> 0555 82 28 37
        </span>
        ,{"  "}
        <span>
          <MailOutlined /> 1998-amangeldi@gmail.com
        </span>
      </Typography.Text>
      <div className={s.info__links}>
        {links.map((item, i) => (
          <a href={item.link} target="_blank" key={i}>
            <FormItem>{item.icon}</FormItem>
          </a>
        ))}
      </div>
      <FormItem className={s.info__contacts}>{description}</FormItem>
    </section>
  );
};

export default BlockUserInfo;
