import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";

import InstagramDetailInfo from "@widgets/Instagram/InstagramDetailInfo";

import { ROUTES } from "@shared/config/routes";

import InstagramDetailPosts from "../../widgets/Instagram/InstagramDetailPosts";

import s from "./InstagramPageContainer.module.scss";

interface Props {
  params: { slug: string };
}
const InstagramPageContainer: React.FC<Props> = ({ params }) => (
  <div className={s.page}>
    <Breadcrumb
      items={[
        {
          title: <Link href={ROUTES.profile}>Instagram accounts</Link>,
        },
        {
          title: <Link href={ROUTES.posts}>My Posts</Link>,
        },
        {
          title: "Account",
        },
      ]}
    />
    <InstagramDetailInfo slug={params.slug} />
    <InstagramDetailPosts slug={params.slug} />
  </div>
);

export default InstagramPageContainer;
