"use client";

import React from "react";

import { TUser } from "@entities/User/model/types";
import { ESubscriptionFrequency, ESubscriptionPlan, TSubscriptionPaddle } from "@entities/Subscription/model/types";

import { TNullable } from "@shared/types/common";

interface ISubscriptionsContextType {
  subscriptions: TNullable<TSubscriptionPaddle[]>;
  setSubscription: React.Dispatch<React.SetStateAction<TNullable<TSubscriptionPaddle[]>>>;

  plan: ESubscriptionPlan;
  setPlan: React.Dispatch<React.SetStateAction<ESubscriptionPlan>>;

  frequency: ESubscriptionFrequency;
  setFrequency: React.Dispatch<React.SetStateAction<ESubscriptionFrequency>>;
}

export const SubscriptionsContext = React.createContext<ISubscriptionsContextType | undefined>(undefined);

export const useSubscriptionsInfo = (): ISubscriptionsContextType => {
  const context = React.useContext(SubscriptionsContext);

  if (context === undefined) {
    throw new Error("useSubscriptionsInfo must be used within a SubscriptionsProvider");
  }
  return context;
};
