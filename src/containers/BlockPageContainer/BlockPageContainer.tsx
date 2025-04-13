"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";
import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";

import { createdBlockSelector } from "@features/Block/CreateBlock/model/selectors";
import { useCreateBlockStore } from "@features/Block/CreateBlock/model/store";

import { useBlockStore } from "@entities/Block/model/store";
import { selectedBlockSelector } from "@entities/Block/model/selectors";
import { projectSelector } from "@entities/Project/model/selectors";
import { useProjectStore } from "@entities/Project/model/store";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import Spinner from "@shared/ui/Spinner";
import AntdProvider, { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { blocksFontFamily } from "@shared/config/fonts";

const BlockWidget = dynamic(() => import("@widgets/Block/components/BlockWidget"), {
  ssr: false,
  loading: () => <Spinner style={{ display: "flex", justifyContent: "center", width: "100%" }} />,
});

const animationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const BlockPageContainer: React.FC = () => {
  const project = useProjectStore(projectSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);

  const createdBlock = useCreateBlockStore(createdBlockSelector);

  const { user } = useUserInfo();
  const { navigation } = useLKLayout();

  const block = navigation === ELKLayoutNavigation.create ? createdBlock : selectedBlock;

  if (!user || !block) return null;

  return (
    <AntdProvider primaryColor={project?.primary_color ?? PRIMARY_COLOR}>
      <AnimatePresence mode="wait">
        <motion.section
          className={blocksFontFamily.className}
          key={block.block_id}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <BlockWidget block={block} />
        </motion.section>
      </AnimatePresence>
    </AntdProvider>
  );
};

export default BlockPageContainer;
