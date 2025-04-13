"use client";
import React from "react";
import cn from "classnames";
import { Empty } from "antd";

import DownloadInstagramPost from "@features/Instagram/DownloadInstagramPost";

import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramPostsSelector,
  instagramPostsLoadingSelector,
  instagramPostsPagingSelector,
  instagramPostsSelector,
  resetInstagramPostsSelector,
  setCarouselPostsSelector,
  setInitialCarouselSlideSelector,
  setIsModalOpenSelector,
} from "@entities/Instagram/model/selectors";
import InstagramImage from "@entities/Instagram/components/InstagramImage/InstagramImage";

import Button from "@shared/ui/Button";

import s from "./InstagramDetailPosts.module.scss";

interface Props {
  slug: string;
}

const InstagramDetailPosts: React.FC<Props> = ({ slug }) => {
  const isLoading = useInstagramStore(instagramPostsLoadingSelector);
  const posts = useInstagramStore(instagramPostsSelector);
  const paging = useInstagramStore(instagramPostsPagingSelector);
  const getInstagramPosts = useInstagramStore(getInstagramPostsSelector);
  const resetPosts = useInstagramStore(resetInstagramPostsSelector);

  const setIsModalOpen = useInstagramStore(setIsModalOpenSelector);
  const setCarouselPosts = useInstagramStore(setCarouselPostsSelector);
  const setInitialCarouselSlide = useInstagramStore(setInitialCarouselSlideSelector);

  React.useEffect(() => {
    if (!posts?.length) {
      getInstagramPosts(slug);
    }
  }, [posts, getInstagramPosts, slug]);

  React.useEffect(() => () => resetPosts(), [resetPosts]);

  if (isLoading && !posts?.length) {
    return (
      <div className={s.posts}>
        {Array.from({ length: 8 }, (_, i) => (
          <div className={cn(s.post, s["post--skeleton"])} key={i} />
        ))}
      </div>
    );
  }

  if (!slug) return null;

  if (!posts?.length) return <Empty description="No posts found." />;

  return (
    <section className={s.posts}>
      <div className={s.posts__list}>
        {posts?.map((post) => (
          <div
            key={post.id}
            className={s.post}
            onClick={() => {
              setIsModalOpen(true);
              setCarouselPosts([post]);
              setInitialCarouselSlide(0);
            }}
          >
            <InstagramImage ActionComponent={<DownloadInstagramPost post={post} slug={slug} />} post={post} />
          </div>
        ))}
      </div>
      {paging?.next && paging.cursors.after && (
        <Button
          loading={isLoading}
          className={s.posts__more}
          type="primary"
          size="small"
          onClick={() => getInstagramPosts(slug, paging?.cursors.after)}
        >
          More
        </Button>
      )}
    </section>
  );
};

export default InstagramDetailPosts;
