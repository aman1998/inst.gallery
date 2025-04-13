"use client";

import React from "react";
import { Skeleton } from "antd";

import { getTransactions } from "@shared/config/paddle/get-transactions";
import { getSubscriptionPaddle } from "@shared/config/paddle/get-subscription";
import { SubscriptionDetailResponse, TransactionResponse } from "@shared/types/paddle";

import SubscriptionDetailAlert from "./components/SubscriptionDetailAlert";
import SubscriptionDetailHeader from "./components/SubscriptionDetailHeader";
import s from "./SubscriptionDetail.module.scss";

interface Props {
  id: string;
}

const SubscriptionDetail: React.FC<Props> = ({ id }) => {
  const [loading, setLoading] = React.useState(true);
  const [subscription, seTSubscriptionPaddle] = React.useState<SubscriptionDetailResponse>();
  const [transactions, setTransactions] = React.useState<TransactionResponse>();

  React.useEffect(() => {
    (async () => {
      const [subscriptionResponse, transactionsResponse] = await Promise.all([
        getSubscriptionPaddle(id),
        getTransactions(id, ""),
      ]);

      if (subscriptionResponse) {
        seTSubscriptionPaddle(subscriptionResponse);
      }

      if (transactionsResponse) {
        setTransactions(transactionsResponse);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <Skeleton />;
  }

  if (subscription?.data && transactions?.data) {
    return (
      <section className={s.detail}>
        <SubscriptionDetailAlert subscription={subscription.data} />
        <SubscriptionDetailHeader subscription={subscription.data} transactions={transactions.data} />

        {/*<SubscriptionPastPaymentsCard transactions={transactions.data} subscriptionId={id} />*/}
        {/*<SubscriptionLineItems subscription={subscription.data} />*/}
      </section>
    );
  }

  return <div>Something went wrong, please try again later.</div>;
};

export default SubscriptionDetail;
