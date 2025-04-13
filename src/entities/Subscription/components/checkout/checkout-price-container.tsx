import { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";

import { CheckoutPriceAmount } from "@entities/Subscription/components/checkout/checkout-price-amount";

import { formatMoney } from "@shared/config/paddle/parse-money";

interface Props {
  checkoutData: CheckoutEventsData | null;
}

export function CheckoutPriceContainer({ checkoutData }: Props) {
  const recurringTotal = checkoutData?.recurring_totals?.total;
  return (
    <>
      <div className={"text-base leading-[20px] font-semibold"}>Order summary</div>
      <CheckoutPriceAmount checkoutData={checkoutData} />
      {recurringTotal !== undefined ? (
        <div className={"pt-4 text-base leading-[20px] font-medium text-muted-foreground"}>
          then {formatMoney(checkoutData?.recurring_totals?.total, checkoutData?.currency_code)} monthly
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
