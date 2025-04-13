"use client";

import React from "react";
import cn from "classnames";
import { Badge, Typography } from "antd";

import { ESubscriptionFrequency, ESubscriptionPlan } from "@entities/Subscription/model/types";

import Checkbox from "@shared/ui/Checkbox";
import Button from "@shared/ui/Button";
import { TNullable } from "@shared/types/common";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./SubscriptionCheckbox.module.scss";

interface Props {
  checked: boolean;
  setChecked: (val: boolean) => void;
  title: string;
  monthPrice: React.ReactNode;
  annualPrice: React.ReactNode;
  discount?: TNullable<number>;
  isActive?: boolean;
}

const SubscriptionCheckbox: React.FC<Props> = ({
  checked,
  setChecked,
  title,
  monthPrice,
  annualPrice,
  discount,
  isActive,
}) => (
  <div className={cn(s.block, checked && s["block--active"])} onClick={() => setChecked(!checked)}>
    <Checkbox checked={checked} />
    <Typography.Title level={4} style={{ margin: 0 }}>
      {title}
    </Typography.Title>
    {discount && !isNaN(discount) ? (
      <Badge count={`Save ${discount}%`} style={{ backgroundColor: PRIMARY_COLOR }} />
    ) : null}
    {isActive && <Badge count="Active plan" style={{ backgroundColor: PRIMARY_COLOR }} />}

    <div className={s.block__end}>
      <Typography.Text strong>{monthPrice} / mo</Typography.Text>
      <Typography.Text strong>{annualPrice} / year</Typography.Text>
    </div>
  </div>
);

export default SubscriptionCheckbox;
