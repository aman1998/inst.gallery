import React from "react";
import Link from "next/link";
import { Breadcrumb } from "antd";

import InstagramAccounts from "@widgets/Instagram/InstagramAccounts";

import AddInstagramAccountLink from "@features/Instagram/AddInstagramAccountLink";

import { ROUTES } from "@shared/config/routes";

import s from "./InstagramAccountsSelectPageContainer.module.scss";

const InstagramAccountsSelectPageContainer = () => (
  <div className={s.page}>
    <div className={s.page__header}>
      <Breadcrumb
        items={[
          {
            title: <Link href={ROUTES.posts}>My Posts</Link>,
          },
          {
            title: "Select Account",
          },
        ]}
      />
      <AddInstagramAccountLink />
    </div>
    <InstagramAccounts />
  </div>
);

export default InstagramAccountsSelectPageContainer;
