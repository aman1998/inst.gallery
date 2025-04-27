import { Popover, Typography } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import React from "react";

import InstagramPostPopoverInfo from "@widgets/Instagram/InstagramPosts/components/InstagramPostPopoverInfo";

import DeleteInstagramPost from "@features/Instagram/DeleteInstagramPost";

import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";

import s from "../../InstagramPosts.module.scss";

interface Props {
  post: IInstagramDownloadedPost;
}
const InstagramPostsActionComponent: React.FC<Props> = ({ post }) => (
  <Popover
    destroyTooltipOnHide
    trigger="click"
    placement="bottomRight"
    // content={<InstagramPostPopoverInfo post={post} slug={post.accountId} />}
    content={
      <div
        className={s["post__popover-header"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DeleteInstagramPost post={post} />
      </div>
    }
    title={null}
  >
    <InfoCircleFilled
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{ color: "white" }}
    />
  </Popover>
);

export default InstagramPostsActionComponent;
