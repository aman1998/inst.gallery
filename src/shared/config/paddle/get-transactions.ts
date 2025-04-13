"use server";

import { getCustomerId } from "@shared/config/paddle/get-customer-id";
import { getErrorMessage, parseSDKResponse } from "@shared/config/paddle/data-helpers";
import { getPaddleInstance } from "@shared/config/paddle/get-paddle-instance";
import { TransactionResponse } from "@shared/types/paddle";

export async function getTransactions(subscriptionId: string, after: string): Promise<TransactionResponse> {
  try {
    const customerId = await getCustomerId();
    if (customerId) {
      const transactionCollection = getPaddleInstance().transactions.list({
        customerId: [customerId],
        after: after,
        // perPage: 10, // TODO: настроить пагинацию в будущем
        status: ["billed", "paid", "past_due", "completed", "canceled"],
        subscriptionId: subscriptionId ? [subscriptionId] : undefined,
      });
      const transactionData = await transactionCollection.next();
      return {
        data: parseSDKResponse(transactionData ?? []),
        hasMore: transactionCollection.hasMore,
        totalRecords: transactionCollection.estimatedTotal,
        error: undefined,
      };
    } else {
      return { data: [], hasMore: false, totalRecords: 0 };
    }
  } catch (e) {
    return getErrorMessage();
  }
}
