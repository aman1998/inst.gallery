"use client";

import React from "react";
import cn from "classnames";
import { Avatar, Typography } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

import { projectSelector } from "@entities/Project/model/selectors";
import { useProjectStore } from "@entities/Project/model/store";
import { IProjectUserInfo } from "@entities/Project/model/types";

import FormItem from "@shared/ui/FormItem";

import s from "./BlockUserInfo.module.scss";
import Image from "next/image";
import ContactsIcon from "@/shared/ui/ContactsIcon";

interface Props {
  className?: string;
  user_info: IProjectUserInfo;
}

const BlockUserInfo: React.FC<Props> = ({ className, user_info }) => {
  const [avatarLoading, setAvatarLoading] = React.useState(true);

  const project = useProjectStore(projectSelector);

  if (!user_info) return null;

  const { name, profession, description, contacts } = user_info;

  // Разделение на текстовые и ссылочные
  const textContacts = contacts?.filter((c) => c.type === "phone" || c.type === "email" || c.type === "whatsapp");
  const linkContacts = contacts?.filter((c) => c.type !== "phone" && c.type !== "email" && c.type !== "whatsapp");

  console.log("linkContacts =>", linkContacts);

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

      {!!textContacts?.length && (
        <Typography.Text style={{ textAlign: "center", fontSize: 14, marginTop: 4 }}>
          {textContacts?.map((contact, idx) => (
            <span key={idx} style={{ marginRight: 8 }}>
              {<ContactsIcon type={contact.type} />} {contact.value}
              {idx < textContacts.length - 1 && ","}
            </span>
          ))}
        </Typography.Text>
      )}

      {!!linkContacts?.length && (
        <div className={cn(s.info__links, linkContacts.length > 5 && s["info__links--grid"])}>
          {linkContacts?.map((item, i) => (
            <a href={item.value} target="_blank" rel="noopener noreferrer" key={i}>
              <FormItem>{<ContactsIcon type={item.type} />}</FormItem>
            </a>
          ))}
        </div>
      )}

      <FormItem className={s.info__description}>{description}</FormItem>
    </section>
  );
};

export default BlockUserInfo;
