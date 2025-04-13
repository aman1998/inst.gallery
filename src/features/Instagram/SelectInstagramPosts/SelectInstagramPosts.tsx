import React from "react";
import cn from "classnames";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import AddInstagramPostLink from "@features/Instagram/AddInstagramPostLink";

import { useInstagramStore } from "@entities/Instagram/model/store";
import {
  getInstagramDownloadedPostsSelector,
  instagramDownloadedPostsIsLoadingSelector,
  instagramDownloadedPostsSelector,
} from "@entities/Instagram/model/selectors";
import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";
import InstagramImage from "@entities/Instagram/components/InstagramImage/InstagramImage";
import { MOCK_INSTAGRAM_POSTS } from "@entities/Instagram/lib/constants";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { useMessage } from "@shared/hooks/useMessage";

import s from "./SelectInstagramPosts.module.scss";

interface Props {
  selectedPosts: IInstagramDownloadedPost[];
  setSelectedPosts: (val: IInstagramDownloadedPost[]) => void;

  limit?: number;
}

const SelectInstagramPosts: React.FC<Props> = ({ selectedPosts, setSelectedPosts, limit = 10 }) => {
  const isLoading = useInstagramStore(instagramDownloadedPostsIsLoadingSelector);
  const posts = useInstagramStore(instagramDownloadedPostsSelector);
  const getInstagramPosts = useInstagramStore(getInstagramDownloadedPostsSelector);

  const { user } = useUserInfo();
  const { errorMessage } = useMessage();
  const { isDemo } = useLKLayout();

  const handleSelect = (post: IInstagramDownloadedPost) => {
    const newSelectedPosts = selectedPosts.some((p) => p.id === post.id)
      ? selectedPosts.filter((p) => p.id !== post.id)
      : selectedPosts.length < limit
        ? [...selectedPosts, post]
        : (errorMessage(`The selection limit for posts is ${limit}`), selectedPosts);

    setSelectedPosts(newSelectedPosts);
  };

  const isSelected = (postId: string) => selectedPosts.some((p) => p.id === postId);

  React.useEffect(() => {
    if (!posts?.length && user?.id) {
      getInstagramPosts(user.id, 100);
    }
  }, [posts, getInstagramPosts, isDemo, user?.id]);

  if (isLoading && !isDemo) {
    return (
      <div className={s.posts}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div className={s.posts__skeleton} style={{ width: "100%", height: 280 }} key={i} />
        ))}
      </div>
    );
  }

  if (isDemo) {
    return (
      <div className={s.posts}>
        {MOCK_INSTAGRAM_POSTS?.map((post) => (
          <div className={s["post-wrapper"]} key={post.id}>
            <InstagramImage
              classNameWrapper={cn(s["post__image-wrapper"], isSelected(post.id) && s["post__image-wrapper--checked"])}
              onClick={() => handleSelect(post)}
              hoveredAction={false}
              ActionComponent={null}
              post={post}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={s.posts}>
      <AddInstagramPostLink className={s.posts__link} />
      {posts?.map((post) => (
        <div className={s["post-wrapper"]} key={post.id}>
          <InstagramImage
            classNameWrapper={cn(s["post__image-wrapper"], isSelected(post.id) && s["post__image-wrapper--checked"])}
            onClick={() => handleSelect(post)}
            hoveredAction={false}
            ActionComponent={null}
            post={post}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectInstagramPosts;
