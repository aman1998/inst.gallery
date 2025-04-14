"use client";
import { ConfigProvider, Splitter } from "antd";
import React from "react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import BlockFloatSettings from "@widgets/Block/components/BlockFloatSettings";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";

import AntdProvider, { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./AdvancedCustomizeLayout.module.scss";

const SPLITTER_WIDTH = 60;

interface Props {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const AdvancedCustomizeLayout: React.FC<Props> = ({ className, wrapperClassName, children }) => {
  const project = useProjectStore(projectSelector);

  return (
    <AntdProvider primaryColor={project?.primary_color ?? PRIMARY_COLOR}>
      <AnimatePresence mode="wait">
        <motion.section
          className={wrapperClassName}
          key="advanced"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ display: "flex", height: "100%", width: "100%" }}
        >
          <Splitter className={cn(s.splitter, className)}>
            <Splitter.Panel
              className={s.splitter__left}
              min={SPLITTER_WIDTH}
              max={SPLITTER_WIDTH}
              resizable={false}
              defaultSize={SPLITTER_WIDTH}
            />
            <div className={s.splitter__content}>{children}</div>
            <Splitter.Panel
              className={s.splitter__right}
              min={SPLITTER_WIDTH}
              max={SPLITTER_WIDTH}
              resizable={false}
              defaultSize={SPLITTER_WIDTH}
              style={{ position: "relative" }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: PRIMARY_COLOR,
                  },
                  components: {
                    Button: {
                      colorPrimary: PRIMARY_COLOR,
                      colorLink: PRIMARY_COLOR,
                      defaultColor: PRIMARY_COLOR,
                    },
                  },
                }}
              >
                <BlockFloatSettings />
              </ConfigProvider>
            </Splitter.Panel>
          </Splitter>
        </motion.section>
      </AnimatePresence>
    </AntdProvider>
  );
};

export default AdvancedCustomizeLayout;
