import Link from "next/link";
import { Transaction } from "@paddle/paddle-node-sdk";
import dayjs from "dayjs";

import SubscriptionStatus from "@entities/Subscription/components/SubscriptionStatus";

import { parseMoney } from "@shared/config/paddle/parse-money";
import { getPaymentReason } from "@shared/config/paddle/data-helpers";
import { ROUTES } from "@shared/config/routes";

interface Props {
  subscriptionId: string;
  transactions?: Transaction[];
}

export function SubscriptionPastPaymentsCard({ subscriptionId, transactions }: Props) {
  return (
    <div>
      <div>
        <span className={"text-xl font-medium"}>Payments</span>
        <Link href={ROUTES.subscriptionPaymentsId(subscriptionId)}>View all</Link>
      </div>
      <div>
        {transactions?.slice(0, 3).map((transaction) => {
          const formattedPrice = parseMoney(transaction.details?.totals?.total, transaction.currencyCode);
          return (
            <div key={transaction.id} className={"flex flex-col gap-4 border-border border-b py-6"}>
              <div className={"text-secondary text-base leading-4"}>
                {dayjs(transaction.billedAt ?? transaction.createdAt).format("MMM DD, YYYY")}
              </div>
              <div className={"flex-wrap flex items-center gap-5"}>
                <span className={"font-semibold text-base leading-4"}>{getPaymentReason(transaction.origin)}</span>
                <span className={"text-base leading-6 text-secondary"}>
                  {transaction.details?.lineItems[0].product?.name}
                </span>
              </div>
              <div className={"flex gap-5 items-center flex-wrap"}>
                <div className={"text-base leading-4 font-semibold"}>{formattedPrice}</div>
                <SubscriptionStatus status={transaction.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
