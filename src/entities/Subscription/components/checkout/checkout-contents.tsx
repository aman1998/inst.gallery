"use client";

import React from "react";
import { initializePaddle } from "@paddle/paddle-js";
import type { Environments, Paddle } from "@paddle/paddle-js";
import { useRouter } from "next/navigation";
import { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";

import { ROUTES } from "@shared/config/routes";

interface Props {
  userEmail?: string;
  onClose?: () => void;
  priceId: string;
}

const CheckoutContents = ({ userEmail, onClose, priceId }: Props) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [paddle, setPaddle] = React.useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = React.useState<CheckoutEventsData | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        eventCallback: (event) => {
          if (event.data && event.name) {
            setCheckoutData(event.data);
          }
          if (event.name === "checkout.closed" || event.name === "checkout.error") {
            if (onClose) {
              onClose();
            } else {
              router.push(ROUTES.subscriptionPrices);
            }
          }
        },
        checkout: {
          settings: {
            // displayMode: "inline",
            displayMode: "overlay",
            theme: "light",
            allowLogout: !userEmail,
            frameTarget: "paddle-checkout-frame",
            frameInitialHeight: 450,
            frameStyle: "width: 100%;",
            successUrl: ROUTES.subscriptionCheckoutSuccess,
            showAddDiscounts: false,
          },
        },
      }).then(async (paddle) => {
        if (paddle && priceId) {
          setPaddle(paddle);
          paddle.Checkout.open({
            ...(userEmail && { customer: { email: userEmail } }),
            items: [{ priceId: priceId, quantity: 1 }],
          });
        }
      });
    }
  }, [paddle?.Initialized, priceId, userEmail]);

  React.useEffect(() => {
    if (paddle && priceId && paddle.Initialized) {
      paddle.Checkout.updateItems([{ priceId: priceId, quantity: quantity }]);
    }
  }, [paddle, priceId, quantity]);

  return (
    <div className="paddle">
      {/*<PriceSection checkoutData={checkoutData} quantity={quantity} handleQuantityChange={setQuantity} />*/}
      {/*<div>Payment details</div>*/}
      <div className={"paddle-checkout-frame"} />
    </div>
  );
};

export default CheckoutContents;
