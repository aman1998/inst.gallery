"use client";

import React from "react";
import { usePathname } from "next/navigation";

import ProfileNavigation from "@widgets/layouts/ProfileLayout/components/ProfileNavigation";

import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramDownloadedPostsSelector,
  instagramDownloadedPostsIsLoadingSelector,
  instagramDownloadedPostsSelector,
} from "@entities/Instagram/model/selectors";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";
import { ROUTES } from "@shared/config/routes";

import s from "./ProfileLayout.module.scss";

interface Props {
  children: React.ReactNode;
}
const ProfileLayout: React.FC<Props> = ({ children }) => {
  const getPosts = useInstagramStore(getInstagramDownloadedPostsSelector);
  const posts = useInstagramStore(instagramDownloadedPostsSelector);

  const { user } = useUserInfo();
  const { errorMessage } = useMessage();
  const pathname = usePathname();

  React.useEffect(() => {
    if (posts?.length || !user?.id || pathname === ROUTES.posts) return;

    getPosts(user?.id, 100, {
      onErrorCallback: (message) => {
        if (typeof message === "string") {
          errorMessage(message);
        }
      },
    });
  }, [posts?.length, getPosts, user?.id, errorMessage]);

  return (
    <div className={s.layout}>
      <ProfileNavigation className={s.layout__navigation} />
      <main>{children}</main>
    </div>
  );
};

export default ProfileLayout;
