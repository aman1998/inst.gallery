"use client";

import React from "react";

import BlockLayout from "@widgets/layouts/BlockLayout";
import SubscriptionInfo from "@widgets/Subscription/SubscriptionInfo";
import SubscriptionsList from "@widgets/Subscription/SubscriptionsList";

import SelectSubscription from "@features/Subscription/SelectSubscription";
import SwitchSubscriptionFrequency from "@features/Subscription/SwitchSubscriptionFrequency";

import s from "./SubscriptionsPricesPageContainer.module.scss";

const SubscriptionsPricesPageContainer = () => (
  <BlockLayout title="Pick a plan" endContent={<SwitchSubscriptionFrequency />}>
    <div className={s.page}>
      <SubscriptionInfo />
      <SelectSubscription />
    </div>
    <SubscriptionsList />
  </BlockLayout>
);

export default SubscriptionsPricesPageContainer;
