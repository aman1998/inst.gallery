"use client";

import React from "react";
import { InstagramOutlined, SyncOutlined } from "@ant-design/icons";
import cn from "classnames";

import { useInstagramStore } from "@entities/Instagram/model/store";
import { instagramInfoIsLoadingSelector, instagramInfoSelector } from "@entities/Instagram/model/selectors";

import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { ROUTES } from "@shared/config/routes";

import s from "./UserInstagramInfo.module.scss";

const UserInstagramInfo = () => {
  const isLoading = useInstagramStore(instagramInfoIsLoadingSelector);
  const info = useInstagramStore(instagramInfoSelector);

  return (
    <div className={s.info}>
      <InstagramOutlined width={16} height={16} style={{ color: PRIMARY_COLOR }} />
      {info ? (
        <p className={s.info__text}>{info?.username}</p>
      ) : (
        <a href={ROUTES.apiInstagramUrl} className={cn(s.info__text, s["info__text--sync"])}>
          Not synchronized
        </a>
      )}
    </div>
  );
};

export default UserInstagramInfo;
