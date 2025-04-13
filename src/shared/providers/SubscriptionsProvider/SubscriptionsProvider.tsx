"use client";

import React from "react";

import { ESubscriptionFrequency, ESubscriptionPlan, TSubscriptionPaddle } from "@entities/Subscription/model/types";

import { TNullable } from "@shared/types/common";
import { SubscriptionsContext } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";

interface Props {
  children: React.ReactNode;
  // subscriptions: TNullable<TSubscriptionPaddle[]>;
  subscriptions: TNullable<string>;
  plan: ESubscriptionPlan;
}
const SubscriptionsProvider: React.FC<Props> = ({ children, subscriptions: subscriptionsProp, plan: planProp }) => {
  const [subscriptions, setSubscription] = React.useState<TNullable<TSubscriptionPaddle[]>>(
    subscriptionsProp ? (JSON.parse(subscriptionsProp) as TSubscriptionPaddle[]) : null
  );
  const [plan, setPlan] = React.useState<ESubscriptionPlan>(planProp);
  const [frequency, setFrequency] = React.useState<ESubscriptionFrequency>(ESubscriptionFrequency.annual);

  return (
    <SubscriptionsContext.Provider value={{ subscriptions, setSubscription, plan, setPlan, frequency, setFrequency }}>
      {children}
    </SubscriptionsContext.Provider>
  );
};

export default SubscriptionsProvider;
