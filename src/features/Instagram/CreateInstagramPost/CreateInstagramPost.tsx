import React from "react";
import { Modal, Typography } from "antd";
import cn from "classnames";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import {
  addInstagramDownloadedPostsInListSelector,
  instagramDownloadedPostsSelector,
} from "@entities/Instagram/model/selectors";
import { getSubscriptionsConfig } from "@entities/Subscription/lib/utils";
import { EInstagramType, IInstagramPost } from "@entities/Instagram/model/types";
import { useInstagramStore } from "@entities/Instagram/model/store";

import { useMessage } from "@shared/hooks/useMessage";
import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";
import { uploadUrlToSupabase } from "@shared/config/supabase/actions";
import { ROUTES } from "@shared/config/routes";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { createClient } from "@shared/config/supabase/client";

import CreateInstagramPostHeader from "./components/CreateInstagramPostHeader";
import CreateInstagramPostForm from "./components/CreateInstagramPostForm";
import { TCustomizeCreateInstagramPostSchema, customizeCreateInstagramPostSchema } from "./lib/schema";
import s from "./CreateInstagramPost.module.scss";
import { useUserInfo } from "@/shared/providers/UserProvider/lib/useUserInfo";

const IGNORE_CLASS = "antd-instagram-post";
const defaultValues = {
  title: "",
  content: "",
  link: "",
  posts: [],
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateInstagramPost: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const modalRef = React.useRef<HTMLDivElement>(null);

  const { successMessage, errorMessage, loadingMessage, destroyMessage } = useMessage();
  const { plan } = useSubscriptionsInfo();
  const { maxUploadPosts, excludedInstagramType } = getSubscriptionsConfig(plan);

  const addInstagramDownloadedPostsInList = useInstagramStore(addInstagramDownloadedPostsInListSelector);
  const downloadedPosts = useInstagramStore(instagramDownloadedPostsSelector);

  const supabase = createClient();
  const { user } = useUserInfo();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
  } = useForm<TCustomizeCreateInstagramPostSchema>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(customizeCreateInstagramPostSchema),
  });

  const handleModalOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClose();
  };

  const handleDownload = async (post: IInstagramPost) => {
    if (isLoading) return;

    if (excludedInstagramType.includes(post.media_type)) {
      errorMessage("This format not unavailable under your plan");
      return;
    }

    if (downloadedPosts?.length && downloadedPosts?.length >= maxUploadPosts) {
      errorMessage("You have reached your plan's post upload limit.");
      return;
    }

    setIsLoading(true);
    loadingMessage("In process");

    try {
      const newPost = { ...post, downloaded_id: post.id + user?.id };

      if (post.media_type === EInstagramType.IMAGE && post.media_url) {
        newPost.media_url =
          (await uploadUrlToSupabase(post.media_url, `${post.id}/images/${post.id}.jpg`)) || post.media_url;
      }

      if (post.media_type === EInstagramType.VIDEO) {
        if (post.media_url) {
          newPost.media_url =
            (await uploadUrlToSupabase(post.media_url, `${post.id}/videos/${post.id}.mp4`)) || post.media_url;
        }
        if (post.thumbnail_url) {
          newPost.thumbnail_url =
            (await uploadUrlToSupabase(post.thumbnail_url, `${post.id}/thumbnails/${post.id}.jpg`)) ||
            post.thumbnail_url;
        }
      }

      if (post.media_type === EInstagramType.CAROUSEL_ALBUM && post.children) {
        const newChildren = await Promise.all(
          post.children.data.map(async (child) => {
            const newChild = { ...child };
            newChild.media_url =
              (await uploadUrlToSupabase(child.media_url, `${post.id}/carousel/${child.id}.jpg`)) || child.media_url;
            return newChild;
          })
        );
        newPost.children = { data: newChildren };
        newPost.media_url = newChildren[0].media_url;
      }

      const { error, data } = await supabase
        .from(ESupabaseDB.instagramPosts)
        .upsert(newPost, {
          onConflict: "downloaded_id",
        })
        .select();

      if (data?.length) {
        addInstagramDownloadedPostsInList(data[0]);
      }

      destroyMessage();

      if (error) {
        errorMessage(error.message);
        setIsLoading(false);
        return;
      }
      successMessage(
        <div>
          <Typography.Text style={{ marginRight: 8 }}>Work downloaded successfully!</Typography.Text>
          <Link
            onClick={() => {
              destroyMessage();
            }}
            href={ROUTES.works}
            prefetch={false}
          >
            Go to works
          </Link>
        </div>
      );
      reset(defaultValues);
      onSuccess?.();
      onClose?.();
      setIsLoading(false);
    } catch {
      destroyMessage();
      errorMessage("Failed to download post");
      setIsLoading(false);
    }
  };

  const onSubmit = (data: TCustomizeCreateInstagramPostSchema) => {
    if (!data?.posts?.length || !Object.keys(data.posts[0]).length) {
      errorMessage("Works empty");
      return;
    }

    const uploadedPost = data.posts[0] as any;
    const post: IInstagramPost = {
      ...uploadedPost,
      caption: data.content,
      permalink: data?.link ?? "",
      username: data.title,
    };

    handleDownload(post);
  };

  return (
    <Modal
      panelRef={modalRef}
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      rootClassName="antd-instagram-carousel-create"
      className={s.modal}
      classNames={{
        body: s.modal__body,
        wrapper: s.modal__wrapper,
        content: s.modal__content,
        mask: s.modal__mask,
      }}
      style={{ top: 0, left: 0, width: "100vw", height: "100vh", margin: 0 }}
      footer={null}
      title={null}
      destroyOnClose
    >
      <div onClick={handleModalOutsideClick} className={s.modal__outside}>
        <div className={cn(s["modal__carousel-wrapper"], IGNORE_CLASS)} onClick={(e) => e.stopPropagation()}>
          <CreateInstagramPostHeader
            isLoading={isLoading}
            isDirty={isDirty}
            isValid={isValid}
            className={IGNORE_CLASS}
            onReset={() => reset(defaultValues)}
            onSubmit={handleSubmit(onSubmit)}
          />
          <CreateInstagramPostForm control={control} className={IGNORE_CLASS} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateInstagramPost;
