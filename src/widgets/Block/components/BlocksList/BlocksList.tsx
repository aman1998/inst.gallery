"use client";
import React from "react";
import { Reorder } from "framer-motion";
import { Empty } from "antd";

import BlockItem from "@widgets/Block/components/BlocksList/components/BlockItem";

import { useBlockStore } from "@entities/Block/model/store";
import { blocksSelector, setBlocksSelector } from "@entities/Block/model/selectors";
import { IBlock } from "@entities/Block/model/types";
import { ESubscriptionPlan } from "@entities/Subscription/model/types";
import { SUBSCRIPTIONS_CONFIG } from "@entities/Subscription/lib/constants";

import { ESupabaseDB } from "@shared/config/supabase/types";
import { createClient } from "@shared/config/supabase/client";
import { useMessage } from "@shared/hooks/useMessage";
import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";

import s from "./BlocksList.module.scss";

const BlocksList: React.FC = () => {
  const blocks = useBlockStore(blocksSelector);
  const setBlocks = useBlockStore(setBlocksSelector);

  const { errorMessage, successMessage, loadingMessage, destroyMessage } = useMessage();
  const { plan } = useSubscriptionsInfo();

  console.log("plan =>", plan);

  const [isDragging, setIsDragging] = React.useState(false);

  const handleReorder = (newOrderBlocks: IBlock[]) => {
    setBlocks(newOrderBlocks);
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleSaveOrder = React.useCallback(async () => {
    setIsDragging(false);
    loadingMessage("Saving order...");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: e } = await supabase.from(ESupabaseDB.projects).update({ blocks }).eq("email", user?.email).select();

    destroyMessage();

    if (e) {
      errorMessage(`Error: ${e.message}`);
    } else {
      successMessage("Success save orders");
    }
  }, [destroyMessage, errorMessage, successMessage, loadingMessage, blocks]);

  React.useEffect(() => {
    if (!isDragging) return;

    const handlePointerUp = () => handleSaveOrder();

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, handleSaveOrder]);

  if (!blocks?.length) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Create block" />;

  const { maxBlocks } = SUBSCRIPTIONS_CONFIG[plan] ?? SUBSCRIPTIONS_CONFIG[ESubscriptionPlan.free];

  return (
    <Reorder.Group className={s.list} axis="y" values={blocks} onReorder={handleReorder}>
      {blocks.map((item, index) => (
        <BlockItem key={item.block_id} item={item} unavailable={maxBlocks <= index} />
      ))}
    </Reorder.Group>
  );
};

export default BlocksList;
