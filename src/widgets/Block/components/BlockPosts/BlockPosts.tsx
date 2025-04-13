"use client";
import React from "react";
import cn from "classnames";

import InstagramImageCard from "@entities/Instagram/components/InstagramImageCard";
import { getInstagramPostImage } from "@entities/Instagram/lib/utils";
import { EPostsListType, ICustomizeBlock1 } from "@entities/Block/model/customizeTypes";

import s from "./BlockPosts.module.scss";

interface Props {
  unoptimized?: boolean;
  customization: ICustomizeBlock1;
}

const BlockPosts: React.FC<Props> = ({ customization, unoptimized }) => {
  const {
    posts,
    postsSettings: { postsStyle, postsLength, postsType },
    imageStyle,
    imageWrapperStyle,
    headerStyle,
  } = customization;

  if (postsType === EPostsListType.masonry) {
    return (
      <div
        className={s.masonry}
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
      <div className={cn(s.grid, s[`grid--${postsLength}`])} style={postsStyle}>
        {posts.map((post, index) => (
          <div key={index} className={s["grid-card"]}>
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
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(s.gallery, s[`gallery--${posts.length}`])} style={postsStyle}>
      {posts?.map((item, index) => {
        const mediaUrl = getInstagramPostImage(item);

        if (!mediaUrl) return null;

        return (
          <div
            className={cn(s.gallery__item, s[`grid__item--${index + 1}`])}
            key={item.id}
            style={{ ...imageWrapperStyle, borderRadius: `${imageWrapperStyle?.borderRadius}%` }}
          >
            <InstagramImageCard
              index={index}
              wrapperStyle={imageWrapperStyle}
              style={imageStyle}
              unoptimized={unoptimized}
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
