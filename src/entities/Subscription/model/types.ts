import { Subscription, type Transaction, type SubscriptionStatus } from "@paddle/paddle-node-sdk";

import { TNullable } from "@shared/types/common";

export type TSubscriptionPaddle = Subscription;
export type TSubscriptionStatus = SubscriptionStatus;
export type TTransaction = Transaction;

export interface ISubscription {
  subscription_id: string;
  subscription_status: TSubscriptionStatus;
  price_id: string;
  product_id: string;
  scheduled_change: string;
  paused_at: TNullable<string>;
  canceled_at: TNullable<string>;
  customer_id: string;
  created_at: string;
  updated_at: TNullable<string>;
}

export enum ESubscriptionPlan {
  free = "free",
  personal = "personal",
  business = "business",
}

export enum ESubscriptionFrequency {
  month = "month",
  annual = "annual",
  // once = "once",
}

export interface ISubscriptionPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  mainFeatures: ISubscriptionPlanFeatureMain[];
  detailedFeatures: ISubscriptionPlanFeatureDetailed[];
  popular?: boolean;
  isPaused?: boolean;
  buttonText: string;
  buttonType?: "default" | "primary" | "link" | "text" | "dashed";
  priceId: Record<ESubscriptionFrequency, string>;
  type: ESubscriptionPlan;
}

export interface ISubscriptionPlanFeatureMain {
  title: string;
  value: string | number;
}

export interface ISubscriptionPlanFeatureDetailed {
  title: string;
  included: boolean | "soon";
}
