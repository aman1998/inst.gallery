"use client";
import React from "react";
import cn from "classnames";
import { Typography } from "antd";

import InstagramImageCard from "@entities/Instagram/components/InstagramImageCard";
import { getInstagramPostImage } from "@entities/Instagram/lib/utils";
import { EPostsListType, ICustomizeBlock1, ICustomizeBlock2 } from "@entities/Block/model/customizeTypes";

import s from "./BlockPosts.module.scss";

interface Props {
  customization: ICustomizeBlock1 | ICustomizeBlock2;
  className?: string;
}

const BlockPosts: React.FC<Props> = ({ customization, className }) => {
  const {
    posts,
    postsSettings: { postsStyle, postsLength, postsType, postsWithBg },
    imageStyle,
    imageWrapperStyle,
  } = customization;

  if (!posts?.length) return null;

  if (postsType === EPostsListType.masonry) {
    return (
      <div
        className={cn(s.masonry, className)}
        style={{
          ...postsStyle,
          gridTemplateColumns: `repeat(auto-fill, minmax(calc(${100 / postsLength}% - ${postsStyle.gap}px), 1fr))`,
        }}
      >
        {posts.map((post, index) => {
          const itemSize =
            index % 4 === 0 ? "tallest" : index % 3 === 0 ? "taller" : index % 2 === 0 ? "tall" : "short";

          return (
            <div key={index} className={cn(s["masonry-card"], s[`masonry-card--${itemSize}`])}>
              <InstagramImageCard
                index={index}
                wrapperStyle={imageWrapperStyle}
                style={imageStyle}
                posts={posts}
                classNameWrapper={s["masonry-card__image-wrapper"]}
                src={getInstagramPostImage(post)}
                alt="image"
                fill
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (postsType === EPostsListType.grid) {
    return (
      <div
        className={cn(
          s.grid,
          s[`grid--${postsLength}`],
          postsWithBg && s["grid--with-bg"],
          postsWithBg && !postsStyle?.gap && s["grid--without-gap"],
          className
        )}
        style={postsStyle}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            className={cn(s["grid-card"], postsWithBg && s["grid-card--bg"])}
            style={{
              borderRadius: postsWithBg && postsStyle?.gap ? 12 : 0,
            }}
          >
            <InstagramImageCard
              index={index}
              wrapperStyle={imageWrapperStyle}
              style={imageStyle}
              posts={posts}
              classNameWrapper={s["grid-card__image-wrapper"]}
              src={getInstagramPostImage(post)}
              alt="image"
              fill
            />
            {postsWithBg && (
              <>
                <Typography.Title level={5} style={{ margin: 0 }} className={s["grid-card__title"]}>
                  {post.username}
                </Typography.Title>
                <Typography.Paragraph style={{ margin: 0 }} className={s["grid-card__text"]}>
                  {post.caption}
                </Typography.Paragraph>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(s.gallery, s[`gallery--${posts.length}`], className)} style={postsStyle}>
      {posts?.map((post, index) => {
        const mediaUrl = getInstagramPostImage(post);

        if (!mediaUrl) return null;

        return (
          <div
            className={cn(s.gallery__item, s[`grid__item--${index + 1}`])}
            key={post.id}
            style={{ ...imageWrapperStyle, borderRadius: `${imageWrapperStyle?.borderRadius}%` }}
          >
            <InstagramImageCard
              index={index}
              wrapperStyle={imageWrapperStyle}
              style={imageStyle}
              posts={posts}
              src={mediaUrl}
              classNameWrapper={s.gallery__image}
              fill
              alt="carousel-image"
            />
          </div>
        );
      })}
    </div>
  );
};

export default BlockPosts;
