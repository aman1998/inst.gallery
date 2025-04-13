import React from "react";
import { redirect } from "next/navigation";

import { ESubscriptionPlan } from "@entities/Subscription/model/types";
import { getUserSubscriptionType } from "@entities/Subscription/lib/utils";
import { geSubscriptions } from "@entities/Subscription/model/actions";

import { createClient } from "@shared/config/supabase/server";
import UserProvider from "@shared/providers/UserProvider";
import { ROUTES } from "@shared/config/routes";
import SubscriptionsProvider from "@shared/providers/SubscriptionsProvider";

interface Props {
  children: React.ReactNode;
}
const LKProvider: React.FC<Props> = async ({ children }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.signIn);

  let subscriptions = [];

  if (user.email) {
    subscriptions = await geSubscriptions(user.email);
  }
  const plan: ESubscriptionPlan = getUserSubscriptionType(subscriptions);

  return (
    <UserProvider user={user}>
      <SubscriptionsProvider subscriptions={subscriptions ? JSON.stringify(subscriptions) : null} plan={plan}>
        {children}
      </SubscriptionsProvider>
    </UserProvider>
  );
};

export default LKProvider;
