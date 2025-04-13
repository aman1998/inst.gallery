"use server";

import { getCustomerId } from "@shared/config/paddle/get-customer-id";
import { getPaddleInstance } from "@shared/config/paddle/get-paddle-instance";
import { getErrorMessage } from "@shared/config/paddle/data-helpers";
import { SubscriptionResponse } from "@shared/types/paddle";

export async function getSubscriptionsPaddle(): Promise<SubscriptionResponse> {
  try {
    const customerId = await getCustomerId();
    if (customerId) {
      const subscriptionCollection = getPaddleInstance().subscriptions.list({
        customerId: [customerId],
        perPage: 20,
        status: ["active", "paused", "past_due", "trialing"],
      });
      const subscriptions = await subscriptionCollection.next();

      return {
        data: subscriptions,
        hasMore: subscriptionCollection.hasMore,
        totalRecords: subscriptionCollection.estimatedTotal,
      };
    }
  } catch (e) {
    return getErrorMessage();
  }
  return getErrorMessage();
}
