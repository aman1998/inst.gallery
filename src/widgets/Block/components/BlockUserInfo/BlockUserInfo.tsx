"use client";

import React from "react";
import cn from "classnames";
import { Typography } from "antd";
import Image from "next/image";

import { IProjectUserInfo } from "@entities/Project/model/types";

import FormItem from "@shared/ui/FormItem";
import ContactsIcon from "@shared/ui/ContactsIcon";

import s from "./BlockUserInfo.module.scss";

interface Props {
  className?: string;
  user_info: IProjectUserInfo;
}

const BlockUserInfo: React.FC<Props> = ({ className, user_info }) => {
  const [avatarLoading, setAvatarLoading] = React.useState(true);

  if (!user_info) return null;

  const { name, profession, description, contacts } = user_info;

  // Разделение на текстовые и ссылочные
  const textContacts = contacts?.filter((c) => c.type === "phone" || c.type === "email" || c.type === "whatsapp");
  const linkContacts = contacts?.filter((c) => c.type !== "phone" && c.type !== "email" && c.type !== "whatsapp");

  console.log("user_info?.avatar =>", user_info?.avatar);

  return (
    <section className={cn(s.info, className, "block-user-info")}>
      <div
        className={cn(
          s["info__avatar-wrapper"],
          avatarLoading && s["info__avatar-wrapper--loading"],
          !user_info?.avatar && s["info__avatar-wrapper--empty"]
        )}
        style={{ width: 200, height: 200 }}
      >
        {!!user_info?.avatar && (
          <Image
            className={s.info__avatar}
            style={{ width: 200, minWidth: 200, height: 200 }}
            width={200}
            height={200}
            alt="avatar"
            onLoad={() => setAvatarLoading(false)}
            src={user_info?.avatar}
          />
        )}
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
