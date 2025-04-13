import { IInstagramDownloadedPost, IInstagramPost } from "@entities/Instagram/model/types";

export const getInstagramProfileUrl = (username: string) => `https://www.instagram.com/${username}/`;
export const getInstagramPostImage = (post: IInstagramPost | IInstagramDownloadedPost) =>
  post.media_type === "VIDEO" && post.thumbnail_url
    ? post.thumbnail_url
    : post.media_url
      ? post.media_url
      : post.children?.data[0].media_url || post.thumbnail_url || null;
