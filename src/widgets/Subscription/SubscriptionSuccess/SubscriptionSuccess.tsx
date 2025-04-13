"use client";

import React from "react";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

import { ROUTES } from "@shared/config/routes";

const SubscriptionSuccess: React.FC = () => {
  const [counter, setCounter] = React.useState(5);

  const router = useRouter();

  const redirectUrl = ROUTES.subscriptionPrices;

  React.useEffect(() => {
    if (counter <= 0) return;

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter <= 1) {
      window.location.href = redirectUrl;
    }

    return () => clearInterval(timer);
  }, [counter, redirectUrl]);

  return (
    <Result
      status="success"
      title="Payment Successful!"
      subTitle={
        <div>
          <p>Thank you for your payment. Your transaction has been successfully processed.</p>
          <p>
            You will be redirected in <b>{counter}</b> seconds.
          </p>
        </div>
      }
      extra={[
        <Button size="small" type="primary" onClick={() => router.push(redirectUrl)}>
          Go Now
        </Button>,
      ]}
    />
  );
};

export default SubscriptionSuccess;
