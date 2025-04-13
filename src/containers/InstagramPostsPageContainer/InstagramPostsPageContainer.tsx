import React from "react";

import BlockLayout from "@widgets/layouts/BlockLayout";
import InstagramPosts from "@widgets/Instagram/InstagramPosts";

import AddInstagramPostLink from "@features/Instagram/AddInstagramPostLink";

const InstagramPostsPageContainer: React.FC = () => (
  <BlockLayout title="My Posts" endContent={<AddInstagramPostLink />}>
    <InstagramPosts />
  </BlockLayout>
);

export default InstagramPostsPageContainer;
