import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Alert, Button } from "antd";
import type { PaymentType, Transaction } from "@paddle/paddle-node-sdk";

import { PaymentMethodDetails } from "@widgets/Subscription/SubscriptionsList/components/payment-method-details";

import { TSubscriptionPaddle, TTransaction } from "@entities/Subscription/model/types";
import SubscriptionStatus from "@entities/Subscription/components/SubscriptionStatus";
import { findPaymentMethodDetails } from "@entities/Subscription/lib/utils";

import { parseMoney } from "@shared/config/paddle/parse-money";
import { formattedDate } from "@shared/utils/times";

import CancelSubscription from "../../../../../features/Subscription/CancelSubscription";

import s from "./SubscriptionDetailHeader.module.scss";

interface Props {
  subscription: TSubscriptionPaddle;
  transactions?: TTransaction[];
}

const SubscriptionDetailHeader: React.FC<Props> = ({ subscription, transactions }) => {
  const subscriptionItem = subscription.items[0];

  const price = subscriptionItem.quantity * parseFloat(subscription?.recurringTransactionDetails?.totals.total ?? "0");
  const formattedPrice = parseMoney(price.toString(), subscription.currencyCode);
  const frequency =
    subscription.billingCycle.frequency === 1
      ? `/${subscription.billingCycle.interval}`
      : `every ${subscription.billingCycle.frequency} ${subscription.billingCycle.interval}s`;

  const formattedStartedDate = subscription.startedAt && formattedDate(subscription.startedAt, "MMM dd, yyyy");
  const formattedNextDate = subscription.nextBilledAt && formattedDate(subscription.nextBilledAt, "MMM dd, yyyy");

  const { type, card } = findPaymentMethodDetails(transactions);

  const isCanceled = subscription.scheduledChange || subscription.status === "canceled";

  return (
    <section className={s.detail}>
      {/*{subscriptionItem.product.imageUrl && (*/}
      {/*  <Image src={subscriptionItem.product.imageUrl}
        alt={subscriptionItem.product.name} width={48} height={48} />*/}
      {/*)}*/}
      <div className={s.detail__header}>
        <h1 className={s.detail__name}>{subscriptionItem.product.name}</h1>
        <SubscriptionStatus status={subscription.status} />
        <PaymentMethodDetails type={type} card={card} />

        <div className={s.detail__btns}>
          {subscription?.managementUrls?.updatePaymentMethod && !isCanceled && (
            <Link target={"_blank"} rel="noopener noreferrer" href={subscription?.managementUrls?.updatePaymentMethod}>
              <Button type="primary" size="small">
                Update payment method
              </Button>
            </Link>
          )}

          {!isCanceled && <CancelSubscription subscriptionId={subscription.id} />}
        </div>
      </div>

      <p className={s.detail__price}>
        {formattedPrice} {frequency}
      </p>

      <div className={s.detail__date} style={{ marginBottom: 4 }}>
        Started on: {formattedStartedDate}
      </div>
      <div className={s.detail__date}>
        Next payment: {formattedNextDate}{" "}
        {parseMoney(subscription?.nextTransaction?.details.totals.total, subscription?.currencyCode)}
      </div>
    </section>
  );
};

export default SubscriptionDetailHeader;
