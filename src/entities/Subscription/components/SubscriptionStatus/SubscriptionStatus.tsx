"use client";

import React from "react";
import { Tag } from "antd";

interface Props {
  status: string;
}

interface StatusInfo {
  [key: string]: { color: string; text: string };
}

const StatusInfo: StatusInfo = {
  active: { color: "#1bb672", text: "Active" },
  paid: { color: "#11c574", text: "Paid" },
  completed: { color: "#1fb571", text: "Completed" },
  trialing: { color: "#E0E0EB", text: "Trialing" },
  draft: { color: "#797C7C", text: "Draft" },
  ready: { color: "#797C7C", text: "Ready" },
  canceled: { color: "#797C7C", text: "Canceled" },
  inactive: { color: "#F42566", text: "Inactive" },
  past_due: { color: "#F42566", text: "Past due" },
  paused: { color: "#F79636", text: "Paused" },
  billed: { color: "#F79636", text: "Unpaid invoice" },
};

const SubscriptionStatus: React.FC<Props> = ({ status }) => {
  const { color, text } = StatusInfo[status] ?? { text: status };

  return <Tag color={color}>{text}</Tag>;
};

export default SubscriptionStatus;
