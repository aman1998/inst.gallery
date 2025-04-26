import React from "react";
import Image, { ImageProps } from "next/image";
import { InstagramOutlined } from "@ant-design/icons";
import cn from "classnames";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";
import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  selectedPostIndexSelector,
  setCarouselPostsSelector,
  setInitialCarouselSlideSelector,
  setIsModalOpenSelector,
} from "@entities/Instagram/model/selectors";

import DEFAULT_IMAGE from "../../../../../public/images/ronaldo.jpg";

import s from "./InstagramImageCard.module.scss";
interface Props extends Omit<ImageProps, "src"> {
  classNameWrapper?: string;
  wrapperStyle?: React.CSSProperties;
  posts: IInstagramDownloadedPost[];
  disabled?: boolean;
  index: number;
  onClick?: () => void;
  src: null | string | StaticImport;
}

const InstagramImageCard: React.FC<Props> = ({
  classNameWrapper,
  wrapperStyle,
  style,
  posts,
  onClick,
  unoptimized = true,
  disabled,
  alt = "image",
  index,
  src,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const setCarouselPosts = useInstagramStore(setCarouselPostsSelector);
  const setInitialCarouselSlide = useInstagramStore(setInitialCarouselSlideSelector);
  const setIsModalOpen = useInstagramStore(setIsModalOpenSelector);
  const selectedPostIndex = useInstagramStore(selectedPostIndexSelector);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
      setCarouselPosts(posts);
      setInitialCarouselSlide(index);
    }
  };

  console.log("style =>", { ...style, borderRadius: `${style?.borderRadius || 0}%` });

  return (
    <div
      className={cn(
        s["image-wrapper"],
        isLoading && s["image-wrapper--loading"],
        selectedPostIndex === index && s["image-wrapper--selected"],
        classNameWrapper
      )}
      style={{ ...wrapperStyle, borderRadius: `${wrapperStyle?.borderRadius}%` }}
      onClick={handleClick}
    >
      <Image
        style={{ ...style, borderRadius: `${style?.borderRadius || 0}%` }}
        unoptimized={unoptimized}
        loading="lazy"
        alt={alt}
        quality={75}
        onLoad={() => setIsLoading(false)}
        src={src || DEFAULT_IMAGE}
        {...props}
      />
      <InstagramOutlined className={s.image__icon} />
      {selectedPostIndex === index && <InstagramOutlined className={s.image__icon} />}
    </div>
  );
};

export default InstagramImageCard;
