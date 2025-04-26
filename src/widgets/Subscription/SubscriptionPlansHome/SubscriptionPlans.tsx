"use client";

import React from "react";
import { Card, Button, Switch, Badge, Typography, Row, Col } from "antd";
import { CheckOutlined, CloseOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { ISubscriptionPlan } from "@entities/Subscription/model/types";
import { subscriptionPlans } from "@entities/Subscription/lib/constants";

import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { ROUTES } from "@shared/config/routes";

import s from "./SubscriptionPlans.module.scss";

const { Title, Text } = Typography;

const SubscriptionPlans: React.FC = () => {
  const [isAnnual, setIsAnnual] = React.useState<boolean>(true);

  const router = useRouter();

  const renderPlanCard = (plan: ISubscriptionPlan) => {
    const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const discount = Math.round(((plan.monthlyPrice - plan.annualPrice) / plan.monthlyPrice) * 100);

    return (
      <section key={plan.name}>
        <Badge.Ribbon
          text={plan.isPaused ? "Coming soon" : "Best plan"}
          color={PRIMARY_COLOR}
          style={{ display: plan.popular ? "block" : "none" }}
        >
          <Card className={`${s.planCard} ${plan.popular ? s.popularPlan : ""}`}>
            <div className={s.plan__header}>
              <Title level={3}>{plan.name}</Title>
              <div className={s.priceWrapper}>
                <Text className={s.currency}>$</Text>
                <Title level={1} className={s.price}>
                  {currentPrice}
                </Title>
                <div className={s.pricePeriod}>
                  <Text>/mo</Text>
                  {isAnnual && plan.annualPrice < plan.monthlyPrice && (
                    <Badge
                      className={s.discount}
                      count={`Save ${discount}%`}
                      style={{ backgroundColor: "#f3f3ed", color: " #7b8190" }}
                    />
                  )}
                </div>
              </div>
              <Text type="secondary">{isAnnual ? "Billed annually" : "Billed monthly"}</Text>
            </div>

            <div>
              {plan.mainFeatures.map((feature, index) => (
                <div key={index} className={s.featureRow}>
                  <span>{feature.title}</span>
                  <span>{feature.value}</span>
                </div>
              ))}
            </div>

            <div>
              {plan.detailedFeatures.map((feature, index) => (
                <div key={index} className={s.featureRow}>
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
            </div>

            <Button
              onClick={() => {
                router.push(ROUTES.signIn);
              }}
              disabled={!!plan.isPaused}
              type={plan.buttonType}
              block
              className={s.plans__btn}
            >
              {plan.buttonText}
            </Button>
          </Card>
        </Badge.Ribbon>
      </section>
    );
  };

  return (
    <div className={s.plans}>
      <div className={s.plans__switcher}>
        <Text>Monthly</Text>
        <Switch checked={isAnnual} onChange={setIsAnnual} className={s.billingSwitch} />
        <Text>Annually</Text>
      </div>

      <div className={s.plans__list}>{subscriptionPlans.map(renderPlanCard)}</div>
    </div>
  );
};

export default SubscriptionPlans;
