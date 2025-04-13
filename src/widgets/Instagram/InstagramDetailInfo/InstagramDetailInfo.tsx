"use client";
import React from "react";
import cn from "classnames";
import { Avatar, Empty, Typography } from "antd";
import { motion } from "framer-motion";
import { PlusCircleFilled } from "@ant-design/icons";

import DeleteInstagramAccount from "@features/Instagram/DeleteInstagramAccount";

import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramUserInfoSelector,
  instagramInfoIsLoadingSelector,
  instagramInfoSelector,
  resetInstagramInfoSelector,
} from "@entities/Instagram/model/selectors";

import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

import s from "./InstagramDetailInfo.module.scss";

interface Props {
  className?: string;
  slug: string;
}
const InstagramDetailInfo: React.FC<Props> = ({ className, slug }) => {
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
    <div className={cn(s.card, className)}>
      {isLoading ? null : info ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={s.card__content}
        >
          <Avatar src={info.profile_picture_url} size={96} alt="avatar" />
          <Typography.Title level={5}>{info.username}</Typography.Title>
          <div className={s.card__btns}>
            {/*<Button size="small" icon={<ReloadOutlined />} />*/}
            <DeleteInstagramAccount slug={slug} />
          </div>
        </motion.div>
      ) : (
        <>
          <Empty image={<Avatar alt="avatar" size={96} />} description="Not account detail info" />
          <Button
            className={s.card__add}
            href={ROUTES.apiInstagramUrl}
            icon={<PlusCircleFilled />}
            size="small"
            iconPosition="start"
          >
            Add Account again
          </Button>
        </>
      )}
    </div>
  );
};

export default InstagramDetailInfo;
