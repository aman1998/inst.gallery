"use client";

import React from "react";

import BlockLayout from "@widgets/layouts/BlockLayout";
import SubscriptionInfo from "@widgets/Subscription/SubscriptionInfo";
import SubscriptionsList from "@widgets/Subscription/SubscriptionsList";

import SelectSubscription from "@features/Subscription/SelectSubscription";
import SwitchSubscriptionFrequency from "@features/Subscription/SwitchSubscriptionFrequency";

import { ESubscriptionPlan } from "@entities/Subscription/model/types";

import s from "./SubscriptionsPricesPageContainer.module.scss";

const SubscriptionsPricesPageContainer = () => {
  const [selectedPlan, setSelectedPlan] = React.useState(ESubscriptionPlan.personal);

  return (
    <BlockLayout title="Pick a plan" endContent={<SwitchSubscriptionFrequency />}>
      <div className={s.page}>
        <SubscriptionInfo selectedPlan={selectedPlan} />
        <SelectSubscription selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      </div>
      <SubscriptionsList />
    </BlockLayout>
  );
};
export default SubscriptionsPricesPageContainer;
