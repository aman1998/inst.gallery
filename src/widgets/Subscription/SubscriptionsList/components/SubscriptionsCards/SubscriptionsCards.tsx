import React from "react";
import cn from "classnames";

import SubscriptionCard from "@entities/Subscription/components/SubscriptionCard";
import { TSubscriptionPaddle } from "@entities/Subscription/model/types";

import s from "./SubscriptionsCards.module.scss";

interface Props {
  // TODO: Only plain objects can be passed to Client Components from Server Components
  // subscriptions: TSubscriptionPaddle[];
  subscriptions: string;
  className?: string;
}
const SubscriptionsCards: React.FC<Props> = ({ subscriptions, className }) => {
  if (!subscriptions?.length) return <span>No active subscriptions</span>;

  const list = JSON.parse(subscriptions) as TSubscriptionPaddle[];

  return (
    <div className={cn(s.cards, className)}>
      {list.map((subscription) => (
        <SubscriptionCard subscription={subscription} key={subscription.id} />
      ))}
    </div>
  );
};

export default SubscriptionsCards;
