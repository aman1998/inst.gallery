import React from "react";
import cn from "classnames";
import { Avatar, Typography } from "antd";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Image from "next/image";
import { Control, Controller } from "react-hook-form";
import { EInstagramType, IInstagramPost } from "@entities/Instagram/model/types";

import Button from "@shared/ui/Button";
import CarouselCustom from "@shared/ui/CarouselCustom";
import s from "./CreateInstagramPostForm.module.scss";
import { uploadFileToSupabase } from "@/shared/config/supabase/actions";
import UploadInstagramMedia from "@/features/Instagram/UploadInstagramMedia";
import { TNullable } from "@/shared/types/common";
import { TCustomizeCreateInstagramPostSchema } from "../../lib/schema";
import InputControl from "@/shared/controllers/InputControl";
import TextAreaControl from "@/shared/controllers/TextAreaControl";

interface Props {
  control: Control<TCustomizeCreateInstagramPostSchema>;
  className?: string;
}

const CreateInstagramPostForm: React.FC<Props> = ({ className, control }) => {
  const renderMedia = React.useCallback((post: TNullable<IInstagramPost>) => {
    if (!post) return <div />;

    switch (post.media_type) {
      case EInstagramType.IMAGE:
        if (!post.media_url) return <div />;
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
        if (!post.media_url) return <div />;
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
        return <div />;
    }
  }, []);

  return (
    <div className={cn(s.post, className)}>
      <div className={cn(s.post__media, "post__media")}>
        <Controller
          control={control}
          name="posts"
          render={({ field: { value, onChange } }) => {
            const post = value[0] as any;
            if (post) {
              return renderMedia(post);
            }
            return (
              <UploadInstagramMedia
                onPostGenerated={(post) => {
                  console.log("post", post);
                  onChange([post]);
                }}
              />
            );
          }}
        />
      </div>
      <div className={cn(s.post__info, "post__info")}>
        <div className={s.post__header}>
          <InputControl isCustomInput control={control} name="title" placeholder="Name" />
        </div>
        <div className={s.post__content}>
          <TextAreaControl isCustomTextArea control={control} name="content" placeholder="Content" />
        </div>
        <div className={s.post__btn}>
          <InputControl isCustomInput control={control} name="link" placeholder="More details Link" />
        </div>
      </div>
    </div>
  );
};

export default CreateInstagramPostForm;
