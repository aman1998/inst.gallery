"use client";

import React from "react";
import { Card } from "antd";
import Link from "next/link";
import cn from "classnames";

import { TSubscriptionPaddle } from "@entities/Subscription/model/types";
import SubscriptionStatus from "@entities/Subscription/components/SubscriptionStatus";

import { ROUTES } from "@shared/config/routes";
import { parseMoney } from "@shared/config/paddle/parse-money";
import Button from "@shared/ui/Button";
import { useClient } from "@shared/hooks/useClient";

import s from "./SubscriptionCard.module.scss";

interface Props {
  className?: string;
  subscription: TSubscriptionPaddle;
}
const SubscriptionCard: React.FC<Props> = ({ className, subscription }) => {
  const subscriptionItem = subscription.items[0];
  const price = subscriptionItem.quantity * parseFloat(subscriptionItem.price.unitPrice.amount);
  const formattedPrice = parseMoney(price.toString(), subscription.currencyCode);
  const frequency =
    subscription.billingCycle.frequency === 1
      ? `/${subscription.billingCycle.interval}`
      : `every ${subscription.billingCycle.frequency} ${subscription.billingCycle.interval}s`;

  const isClient = useClient();

  if (!isClient) return null;

  return (
    <Link href={ROUTES.subscriptionId(subscription.id)}>
      <Card
        title={subscriptionItem.product.name}
        hoverable
        extra={<SubscriptionStatus status={subscription.status} />}
        className={cn(s.card, className)}
        classNames={{ extra: s.card__extra }}
      >
        <div className={s.card__description}>{subscriptionItem.product.description || "No description"}</div>
        <div className={s.card__text}>
          {formattedPrice}
          {frequency}
        </div>
      </Card>
    </Link>
  );
};

export default SubscriptionCard;
