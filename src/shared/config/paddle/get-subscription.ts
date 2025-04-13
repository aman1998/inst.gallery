"use server";

import { getCustomerId } from "@shared/config/paddle/get-customer-id";
import { ErrorMessage, parseSDKResponse } from "@shared/config/paddle/data-helpers";
import { getPaddleInstance } from "@shared/config/paddle/get-paddle-instance";
import { SubscriptionDetailResponse } from "@shared/types/paddle";

export async function getSubscriptionPaddle(subscriptionId: string): Promise<SubscriptionDetailResponse> {
  try {
    const customerId = await getCustomerId();
    if (customerId) {
      const subscription = await getPaddleInstance().subscriptions.get(subscriptionId, {
        include: ["next_transaction", "recurring_transaction_details"],
      });

      return { data: parseSDKResponse(subscription) };
    }
  } catch (e) {
    return { error: ErrorMessage };
  }
  return { error: ErrorMessage };
}
