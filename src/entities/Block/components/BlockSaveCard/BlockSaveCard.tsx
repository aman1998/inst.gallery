import React from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import { Flex } from "antd";

import Button from "@shared/ui/Button";

import s from "./BlockSaveCard.module.scss";

interface Props {
  className?: string;
  onSave: () => void;
  saveText?: string;
  onReset: () => void;
  resetText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}
const BlockSaveCard: React.FC<Props> = ({
  className,
  onSave,
  saveText = "Save",
  onReset,
  resetText = "Reset",
  isLoading,
  isDisabled,
}) => (
  <motion.div
    key="default"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(s.card, className)}
  >
    <Flex justify="space-between" gap={8} className={s.card__btns}>
      <Button
        disabled={isDisabled || isLoading}
        loading={isLoading}
        size="large"
        className={cn(s.card__btn, (isDisabled || isLoading) && s["card__btn--disabled"])}
        type="primary"
        onClick={onSave}
      >
        {saveText}
      </Button>
      <Button size="large" className={s.card__btn} type="default" onClick={onReset}>
        {resetText}
      </Button>
    </Flex>
  </motion.div>
);

export default BlockSaveCard;
