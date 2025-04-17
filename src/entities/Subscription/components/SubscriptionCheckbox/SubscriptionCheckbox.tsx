"use client";

import React from "react";
import cn from "classnames";
import { Badge, Typography } from "antd";

import Checkbox from "@shared/ui/Checkbox";
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
  isPaused?: boolean;
}

const SubscriptionCheckbox: React.FC<Props> = ({
  checked,
  setChecked,
  title,
  monthPrice,
  annualPrice,
  discount,
  isActive,
  isPaused,
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
    {isPaused && <Badge count="Soon" style={{ backgroundColor: "#8c8c8c" }} />}

    <div className={s.block__end}>
      <Typography.Text strong>{monthPrice} / mo</Typography.Text>
      <Typography.Text strong>{annualPrice} / year</Typography.Text>
    </div>
  </div>
);

export default SubscriptionCheckbox;
