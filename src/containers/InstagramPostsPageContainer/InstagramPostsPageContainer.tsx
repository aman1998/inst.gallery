import React from "react";

import BlockLayout from "@widgets/layouts/BlockLayout";
import InstagramPosts from "@widgets/Instagram/InstagramPosts";

const InstagramPostsPageContainer: React.FC = () => (
  <BlockLayout title="My Works">
    <InstagramPosts isCustomPosts />
  </BlockLayout>
);

export default InstagramPostsPageContainer;
