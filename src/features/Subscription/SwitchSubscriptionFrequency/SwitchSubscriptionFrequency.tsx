"use client";
import React from "react";
import cn from "classnames";
import { Switch, Typography } from "antd";

import { ESubscriptionFrequency } from "@entities/Subscription/model/types";

import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";

import s from "./SwitchSubscriptionFrequency.module.scss";
interface Props {
  className?: string;
}
const SwitchSubscriptionFrequency: React.FC<Props> = ({ className }) => {
  const { frequency, setFrequency } = useSubscriptionsInfo();

  return (
    <div className={cn(s.frequency, className)}>
      <Typography.Text>Monthly</Typography.Text>
      <Switch
        checked={frequency === ESubscriptionFrequency.annual}
        onChange={(val) => setFrequency(val ? ESubscriptionFrequency.annual : ESubscriptionFrequency.month)}
        className={s.billingSwitch}
      />
      <Typography.Text>Annually</Typography.Text>
    </div>
  );
};

export default SwitchSubscriptionFrequency;
