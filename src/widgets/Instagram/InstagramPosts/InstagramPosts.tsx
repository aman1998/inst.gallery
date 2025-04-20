"use client";
import React from "react";
import cn from "classnames";
import { PlusOutlined } from "@ant-design/icons";
import { Empty, Form, Typography } from "antd";

import InstagramPostsActionComponent from "@widgets/Instagram/InstagramPosts/components/InstagramPostsActionComponent";

import CreateInstagramPost from "@features/Instagram/CreateInstagramPost";

import InstagramImage from "@entities/Instagram/components/InstagramImage/InstagramImage";
import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramDownloadedPostsSelector,
  instagramDownloadedPostsIsLoadingSelector,
  instagramDownloadedPostsSelector,
  setCarouselPostsSelector,
  setInitialCarouselSlideSelector,
  setIsModalOpenSelector,
} from "@entities/Instagram/model/selectors";
import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";
import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

import s from "./InstagramPosts.module.scss";
import { useModal } from "@/shared/hooks/useModal";
import { useRouter } from "next/navigation";

interface Props {
  onClick?: (post: IInstagramDownloadedPost) => void;
  isCustomPosts?: boolean;
}
const InstagramPosts: React.FC<Props> = ({ onClick, isCustomPosts }) => {
  const getPosts = useInstagramStore(getInstagramDownloadedPostsSelector);
  const posts = useInstagramStore(instagramDownloadedPostsSelector);
  const isLoading = useInstagramStore(instagramDownloadedPostsIsLoadingSelector);

  const setIsModalOpen = useInstagramStore(setIsModalOpenSelector);
  const setCarouselPosts = useInstagramStore(setCarouselPostsSelector);
  const setInitialCarouselSlide = useInstagramStore(setInitialCarouselSlideSelector);

  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const { user } = useUserInfo();
  const { errorMessage } = useMessage();

  const handleClick = (post: IInstagramDownloadedPost) => {
    if (onClick) {
      onClick(post);
    } else {
      setIsModalOpen(true);
      setCarouselPosts([post]);
      setInitialCarouselSlide(0);
    }
  };

  const handleAddClick = () => {
    if (isCustomPosts) {
      openModal();
    } else {
      router.push(ROUTES.instagramSelectAccount);
    }
  };

  React.useEffect(() => {
    if (posts?.length || !user?.id) return;

    getPosts(user?.id, 100, {
      onErrorCallback: (message) => {
        if (typeof message === "string") {
          errorMessage(message);
        }
      },
    });
  }, [posts?.length, getPosts, user?.id, errorMessage]);

  if (isLoading)
    return (
      <section className={s.posts}>
        <Form.Item layout="vertical" label="Upload new work">
          <Button type="dashed" icon={<PlusOutlined />} iconPosition="start" className={s.post__add} />
        </Form.Item>

        <Form.Item layout="vertical" label="Uploaded works">
          <div className={s.posts__list}>
            {Array.from({ length: 8 }, (_, i) => (
              <div className={cn(s.post, s["post--skeleton"])} key={i} />
            ))}
          </div>
        </Form.Item>
      </section>
    );

  return (
    <>
      <section className={s.posts}>
        <Form.Item layout="vertical" label="Upload new work">
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            iconPosition="start"
            className={s.post__add}
            onClick={handleAddClick}
          />
        </Form.Item>

        <Form.Item layout="vertical" label="Uploaded works">
          <div className={s.posts__list}>
            {!posts?.length ? (
              <p>Empty</p>
            ) : (
              posts?.map((post) => (
                <div key={post.id} className={s.post} onClick={() => handleClick(post)}>
                  <InstagramImage
                    hoveredAction={false}
                    ActionComponent={<InstagramPostsActionComponent post={post} />}
                    // ActionComponent={<DeleteInstagramPost id={post.id} />}
                    post={post}
                  />
                </div>
              ))
            )}
          </div>
        </Form.Item>
      </section>
      <CreateInstagramPost isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default InstagramPosts;
