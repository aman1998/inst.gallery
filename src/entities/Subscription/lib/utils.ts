import type { PaymentType, SubscriptionStatus } from "@paddle/paddle-node-sdk";

import {
  ESubscriptionPlan,
  ISubscription,
  TSubscriptionPaddle,
  TTransaction,
} from "@entities/Subscription/model/types";
import { personalIds, businessIds, freeIds, SUBSCRIPTIONS_CONFIG } from "@entities/Subscription/lib/constants";

import { TNullable } from "@shared/types/common";

export const findPaymentMethodDetails = (transactions?: TTransaction[]) => {
  const transactionWithPaymentDetails = transactions?.find((transaction) => transaction.payments[0]?.methodDetails);
  const firstValidPaymentMethod = transactionWithPaymentDetails?.payments[0].methodDetails;
  return firstValidPaymentMethod ? firstValidPaymentMethod : { type: "unknown" as PaymentType, card: null };
};

export const getUserSubscriptionType = (subscriptions: TNullable<ISubscription[]>): ESubscriptionPlan => {
  if (!subscriptions || subscriptions.length === 0) {
    return ESubscriptionPlan.free;
  }

  const activeStatuses: SubscriptionStatus[] = ["active", "trialing", "paused"];
  const activeSubscriptions = subscriptions.filter((sub) => activeStatuses.includes(sub.subscription_status));

  if (activeSubscriptions.length === 0) {
    return ESubscriptionPlan.free;
  }

  const hasBusiness = activeSubscriptions.some((subscription) => businessIds.includes(subscription.price_id));
  if (hasBusiness) {
    return ESubscriptionPlan.business;
  }

  const hasPersonal = activeSubscriptions.some((subscription) => personalIds.includes(subscription.price_id));
  if (hasPersonal) {
    return ESubscriptionPlan.personal;
  }

  const hasFree = activeSubscriptions.some((subscription) => freeIds.includes(subscription.price_id));
  if (hasFree) {
    return ESubscriptionPlan.free;
  }

  return ESubscriptionPlan.free;
};

export const getSubscriptionsConfig = (plan: ESubscriptionPlan) => {
  if (!plan) return SUBSCRIPTIONS_CONFIG[ESubscriptionPlan.free];
  return SUBSCRIPTIONS_CONFIG[plan];
}