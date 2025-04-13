import { Subscription } from "@paddle/paddle-node-sdk";
import { Fragment } from "react";
import Image from "next/image";

import { parseMoney } from "@shared/config/paddle/parse-money";

interface Props {
  subscription?: Subscription;
}

export function SubscriptionLineItems({ subscription }: Props) {
  return (
    <div>
      <p>Recurring products in this subscription</p>
      <div>
        <div>
          <div className={"flex gap-6 w-full col-span-6"}>
            <span>Amount</span>
            <span>(exc. tax)</span>
          </div>

          {subscription?.recurringTransactionDetails?.lineItems.map((lineItem) => (
            <Fragment key={lineItem.priceId}>
              <div className={"col-span-6 border-border border-b py-6"}>
                <div className={"flex gap-4 items-center"}>
                  <div>
                    {lineItem.product.imageUrl && (
                      <Image src={lineItem.product.imageUrl} width={48} height={48} alt={lineItem.product.name} />
                    )}
                  </div>
                  <div className={"flex flex-col gap-3 px-4"}>
                    <div className={"text-base leading-6 font-semibold"}>{lineItem.product.name}</div>
                    <div className={"text-base leading-6 text-secondary"}>{lineItem.product.description}</div>
                  </div>
                </div>
              </div>
              <div className={"flex gap-6 w-full col-span-6 items-center border-border border-b py-6"}>
                <div className={"col-span-2 w-full text-base leading-4 font-semibold text-secondary"}>
                  {lineItem.quantity}
                </div>
                <div className={"col-span-2 w-full text-base leading-4 font-semibold text-secondary"}>
                  {parseFloat(lineItem.taxRate) * 100}%
                </div>
                <div className={"col-span-2 text-right w-full text-base leading-4 font-semibold text-secondary"}>
                  {parseMoney(lineItem.totals.subtotal, subscription?.currencyCode)}
                </div>
              </div>
            </Fragment>
          ))}
          <div className={"col-span-6"}></div>
          <div className={"flex flex-col w-full col-span-6 pt-6"}>
            <div className={"flex justify-between py-4 pt-0 border-border border-b"}>
              <div className={"col-span-3 w-full text-base leading-4 text-secondary"}>Amount</div>
              <div className={"col-span-3 w-full text-base leading-4 text-right text-secondary"}>
                {parseMoney(subscription?.recurringTransactionDetails?.totals.subtotal, subscription?.currencyCode)}
              </div>
            </div>
            <div className={"flex justify-between py-4 border-border border-b"}>
              <div className={"col-span-3 w-full text-base leading-4 text-secondary"}>Tax</div>
              <div className={"col-span-3 w-full text-base leading-4 text-right text-secondary"}>
                {parseMoney(subscription?.recurringTransactionDetails?.totals.tax, subscription?.currencyCode)}
              </div>
            </div>
            <div className={"flex justify-between py-4 border-border border-b"}>
              <div className={"col-span-3 w-full text-base leading-4 text-secondary"}>Total (Inc. tax)</div>
              <div className={"col-span-3 w-full text-base leading-4 font-semibold text-right"}>
                {parseMoney(subscription?.recurringTransactionDetails?.totals.total, subscription?.currencyCode)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
