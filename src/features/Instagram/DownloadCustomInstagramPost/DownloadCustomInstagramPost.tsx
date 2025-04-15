import React from "react";
import { DownloadOutlined, LoadingOutlined, PlusCircleFilled } from "@ant-design/icons";
import Link from "next/link";
import { Typography } from "antd";

import { EInstagramType, IInstagramPost } from "@entities/Instagram/model/types";
import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  addInstagramDownloadedPostsInListSelector,
  instagramDownloadedPostsSelector,
} from "@entities/Instagram/model/selectors";
import { getSubscriptionsConfig } from "@entities/Subscription/lib/utils";

import { createClient } from "@shared/config/supabase/client";
import { ESupabaseBucket, ESupabaseDB } from "@shared/config/supabase/types";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";
import { ROUTES } from "@shared/config/routes";
import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";

import s from "./DownloadCustomInstagramPost.module.scss";

interface Props {
  post: IInstagramPost;
  slug: string;
}
const DownloadCustomInstagramPost: React.FC<Props> = ({ post, slug }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useUserInfo();
  const supabase = createClient();

  const addInstagramDownloadedPostsInList = useInstagramStore(addInstagramDownloadedPostsInListSelector);
  const downloadedPosts = useInstagramStore(instagramDownloadedPostsSelector);

  const { successMessage, errorMessage, loadingMessage, destroyMessage } = useMessage();

  const { plan } = useSubscriptionsInfo();
  const { maxUploadPosts, excludedInstagramType } = getSubscriptionsConfig(plan);

  const uploadFileToSupabase = async (fileUrl: string, filePath: string): Promise<string | null> => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const fullPath = `${user?.id}/${filePath}`;

      const { data, error } = await supabase.storage
        .from(ESupabaseBucket.instagramMedia)
        .upload(fullPath, blob, { upsert: true });

      if (error) return null;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      return `${supabaseUrl}/storage/v1/object/public/${ESupabaseBucket.instagramMedia}/${user?.id}/${filePath}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleDownloadClick = async (e: React.MouseEvent<HTMLOrSVGElement>, post: IInstagramPost) => {
    e.preventDefault();
    e.stopPropagation();

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
      const newPost = { ...post, accountId: slug, downloaded_id: post.id + user?.id };

      if (post.media_type === EInstagramType.IMAGE && post.media_url) {
        newPost.media_url =
          (await uploadFileToSupabase(post.media_url, `${post.id}/images/${post.id}.jpg`)) || post.media_url;
      }

      if (post.media_type === EInstagramType.VIDEO) {
        if (post.media_url) {
          newPost.media_url =
            (await uploadFileToSupabase(post.media_url, `${post.id}/videos/${post.id}.mp4`)) || post.media_url;
        }
        if (post.thumbnail_url) {
          newPost.thumbnail_url =
            (await uploadFileToSupabase(post.thumbnail_url, `${post.id}/thumbnails/${post.id}.jpg`)) ||
            post.thumbnail_url;
        }
      }

      if (post.media_type === EInstagramType.CAROUSEL_ALBUM && post.children) {
        const newChildren = await Promise.all(
          post.children.data.map(async (child) => {
            const newChild = { ...child };
            newChild.media_url =
              (await uploadFileToSupabase(child.media_url, `${post.id}/carousel/${child.id}.jpg`)) || child.media_url;
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
          <Typography.Text style={{ marginRight: 8 }}>Post downloaded successfully!</Typography.Text>
          <Link
            onClick={() => {
              destroyMessage();
            }}
            className={s.download__link}
            href={ROUTES.posts}
            prefetch={false}
          >
            Go to Posts
          </Link>
        </div>
      );
      setIsLoading(false);
    } catch {
      destroyMessage();
      errorMessage("Failed to download post");
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingOutlined style={{ color: "white" }} />;

  return <PlusCircleFilled onClick={(e) => handleDownloadClick(e, post)} style={{ color: "white" }} />;
};

export default DownloadCustomInstagramPost;
