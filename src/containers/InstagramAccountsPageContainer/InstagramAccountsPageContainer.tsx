import React from "react";

import InstagramAccounts from "@widgets/Instagram/InstagramAccounts";
import BlockLayout from "@widgets/layouts/BlockLayout";

import AddInstagramAccountLink from "@features/Instagram/AddInstagramAccountLink";

import s from "./InstagramAccountsPageContainer.module.scss";

const InstagramAccountsPageContainer = () => (
  <BlockLayout title="Instagram Accounts" className={s.page} endContent={<AddInstagramAccountLink />}>
    <InstagramAccounts />
  </BlockLayout>
);

export default InstagramAccountsPageContainer;
