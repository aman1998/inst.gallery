"use client";

import { useState } from "react";
import { Modal } from "antd";

import { cancelSubscription } from "@entities/Subscription/model/actions";

import Button from "@shared/ui/Button";
import { useMessage } from "@shared/hooks/useMessage";

interface Props {
  subscriptionId: string;
  className?: string;
}

const CancelSubscription = ({ subscriptionId, className }: Props) => {
  const [loading, setLoading] = useState(false);

  const { successMessage, errorMessage } = useMessage();

  const handleCancelSubscription = () => {
    setLoading(true);
    cancelSubscription(subscriptionId)
      .then(() => {
        successMessage("Subscription scheduled to cancel at the end of the billing period.");
        window.location.reload();
      })
      .catch(() => {
        errorMessage("Something went wrong, please try again later.");
      })
      .finally(() => setLoading(false));
  };

  const showConfirmModal = () => {
    Modal.confirm({
      title: "Cancel subscription?",
      content: "This subscription will be scheduled to cancel at the end of the billing period.",
      okText: "Confirm",
      cancelText: "Close",
      cancelButtonProps: { type: "text" },
      okButtonProps: { danger: true, loading },
      onOk: handleCancelSubscription,
    });
  };

  return (
    <Button size="small" danger loading={loading} onClick={showConfirmModal} className={className}>
      Cancel subscription
    </Button>
  );
};

export default CancelSubscription;
