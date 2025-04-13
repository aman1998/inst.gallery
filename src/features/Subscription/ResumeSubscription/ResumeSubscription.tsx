"use client";

import { useState } from "react";
import { Modal } from "antd";

import { resumeSubscription } from "@entities/Subscription/model/actions";

import Button from "@shared/ui/Button";
import { useMessage } from "@shared/hooks/useMessage";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { TNullable } from "@shared/types/common";

interface Props {
  subscriptionId: string;
  link?: TNullable<string>;
  className?: string;
}

const ResumeSubscription = ({ subscriptionId, link, className }: Props) => {
  const [loading, setLoading] = useState(false);

  const { successMessage, errorMessage, loadingMessage, destroyMessage } = useMessage();

  const handleResumeSubscription = () => {
    setLoading(true);
    loadingMessage("Loading");
    resumeSubscription(subscriptionId)
      .then(() => {
        successMessage("Subscription cancellation has been successfully revoked.");
        window.location.reload();
      })
      .catch((e) => {
        console.log("e =>", e);
        destroyMessage();
        errorMessage("Something went wrong, please try again later.");
      })
      .finally(() => setLoading(false));
  };

  const showConfirmModal = () => {
    Modal.confirm({
      title: "Resume subscription?",
      content: "Your subscription cancellation has been revoked, and it will continue as usual.",
      okText: "Confirm",
      cancelText: "Cancel",
      cancelButtonProps: { type: "text" },
      okButtonProps: { type: "primary", style: { background: PRIMARY_COLOR }, loading },
      onOk: handleResumeSubscription,
    });
  };

  if (link) {
    return (
      <Button onClick={() => window.open(link)} size="small" className={className}>
        Resume subscription
      </Button>
    );
  }

  return (
    <Button size="small" loading={loading} onClick={showConfirmModal} className={className}>
      Resume subscription
    </Button>
  );
};

export default ResumeSubscription;
