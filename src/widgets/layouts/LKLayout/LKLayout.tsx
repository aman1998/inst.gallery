"use client";

import React from "react";
import { Button } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import cn from "classnames";

// eslint-disable-next-line max-len
import LKLayoutSubNavigationStyles from "@widgets/layouts/LKLayout/components/LKLayoutSubNavigation/LKLayoutSubNavigation.module.scss";
import LKLayoutNavigation from "@widgets/layouts/LKLayout/components/LKLayoutNavigation";
import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";
import { LKLayoutContext } from "@widgets/layouts/LKLayout/lib/useLKLayout";
import UserInfoWidget from "@widgets/UserInfoWidgetSecondary";

import { useBlockStore } from "@entities/Block/model/store";
import {
  blocksSelector,
  selectedBlockSelector,
  setBlocksSelector,
  setSelectedBlockSelector,
} from "@entities/Block/model/selectors";
import { IProject } from "@entities/Project/model/types";
import { setProjectSelector } from "@entities/Project/model/selectors";
import { useProjectStore } from "@entities/Project/model/store";
import { EBlockNavigation } from "@entities/Block/model/types";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { createClient } from "@shared/config/supabase/client";
import { useMessage } from "@shared/hooks/useMessage";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { ROUTES } from "@shared/config/routes";

import CreateBlock from "../../../features/Block/CreateBlock";

import s from "./LKLayout.module.scss";

const CustomizeBlockLayout = dynamic(() => import("./components/CustomizeBlockLayout"), {
  ssr: false,
});

const CreateBlockLayout = dynamic(() => import("./components/CreateBlockLayout"), {
  ssr: false,
});

const AdvancedCustomizeWidget = dynamic(() => import("@widgets/AdvancedCustomizeWidget"), {
  ssr: false,
});

const LKLayoutSubNavigation = dynamic(() => import("@widgets/layouts/LKLayout/components/LKLayoutSubNavigation"), {
  ssr: false,
  loading: () => (
    <div>
      <Button
        style={{ width: "100%", height: 60 }}
        type="text"
        icon={<ArrowLeftOutlined />}
        size="large"
        className={LKLayoutSubNavigationStyles.navigation__btn}
      >
        Back
      </Button>
    </div>
  ),
});

interface Props {
  children: React.ReactNode;
}

const LKLayout: React.FC<Props> = ({ children }) => {
  const [isClient, setIsClient] = React.useState(false);
  const [isDemo, setIsDemo] = React.useState(false);
  const [navigation, setNavigation] = React.useState<ELKLayoutNavigation>(ELKLayoutNavigation.main);
  const [subNavigation, setSubNavigation] = React.useState<EBlockNavigation>(EBlockNavigation.blocks);

  const blocks = useBlockStore(blocksSelector);
  const setBlocks = useBlockStore(setBlocksSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const setProject = useProjectStore(setProjectSelector);

  const { user } = useUserInfo();
  const router = useRouter();
  const { errorMessage } = useMessage();

  const fetchBlocks = React.useCallback(async () => {
    if (!user || blocks?.length) {
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase.from(ESupabaseDB.projects).select("*").eq("user_id", user.id);

    if (error) {
      errorMessage(error.message);
      return;
    }

    if (!data || !data?.length || !("blocks" in data[0])) {
      setBlocks([]);
      return;
    }

    const project = data[0] as IProject;
    const { blocks: projectBlocks, ...projectInfo } = project;

    setBlocks(projectBlocks);
    setProject({ project: projectInfo, withOriginal: true });

    if (!selectedBlock && projectBlocks.length) {
      setSelectedBlock({ block: projectBlocks[0], withOriginal: true });
    }
  }, [setBlocks, blocks.length, user, errorMessage, selectedBlock, setSelectedBlock, setProject]);

  React.useLayoutEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  React.useEffect(() => {
    if (!isClient) return;
    fetchBlocks();
  }, [fetchBlocks, isClient]);

  if (!user) return null;

  return (
    <LKLayoutContext.Provider value={{ navigation, setNavigation, subNavigation, setSubNavigation, isDemo, setIsDemo }}>
      <div className={s.layout}>
        <div className={s.layout__sider}>
          <AnimatePresence mode="wait" initial={isClient}>
            {navigation === ELKLayoutNavigation.main && (
              <motion.div
                key={navigation}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <UserInfoWidget
                  className={cn(s["layout__user-info"], "antd-user-card")}
                  ActionComponent={
                    <Button
                      onClick={() => {
                        router.push(ROUTES.profile);
                      }}
                      size="small"
                      type="primary"
                    >
                      Go to Profile
                    </Button>
                  }
                />
                <LKLayoutNavigation className={s.layout__navigation} />
              </motion.div>
            )}
            {navigation === ELKLayoutNavigation.sub && (
              <motion.div
                key={navigation}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className={s.layout__navigation}
                style={{ marginTop: 0, height: "100%" }}
              >
                <LKLayoutSubNavigation />
              </motion.div>
            )}
            {navigation === ELKLayoutNavigation.create && (
              <motion.div
                key={navigation}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <CreateBlock />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              style={{ display: "flex", flex: 1, height: "auto", width: "100%" }}
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {navigation === ELKLayoutNavigation.create ? (
                <CreateBlockLayout className={s.layout__splitter}>{children}</CreateBlockLayout>
              ) : navigation === ELKLayoutNavigation.sub && subNavigation === EBlockNavigation.advanced ? (
                <AdvancedCustomizeWidget>{children}</AdvancedCustomizeWidget>
              ) : (
                <CustomizeBlockLayout className={s.layout__splitter}>{children}</CustomizeBlockLayout>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </LKLayoutContext.Provider>
  );
};

export default LKLayout;
