import React from "react";
import Image, { ImageProps } from "next/image";
import {
  BlockOutlined,
  InstagramFilled,
  InstagramOutlined,
  SplitCellsOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import cn from "classnames";

import { EInstagramType, IInstagramDownloadedPost, IInstagramPost } from "@entities/Instagram/model/types";

import s from "./InstagramImage.module.scss";

interface Props {
  classNameWrapper?: string;
  className?: string;
  wrapperStyle?: React.CSSProperties;
  post: IInstagramDownloadedPost | IInstagramPost;
  ActionComponent?: React.ReactNode;
  hoveredAction?: boolean;
  onClick?: () => void;
}

const InstagramImage: React.FC<Props> = ({
  classNameWrapper,
  className,
  wrapperStyle,
  post,
  ActionComponent,
  hoveredAction = true,
  onClick,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div
      className={cn(s["image-wrapper"], isLoading && s["image-wrapper--loading"], classNameWrapper)}
      style={wrapperStyle}
      onClick={onClick}
    >
      {post.media_type === EInstagramType.IMAGE && post.media_url && (
        <>
          <Image
            className={cn(s.image, className)}
            src={post.media_url}
            alt={post.id}
            quality={75}
            fill
            onLoad={() => setIsLoading(false)}
            {...props}
          />
          <InstagramFilled className={s.image__type} style={{ color: "white" }} />
        </>
      )}

      {post.media_type === EInstagramType.CAROUSEL_ALBUM && post.media_url && (
        <>
          <Image
            className={cn(s.image, className)}
            src={post.media_url}
            alt={post.id}
            quality={75}
            fill
            onLoad={() => setIsLoading(false)}
            {...props}
          />
          <BlockOutlined className={s.image__type} style={{ color: "white" }} />
        </>
      )}

      {post.media_type === EInstagramType.VIDEO && post.thumbnail_url && (
        <>
          <Image
            className={cn(s.image, className)}
            src={post.thumbnail_url}
            alt={post.id}
            quality={75}
            fill
            onLoad={() => setIsLoading(false)}
            {...props}
          />
          <VideoCameraOutlined className={s.image__type} style={{ color: "white" }} />
        </>
      )}

      {ActionComponent && (
        <div className={cn(s.image__action, !hoveredAction && s["image__action--active"])}>{ActionComponent}</div>
      )}
    </div>
  );
};

export default InstagramImage;
