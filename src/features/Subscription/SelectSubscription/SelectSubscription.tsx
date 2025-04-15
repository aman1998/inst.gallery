"use client";

import React from "react";
import { type Environments, initializePaddle } from "@paddle/paddle-js";
import { useRouter } from "next/navigation";

import CancelSubscription from "@features/Subscription/CancelSubscription";

import { ESubscriptionFrequency, ESubscriptionPlan } from "@entities/Subscription/model/types";
import SubscriptionCheckbox from "@entities/Subscription/components/SubscriptionCheckbox";
import { subscriptionPlans } from "@entities/Subscription/lib/constants";

import Button from "@shared/ui/Button";
import { TNullable } from "@shared/types/common";
import { usePaddlePrices } from "@shared/hooks/usePaddlePrices";
import { ROUTES } from "@shared/config/routes";
import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";

import s from "./SelectSubscription.module.scss";

interface Props {
  selectedPlan: ESubscriptionPlan;
  setSelectedPlan: (val: ESubscriptionPlan) => void;
}
const SelectSubscriptionPaddle: React.FC<Props> = ({ selectedPlan, setSelectedPlan }) => {
  const [paddle, setPaddle] = React.useState<TNullable<any>>(null);
  const [price, setPrice] = React.useState<TNullable<Record<ESubscriptionFrequency, string>>>(
    subscriptionPlans[1].priceId
  );

  const { frequency, plan, subscriptions } = useSubscriptionsInfo();
  const { prices } = usePaddlePrices(paddle, "US");
  const router = useRouter();

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
      }).then((paddle) => {
        if (paddle) {
          setPaddle(paddle);
        }
      });
    }
  }, []);

  const isCanceled =
    subscriptions?.length &&
    subscriptions?.find((subscription) => subscription.scheduledChange || subscription.status === "canceled");

  return (
    <article className={s.plans}>
      {subscriptionPlans.map((item) => {
        const priceMonthStr = prices[item.priceId[ESubscriptionFrequency.month]];
        const priceAnnualStr = prices[item.priceId[ESubscriptionFrequency.annual]];

        const priceMonth = priceMonthStr ? parseFloat(priceMonthStr.replace(/[^\d.]/g, "")) : null;
        const priceAnnual = priceAnnualStr ? parseFloat(priceAnnualStr.replace(/[^\d.]/g, "")) : null;

        let rawMonthPrice =
          priceMonth ?? (frequency === ESubscriptionFrequency.annual ? item.annualPrice : item.monthlyPrice);
        let rawAnnualPrice =
          priceAnnual ??
          (frequency === ESubscriptionFrequency.annual
            ? Number((item.annualPrice * 12).toFixed(2))
            : Number((item.monthlyPrice * 12).toFixed(2)));

        if (frequency === ESubscriptionFrequency.month) {
          rawAnnualPrice = Number((rawMonthPrice * 12).toFixed(2));
        } else if (frequency === ESubscriptionFrequency.annual) {
          rawMonthPrice = Number((rawAnnualPrice / 12).toFixed(2));
        }

        const formattedMonthPrice = priceMonthStr
          ? priceMonthStr.replace(/[\d.]+/, rawMonthPrice.toFixed(2))
          : `$${rawMonthPrice.toFixed(2)}`;
        const formattedAnnualPrice = priceAnnualStr
          ? priceAnnualStr.replace(/[\d.]+/, rawAnnualPrice.toFixed(2))
          : `$${rawAnnualPrice.toFixed(2)}`;
        const discount = Math.round(((item.monthlyPrice - item.annualPrice) / item.monthlyPrice) * 100);

        return (
          <SubscriptionCheckbox
            key={item.type}
            title={item.name}
            isActive={item.type === plan}
            checked={item.type === selectedPlan}
            setChecked={() => {
              setSelectedPlan(item.type);
              setPrice(item.priceId);
            }}
            monthPrice={formattedMonthPrice}
            annualPrice={formattedAnnualPrice}
            discount={frequency === ESubscriptionFrequency.annual ? discount : null}
          />
        );
      })}
      <div className={s.plans__btns}>
        <Button
          size="large"
          type="primary"
          className={s.plans__btn}
          onClick={() => {
            if (!price) return;
            router.push(ROUTES.subscriptionPricesId(price[frequency]));
          }}
        >
          Go to Checkout
        </Button>
        {/* TODO: id*/}
        {!isCanceled && <CancelSubscription className={s.plans__btn} subscriptionId={"sd"} />}
      </div>
    </article>
  );
};

export default SelectSubscriptionPaddle;
