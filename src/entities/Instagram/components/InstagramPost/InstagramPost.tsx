import React from "react";
import cn from "classnames";
import { Avatar, Typography } from "antd";
import Image from "next/image";
import { CaretRightFilled } from "@ant-design/icons";

import Button from "@shared/ui/Button";
import CarouselCustom from "@shared/ui/CarouselCustom";

import { IInstagramPost, EInstagramType, IInstagramDownloadedPost } from "../../model/types";

import s from "./InstagramPost.module.scss";

interface Props {
  post: IInstagramPost | IInstagramDownloadedPost;
  className?: string;
}

const InstagramPost: React.FC<Props> = ({ post, className }) => {
  const renderMedia = () => {
    switch (post.media_type) {
      case EInstagramType.IMAGE:
        if (!post.media_url) return null;
        return (
          <Image
            loading="lazy"
            fill
            src={post.media_url}
            alt={post.caption || "Instagram Post"}
            className={s.post__image}
            quality={75}
          />
        );
      case EInstagramType.VIDEO:
        if (!post.media_url) return null;
        return (
          <div style={{ height: "100%" }}>
            <video
              className={s.post__video}
              controls={true}
              autoPlay
              loop
              playsInline
              poster={post.thumbnail_url ?? undefined}
            >
              <source src={post.media_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case EInstagramType.CAROUSEL_ALBUM:
        return (
          <CarouselCustom>
            {post.children?.data.map((child) => (
              <Image
                key={child.id}
                loading="lazy"
                fill
                src={child.media_url}
                alt={post.caption || "Carousel Image"}
                className={s.post__image}
                quality={75}
              />
            ))}
          </CarouselCustom>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(s.post, className)}>
      <div className={s.post__media}>{renderMedia()}</div>
      <div className={s.post__info}>
        <div className={s.post__header}>
          <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>{post.username[0].toUpperCase()}</Avatar>
          <Typography.Title level={5} onClick={() => window.open(post.permalink)} className={s.post__username}>
            {post.username}
          </Typography.Title>
        </div>
        <div className={s.post__content}>{post.caption}</div>
        <Button
          onClick={() => window.open(post.permalink)}
          type="text"
          icon={<CaretRightFilled />}
          className={s.post__btn}
        >
          More details
        </Button>
      </div>
    </div>
  );
};

export default InstagramPost;
