import React from "react";
import Image from "next/image";
import { Typography } from "antd";

import { EInstagramType, IInstagramDownloadedPost } from "@entities/Instagram/model/types";
import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  selectedPostIndexSelector,
  setCarouselPostsSelector,
  setInitialCarouselSlideSelector,
  setIsModalOpenSelector,
  setSelectedPostIndexSelector,
} from "@entities/Instagram/model/selectors";

import Button from "@shared/ui/Button";

import s from "./InstagramCardPost.module.scss";

interface Props {
  index: number;
  post: IInstagramDownloadedPost;
  posts: IInstagramDownloadedPost[];
  ActionsComponent: React.ReactNode;
}

const InstagramPostCard: React.FC<Props> = ({ post, index, posts, ActionsComponent }) => {
  const { media_url, thumbnail_url, caption, timestamp, username, permalink, media_type, children } = post;

  const selectedPostIndex = useInstagramStore(selectedPostIndexSelector);
  const setSelectedPostIndex = useInstagramStore(setSelectedPostIndexSelector);
  const setCarouselPosts = useInstagramStore(setCarouselPostsSelector);
  const setInitialCarouselSlide = useInstagramStore(setInitialCarouselSlideSelector);
  const setIsModalOpen = useInstagramStore(setIsModalOpenSelector);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isNaN(Number(selectedPostIndex))) return;

    e.preventDefault();
    e.stopPropagation();

    setIsModalOpen(true);
    setCarouselPosts(posts);
    setInitialCarouselSlide(selectedPostIndex);
  };

  const imageUrl =
    media_type === EInstagramType.CAROUSEL_ALBUM && children?.data?.length
      ? children.data[0].media_url
      : media_type === EInstagramType.VIDEO && thumbnail_url
        ? thumbnail_url
        : media_url;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setSelectedPostIndex(index)}
      onMouseLeave={() => setSelectedPostIndex(null)}
      className={s.card}
    >
      {imageUrl && (
        <Image
          width={48}
          height={48}
          style={{ width: 48, minWidth: 48, height: 48 }}
          src={imageUrl}
          alt={caption || "Instagram post image"}
          className={s.card__image}
        />
      )}
      {caption && <Typography.Text className={s.card__caption}>{caption}</Typography.Text>}

      <div className={s.card__actions}>{ActionsComponent}</div>
    </div>
  );
};

export default InstagramPostCard;
