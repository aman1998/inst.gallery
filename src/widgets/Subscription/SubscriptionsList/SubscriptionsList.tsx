"use client";

import SubscriptionsCards from "@widgets/Subscription/SubscriptionsList/components/SubscriptionsCards";
import SubscriptionDetail from "@widgets/Subscription/SubscriptionDetail";

import { ErrorMessage } from "@shared/config/paddle/data-helpers";
import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";

const SubscriptionsList = () => {
  const { subscriptions } = useSubscriptionsInfo();

  if (!subscriptions) return <p>{ErrorMessage}</p>;

  if (subscriptions.length === 0) {
    return <div>empty</div>;
  } else if (subscriptions.length === 1) {
    return <SubscriptionDetail id={subscriptions[0].id} />;
  } else {
    // return <SubscriptionsCards subscriptions={JSON.stringify(subscriptions)} />;
    return subscriptions.map((subscription) => <SubscriptionDetail id={subscription.id} key={subscription.id} />);
  }
};

export default SubscriptionsList;
