import React from "react";
import Link from "next/link";
import { Alert } from "antd";

import ResumeSubscription from "@features/Subscription/ResumeSubscription";

import { TSubscriptionPaddle, TTransaction } from "@entities/Subscription/model/types";

import { formattedDate } from "@shared/utils/times";
import Button from "@shared/ui/Button";

import s from "./SubscriptionDetailAlert.module.scss";

interface Props {
  subscription: TSubscriptionPaddle;
}

const SubscriptionDetailAlert: React.FC<Props> = ({ subscription }) => (
  <>
    {subscription.status === "canceled" ? (
      <Alert
        message="Info"
        description={
          <p>
            This subscription was canceled
            {subscription.canceledAt && `on ${formattedDate(subscription.canceledAt, "MMM dd, yyyy")}`} and is no longer
            active.
          </p>
        }
        type="info"
      />
    ) : subscription.scheduledChange ? (
      <Alert
        message="Warning"
        description={
          <>
            This subscription is scheduled to be canceled on{" "}
            {subscription.scheduledChange && formattedDate(subscription.scheduledChange.effectiveAt, "MMM dd, yyyy")}
            <ResumeSubscription
              subscriptionId={subscription.id}
              link={subscription.managementUrls?.cancel}
              className={s.alert__resume}
            />
          </>
        }
        type="warning"
      />
    ) : null}
  </>
);

export default SubscriptionDetailAlert;
