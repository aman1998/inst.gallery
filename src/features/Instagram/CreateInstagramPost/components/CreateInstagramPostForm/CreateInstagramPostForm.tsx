import React from "react";
import cn from "classnames";
import { Avatar, Typography } from "antd";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Image from "next/image";
import { CaretRightFilled } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";

import { EInstagramType, IInstagramPost } from "@entities/Instagram/model/types";

import Button from "@shared/ui/Button";
import CarouselCustom from "@shared/ui/CarouselCustom";
import s from "./CreateInstagramPostForm.module.scss";
import { uploadFileToSupabase } from "@/shared/config/supabase/actions";
import UploadInstagramMedia from "@/features/Instagram/UploadInstagramMedia";
import { TNullable } from "@/shared/types/common";

interface Props {
  className?: string;
}

const CreateInstagramPostForm: React.FC<Props> = ({ className }) => {
  const [post, setPost] = React.useState<TNullable<IInstagramPost>>(null);

  const renderMedia = React.useMemo(() => {
    if (!post) return null;

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
  }, [post]);

  return (
    <div className={cn(s.post, className)}>
      <div className={cn(s.post__media, "post__media")}>
        {post ? renderMedia : <UploadInstagramMedia onPostGenerated={setPost} />}
      </div>
      <div className={cn(s.post__info, "post__info")}>
        <div className={s.post__header}>
          <input placeholder="Name" />
        </div>
        <div className={s.post__content}>
          <textarea placeholder="Content" />
        </div>
        <div className={s.post__btn}>
          <input placeholder="Button text" />
          <input placeholder="link" />
        </div>
      </div>
    </div>
  );
};

export default CreateInstagramPostForm;
