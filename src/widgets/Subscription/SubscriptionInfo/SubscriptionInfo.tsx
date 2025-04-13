"use client";

import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { ESubscriptionFrequency, ESubscriptionPlan } from "@entities/Subscription/model/types";
import { subscriptionPlans } from "@entities/Subscription/lib/constants";

import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";

import s from "./SubscriptionInfo.module.scss";

const SubscriptionInfo: React.FC = () => {
  const { plan } = useSubscriptionsInfo();

  const index = React.useMemo(() => {
    switch (plan) {
      case ESubscriptionPlan.personal:
        return 1;
      case ESubscriptionPlan.business:
        return 2;

      case ESubscriptionPlan.free:
      default:
        return 0;
    }
  }, [plan]);

  return (
    <article className={s.info}>
      {subscriptionPlans[index]?.mainFeatures.map((feature, index) => (
        <div key={index} className={s.info__item}>
          <span>{feature.title}</span>
          <span>{feature.value}</span>
        </div>
      ))}
      {subscriptionPlans[index]?.detailedFeatures.map((feature, index) => (
        <div key={index} className={s.info__item}>
          <span>{feature.title}</span>
          {feature.included ? <CheckOutlined className={s.includedIcon} /> : <CloseOutlined />}
        </div>
      ))}
    </article>
  );
};

export default SubscriptionInfo;
