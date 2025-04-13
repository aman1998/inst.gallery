import { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";

import { CheckoutPriceContainer } from "@entities/Subscription/components/checkout/checkout-price-container";
import { CheckoutLineItems } from "@entities/Subscription/components/checkout/checkout-line-items";
import { CheckoutPriceAmount } from "@entities/Subscription/components/checkout/checkout-price-amount";

interface Props {
  checkoutData: CheckoutEventsData | null;
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export function PriceSection({ checkoutData, handleQuantityChange, quantity }: Props) {
  return (
    <>
      <div className={"hidden md:block"}>
        <CheckoutPriceContainer checkoutData={checkoutData} />
        <CheckoutLineItems
          handleQuantityChange={handleQuantityChange}
          checkoutData={checkoutData}
          quantity={quantity}
        />
      </div>
      <div className={"block md:hidden"}>
        <CheckoutPriceAmount checkoutData={checkoutData} />
        <CheckoutLineItems
          handleQuantityChange={handleQuantityChange}
          checkoutData={checkoutData}
          quantity={quantity}
        />
      </div>
    </>
  );
}
