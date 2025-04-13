"use client";
import React from "react";
import cn from "classnames";

import InstagramPostsActionComponent from "@widgets/Instagram/InstagramPosts/components/InstagramPostsActionComponent";

import AddInstagramPostLink from "@features/Instagram/AddInstagramPostLink";

import InstagramImage from "@entities/Instagram/components/InstagramImage/InstagramImage";
import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramDownloadedPostsSelector,
  instagramDownloadedPostsIsLoadingSelector,
  instagramDownloadedPostsSelector,
  setCarouselPostsSelector,
  setInitialCarouselSlideSelector,
  setIsModalOpenSelector,
} from "@entities/Instagram/model/selectors";
import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";

import s from "./InstagramPosts.module.scss";

interface Props {
  onClick?: (post: IInstagramDownloadedPost) => void;
}
const InstagramPosts: React.FC<Props> = ({ onClick }) => {
  const getPosts = useInstagramStore(getInstagramDownloadedPostsSelector);
  const posts = useInstagramStore(instagramDownloadedPostsSelector);
  const isLoading = useInstagramStore(instagramDownloadedPostsIsLoadingSelector);

  const setIsModalOpen = useInstagramStore(setIsModalOpenSelector);
  const setCarouselPosts = useInstagramStore(setCarouselPostsSelector);
  const setInitialCarouselSlide = useInstagramStore(setInitialCarouselSlideSelector);

  const { user } = useUserInfo();
  const { errorMessage } = useMessage();

  const handleClick = (post: IInstagramDownloadedPost) => {
    if (onClick) {
      onClick(post);
    } else {
      setIsModalOpen(true);
      setCarouselPosts([post]);
      setInitialCarouselSlide(0);
    }
  };

  React.useEffect(() => {
    if (posts?.length || !user?.id) return;

    getPosts(user?.id, 100, {
      onErrorCallback: (message) => {
        if (typeof message === "string") {
          errorMessage(message);
        }
      },
    });
  }, [posts?.length, getPosts, user?.id, errorMessage]);

  if (isLoading)
    return (
      <div className={s.posts}>
        {Array.from({ length: 8 }, (_, i) => (
          <div className={cn(s.post, s["post--skeleton"])} key={i} />
        ))}
      </div>
    );

  return (
    <>
      <section className={s.posts}>
        <AddInstagramPostLink size="large" className={cn(s.post, s["post--add"])}>
          <div>Add Post</div>
        </AddInstagramPostLink>
        {posts?.map((post) => (
          <div key={post.id} className={s.post} onClick={() => handleClick(post)}>
            <InstagramImage
              hoveredAction={false}
              ActionComponent={<InstagramPostsActionComponent post={post} />}
              post={post}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default InstagramPosts;
