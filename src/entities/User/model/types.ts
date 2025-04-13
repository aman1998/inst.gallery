import { User } from "@supabase/auth-js/src/lib/types";

import { ESubscriptionPlan } from "@entities/Subscription/model/types";

export type TUser = User;

export interface IUserStats {
  postsCount: number;
  accountsCount: number;
  blocksCount: number;
  plan: ESubscriptionPlan;
}
