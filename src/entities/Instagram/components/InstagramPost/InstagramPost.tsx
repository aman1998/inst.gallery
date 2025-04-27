import React from "react";
import cn from "classnames";
import { Avatar, Typography } from "antd";
import Image from "next/image";
import { CaretRightFilled, DoubleRightOutlined } from "@ant-design/icons";

import Button from "@shared/ui/Button";
import CarouselCustom from "@shared/ui/CarouselCustom";

import { IInstagramPost, EInstagramType, IInstagramDownloadedPost } from "../../model/types";

import s from "./InstagramPost.module.scss";

interface IClassname {
  imageClassName?: string;
  videoClassName?: string;
  carouselClassName?: string;
  mediaWrapperClassName?: string;
}

interface Props {
  post: IInstagramPost | IInstagramDownloadedPost;
  classNames?: IClassname;
  className?: string;
}

const InstagramPost: React.FC<Props> = ({ post, classNames, className }) => {
  const [loading, setLoading] = React.useState(true);

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
            className={cn(s.post__image, classNames?.imageClassName)}
            quality={75}
            onLoad={() => setLoading(false)}
          />
        );
      case EInstagramType.VIDEO:
        if (!post.media_url) return null;
        return (
          <div style={{ height: "100%" }}>
            <video
              className={cn(s.post__video, classNames?.videoClassName)}
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
                className={cn(s.post__image, classNames?.carouselClassName)}
                quality={75}
                onLoad={() => setLoading(false)}
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
      {/* <div className={cn(s.post__media, loading && s["post__media--loading"], "post__media")}>{renderMedia()}</div> */}
      <div className={cn(s.post__media, "post__media", classNames?.mediaWrapperClassName)}>{renderMedia()}</div>
      <div className={cn(s.post__info, "post__info")}>
        <div className={s.post__header}>
          <Typography.Title level={5} className={s.post__username} style={{ margin: 0 }}>
            {post.username}
          </Typography.Title>
        </div>
        <div className={s.post__content}>{post.caption}</div>
        {!!post.permalink && (
          <Button
            onClick={() => window.open(post.permalink)}
            type="text"
            icon={<DoubleRightOutlined />}
            className={s.post__btn}
          >
            <div />
            {/* More details */}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InstagramPost;
