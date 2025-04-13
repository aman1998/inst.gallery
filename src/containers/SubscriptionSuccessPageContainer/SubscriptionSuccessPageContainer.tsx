import React from "react";

import SubscriptionSuccess from "@widgets/Subscription/SubscriptionSuccess";

import s from "./SubscriptionSuccessPageContainer.module.scss";

const SubscriptionSuccessPageContainer: React.FC = async () => (
  <article className={s.page}>
    <SubscriptionSuccess />
  </article>
);

export default SubscriptionSuccessPageContainer;
