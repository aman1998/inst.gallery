"use server";

import { Subscription } from "@paddle/paddle-node-sdk";
import { revalidatePath } from "next/cache";

import { createClient, validateUserSession } from "@shared/config/supabase/server";
import { getPaddleInstance } from "@shared/config/paddle/get-paddle-instance";
import { ESupabaseDB } from "@shared/config/supabase/types";

const paddle = getPaddleInstance();

interface Error {
  error: string;
}

// Функция для отмены подписки
export const cancelSubscription = async (subscriptionId: string) => {
  await validateUserSession();
  await paddle.subscriptions.cancel(subscriptionId, { effectiveFrom: "next_billing_period" });
};

// Отмена отмены подписки
export const resumeSubscription = async (subscriptionId: string) => {
  await validateUserSession();

  const currenTSubscriptionPaddle = await paddle.subscriptions.get(subscriptionId);

  if (currenTSubscriptionPaddle.status !== "paused") {
    throw new Error(`Subscription must be paused to resume it. Current status - ${currenTSubscriptionPaddle.status}`);
  }
  await paddle.subscriptions.resume(subscriptionId, { effectiveFrom: "immediately" });
};

// Функция для обновления подписки
export const updateSubscription = async (subscriptionId: string, priceId: string) => {
  await validateUserSession();

  await paddle.subscriptions.update(subscriptionId, {
    prorationBillingMode: "prorated_immediately",
    items: [
      {
        priceId,
        quantity: 1,
      },
    ],
  });
};

export const geSubscriptions = async (email: string) => {
  if (!email) return [];

  const supabase = createClient();

  const customersData = await supabase.from("customers").select("customer_id,email").eq("email", email).single();
  if (!customersData?.data?.customer_id) {
    return [];
  }

  const customerId = customersData?.data?.customer_id as string;

  const { data: subscriptions, error } = await supabase
    .from(ESupabaseDB.subscriptions)
    .select("*")
    .eq("customer_id", customerId);

  if (error) return [];

  return subscriptions;
};
