"use client";

import React from "react";
import { CheckOutlined, CloseOutlined, ClockCircleOutlined } from "@ant-design/icons";

import { ESubscriptionPlan } from "@entities/Subscription/model/types";
import { subscriptionPlans } from "@entities/Subscription/lib/constants";

import s from "./SubscriptionInfo.module.scss";

interface Props {
  selectedPlan: ESubscriptionPlan;
}

const SubscriptionInfo: React.FC<Props> = ({ selectedPlan }) => {
  const index = React.useMemo(() => {
    switch (selectedPlan) {
      case ESubscriptionPlan.personal:
        return 1;
      case ESubscriptionPlan.business:
        return 2;

      case ESubscriptionPlan.free:
      default:
        return 0;
    }
  }, [selectedPlan]);

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
          {feature.included === "soon" ? (
            <ClockCircleOutlined />
          ) : feature.included ? (
            <CheckOutlined className={s.includedIcon} />
          ) : (
            <CloseOutlined />
          )}
        </div>
      ))}
    </article>
  );
};

export default SubscriptionInfo;
