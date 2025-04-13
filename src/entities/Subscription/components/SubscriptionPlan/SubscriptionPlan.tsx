"use client";

import React from "react";
import { Tag, type TagProps } from "antd";

import { ESubscriptionPlan } from "@entities/Subscription/model/types";

import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

interface Props extends Partial<TagProps> {
  plan: ESubscriptionPlan;
}

const SubscriptionPlan: React.FC<Props> = ({ plan, ...props }) => (
  <Tag color={PRIMARY_COLOR} {...props}>
    {plan.toUpperCase()}
  </Tag>
);

export default SubscriptionPlan;
