import React from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import { PlusOutlined } from "@ant-design/icons";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramDownloadedPostsSelector,
  instagramDownloadedPostsIsLoadingSelector,
  instagramDownloadedPostsSelector,
  setInstagramDownloadedPostsInListSelector,
} from "@entities/Instagram/model/selectors";
import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";
import InstagramImage from "@entities/Instagram/components/InstagramImage/InstagramImage";
import { MOCK_INSTAGRAM_POSTS } from "@entities/Instagram/lib/constants";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";
import { useModal } from "@shared/hooks/useModal";
import Button from "@shared/ui/Button";
import { ROUTES } from "@shared/config/routes";

import s from "./SelectInstagramPosts.module.scss";
import CreateInstagramPost from "../CreateInstagramPost";
import { Flex, Form } from "antd";
import Link from "next/link";

interface Props {
  selectedPosts: IInstagramDownloadedPost[];
  setSelectedPosts: (val: IInstagramDownloadedPost[]) => void;

  limit?: number;
  isCustomPosts?: boolean;
}

const SelectInstagramPosts: React.FC<Props> = ({ selectedPosts, setSelectedPosts, limit = 10, isCustomPosts }) => {
  const isLoading = useInstagramStore(instagramDownloadedPostsIsLoadingSelector);
  const posts = useInstagramStore(instagramDownloadedPostsSelector);
  const getInstagramPosts = useInstagramStore(getInstagramDownloadedPostsSelector);
  const setInstagramPosts = useInstagramStore(setInstagramDownloadedPostsInListSelector);

  const router = useRouter();
  const { user } = useUserInfo();
  const { errorMessage } = useMessage();
  const { isDemo } = useLKLayout();
  const { isOpen, openModal, closeModal } = useModal();

  const handleSelect = (post: IInstagramDownloadedPost) => {
    const newSelectedPosts = selectedPosts.some((p) => p.id === post.id)
      ? selectedPosts.filter((p) => p.id !== post.id)
      : selectedPosts.length < limit
        ? [...selectedPosts, post]
        : (errorMessage(`The selection limit for posts is ${limit}`), selectedPosts);

    setSelectedPosts(newSelectedPosts);
  };

  const isSelected = (postId: string) => selectedPosts.some((p) => p.id === postId);

  const handleAddClick = () => {
    if (isCustomPosts) {
      openModal();
    } else {
      router.push(ROUTES.instagramSelectAccount);
    }
  };

  React.useEffect(() => {
    if (posts?.length) return;

    if (isDemo) {
      setInstagramPosts(MOCK_INSTAGRAM_POSTS);
      return;
    }
    if (user?.id) {
      getInstagramPosts(user.id, 100);
    }
  }, [posts, isDemo, user?.id]);

  console.log("posts =>", posts);

  if (isLoading && !isDemo) {
    return (
      <div>
        <Form.Item layout="vertical" label="Upload new work">
          <Button type="dashed" icon={<PlusOutlined />} iconPosition="start" className={s.posts__add} />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label={
            <Flex justify="space-between" style={{ width: "100%" }}>
              <p>Uploaded works</p>
            </Flex>
          }
        >
          <div className={s.posts__list}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div className={s.posts__skeleton} style={{ width: "100%", height: 100 }} key={i} />
            ))}
          </div>
        </Form.Item>
      </div>
    );
  }

  return (
    <>
      <div className={s.posts}>
        <Form.Item layout="vertical" label="Upload new work">
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            iconPosition="start"
            onClick={handleAddClick}
            className={s.posts__add}
          />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label={
            <Flex justify="space-between" style={{ width: "100%" }}>
              <p>Uploaded works</p>
              {!isDemo && (
                <Link className={s.posts__link} href={ROUTES.works} prefetch={false}>
                  All works
                </Link>
              )}
            </Flex>
          }
        >
          <div className={s.posts__list}>
            {!posts?.length ? (
              <p>Empty</p>
            ) : (
              posts?.map((post) => (
                <div className={s["post-wrapper"]} key={post.id}>
                  <InstagramImage
                    classNameWrapper={cn(
                      s["post__image-wrapper"],
                      isSelected(post.id) && s["post__image-wrapper--checked"]
                    )}
                    onClick={() => handleSelect(post)}
                    hoveredAction={false}
                    ActionComponent={null}
                    post={post}
                  />
                </div>
              ))
            )}
          </div>
        </Form.Item>
      </div>
      <CreateInstagramPost isDemo={isDemo} isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default SelectInstagramPosts;
