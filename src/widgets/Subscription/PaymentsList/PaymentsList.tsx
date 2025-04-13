"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { Transaction } from "@paddle/paddle-node-sdk";

import SubscriptionStatus from "@entities/Subscription/components/SubscriptionStatus";

import { getTransactions } from "@shared/config/paddle/get-transactions";
import { TransactionResponse } from "@shared/types/paddle";
import { parseMoney } from "@shared/config/paddle/parse-money";
import { getPaymentReason } from "@shared/config/paddle/data-helpers";
import { formattedDate } from "@shared/utils/times";

interface Props {
  id?: string;
  height?: number;
  hidePagination?: boolean;
  max?: number;
}
// TODO: need refactoring
const PaymentsList: React.FC<Props> = ({ id = "", height, hidePagination, max }) => {
  const [transactionResponse, setTransactionResponse] = React.useState<TransactionResponse>({
    data: [],
    hasMore: false,
    totalRecords: 0,
    error: undefined,
  });
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const pageSize = 10;

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getTransactions(id, "");
      if (response) {
        setTransactionResponse(response);
      }
      setLoading(false);
    })();
  }, [id]);

  if (!transactionResponse || transactionResponse.error) {
    return <div>error</div>;
  }

  const { data: transactionData, totalRecords } = transactionResponse;

  const columns: TableColumnsType<Transaction> = [
    {
      title: "Invoice number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (invoiceNumber: string) => <div>{invoiceNumber}</div>,
    },
    {
      title: "Date",
      dataIndex: "billedAt",
      key: "billedAt",
      render: (billedAt: string) => (billedAt ? formattedDate(billedAt, "MMM dd, yyyy  h:mm a") : "-"),
    },
    {
      title: <div>Amount</div>,
      dataIndex: "amount",
      key: "amount",
      render: (_, record: Transaction) => {
        const formatted = parseMoney(record.details?.totals?.total, record.currencyCode);
        return <div>{formatted}</div>;
      },
    },
    {
      title: "Plan",
      dataIndex: "description",
      key: "description",
      render: (_, record: Transaction) => (
        <div>
          {/*<span>{getPaymentReason(record.origin)}</span>*/}
          <span>{record.details?.lineItems[0]?.product?.name}</span>
          {record.details?.lineItems && record.details.lineItems.length > 1 && (
            <span>+{record.details.lineItems.length - 1} more</span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <SubscriptionStatus status={status} />,
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={typeof max === "number" ? transactionData?.slice(0, max) : transactionData}
      pagination={
        !hidePagination
          ? {
              current: currentPage,
              pageSize,
              total: totalRecords,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
            }
          : false
      }
      rowKey="id"
      scroll={{ x: "max-content", y: height }}
    />
  );
};

export default PaymentsList;
