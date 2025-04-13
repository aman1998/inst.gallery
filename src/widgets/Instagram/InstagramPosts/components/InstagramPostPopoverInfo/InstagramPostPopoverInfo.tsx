"use client";
import React from "react";
import cn from "classnames";
import { Avatar, Empty, Typography } from "antd";
import { motion } from "framer-motion";
import {
  CalendarFilled,
  CalendarOutlined,
  InstagramFilled,
  InstagramOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";

import DeleteInstagramPost from "@features/Instagram/DeleteInstagramPost";

import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";
import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramUserInfoSelector,
  instagramInfoIsLoadingSelector,
  instagramInfoSelector,
  resetInstagramInfoSelector,
} from "@entities/Instagram/model/selectors";

import { formattedDate } from "@shared/utils/times";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./InstagramPostPopoverInfo.module.scss";

interface Props {
  className?: string;
  slug: string;
  post: IInstagramDownloadedPost;
}
const InstagramPostPopoverInfo: React.FC<Props> = ({ className, slug, post }) => {
  const isLoading = useInstagramStore(instagramInfoIsLoadingSelector);
  const info = useInstagramStore(instagramInfoSelector);
  const getInstagramUserInfo = useInstagramStore(getInstagramUserInfoSelector);
  const resetInstagramUserInfo = useInstagramStore(resetInstagramInfoSelector);

  React.useEffect(() => {
    if (info) return;
    getInstagramUserInfo(slug);
  }, [getInstagramUserInfo, info, slug]);

  React.useEffect(() => () => resetInstagramUserInfo(), [resetInstagramUserInfo]);

  if (!slug) return null;

  return (
    <div
      className={cn(s.card, isLoading && s["card--skeleton"], className)}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {isLoading ? null : info ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={s.card__content}
        >
          <div className={s.card__info}>
            <Avatar src={info.profile_picture_url} size={32} alt="avatar" />
            <Typography.Title className={s.card__name} level={5}>
              {info.username}
            </Typography.Title>
          </div>
          <div className={s.card__flex}>
            <p>Type:</p>
            <Typography.Paragraph style={{ margin: 0 }}>{post.media_type}</Typography.Paragraph>
          </div>
          <div className={s.card__flex}>
            <PlusCircleFilled style={{ color: PRIMARY_COLOR }} />
            <Typography.Paragraph style={{ margin: 0 }}>
              {formattedDate(post.created_at, "d MMMM yyyy")}
            </Typography.Paragraph>
          </div>
          <div className={s.card__flex}>
            <InstagramOutlined style={{ color: PRIMARY_COLOR }} />
            <Typography.Paragraph style={{ margin: 0 }}>
              {formattedDate(post.timestamp, "d MMMM yyyy")}
            </Typography.Paragraph>
          </div>
          {/*<Typography.Paragraph style={{ margin: 0 }}>*/}
          {/*  <CalendarOutlined /> {formattedDate(post.created_at, "d MMMM yyyy")}*/}
          {/*</Typography.Paragraph>*/}
        </motion.div>
      ) : (
        <Empty image={<Avatar alt="avatar" size={32} />} description="Not account detail info" />
      )}
    </div>
  );
};

export default InstagramPostPopoverInfo;
