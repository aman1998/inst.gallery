import Link from "next/link";
import type { PaymentType, Transaction } from "@paddle/paddle-node-sdk";

import { PaymentMethodDetails } from "@widgets/Subscription/SubscriptionsList/components/payment-method-details";

function findPaymentMethodDetails(transactions?: Transaction[]) {
  const transactionWithPaymentDetails = transactions?.find((transaction) => transaction.payments[0]?.methodDetails);
  const firstValidPaymentMethod = transactionWithPaymentDetails?.payments[0].methodDetails;
  return firstValidPaymentMethod ? firstValidPaymentMethod : { type: "unknown" as PaymentType, card: null };
}

interface Props {
  updatePaymentMethodUrl?: string | null;
  transactions?: Transaction[];
}

export function PaymentMethodSection({ transactions, updatePaymentMethodUrl }: Props) {
  const { type, card } = findPaymentMethodDetails(transactions);
  if (type === "unknown") {
    return null;
  }
  return (
    <div>
      <div>
        <div>
          <div>Payment method</div>
          <PaymentMethodDetails type={type} card={card} />
        </div>
      </div>
    </div>
  );
}
