"use client";

import React from "react";
import { Button } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

import LKLayoutNavigation from "@widgets/layouts/LKLayout/components/LKLayoutNavigation";
import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";
import { LKLayoutContext } from "@widgets/layouts/LKLayout/lib/useLKLayout";
import { DEMO_BLOCKS, DEMO_PROJECT } from "@widgets/layouts/DemoLayout/lib/constants";
import UserInfoWidget from "@widgets/UserInfoWidgetSecondary";

import { useBlockStore } from "@entities/Block/model/store";
import { setBlocksSelector, setSelectedBlockSelector } from "@entities/Block/model/selectors";
import { resetProjectSelector, setProjectSelector } from "@entities/Project/model/selectors";
import { useProjectStore } from "@entities/Project/model/store";
import { EBlockNavigation } from "@entities/Block/model/types";
import { ESubscriptionFrequency, ESubscriptionPlan, TSubscriptionPaddle } from "@entities/Subscription/model/types";

import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";
import { ROUTES } from "@shared/config/routes";
import { SubscriptionsContext } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";
import { TNullable } from "@shared/types/common";

import s from "../LKLayout/LKLayout.module.scss";
import LKLayoutSubNavigation from "../LKLayout/components/LKLayoutSubNavigation";

const CustomizeBlockLayout = dynamic(() => import("../LKLayout/components/CustomizeBlockLayout"), {
  ssr: false,
});

const AdvancedCustomizeWidget = dynamic(() => import("@widgets/AdvancedCustomizeWidget"), {
  ssr: false,
});

// const LKLayoutSubNavigation = dynamic(() => import("@widgets/layouts/LKLayout/components/LKLayoutSubNavigation"), {
//   ssr: false,
//   loading: () => (
//     <div>
//       <Button
//         style={{ width: "100%", height: 60 }}
//         type="text"
//         icon={<ArrowLeftOutlined />}
//         size="large"
//         className={LKLayoutSubNavigationStyles.navigation__btn}
//       >
//         Back
//       </Button>
//       {/*<Divider>Loading</Divider>*/}
//     </div>
//   ),
// });

interface Props {
  children: React.ReactNode;
}

const DemoLayout: React.FC<Props> = ({ children }) => {
  const [isClient, setIsClient] = React.useState(false);
  const [isDemo, setIsDemo] = React.useState(true);
  const [navigation, setNavigation] = React.useState<ELKLayoutNavigation>(ELKLayoutNavigation.main);
  const [subNavigation, setSubNavigation] = React.useState<EBlockNavigation>(EBlockNavigation.blocks);
  const [subscriptions, setSubscription] = React.useState<TNullable<TSubscriptionPaddle[]>>([]);
  const [plan, setPlan] = React.useState<ESubscriptionPlan>(ESubscriptionPlan.business);
  const [frequency, setFrequency] = React.useState<ESubscriptionFrequency>(ESubscriptionFrequency.annual);

  const setBlocks = useBlockStore(setBlocksSelector);
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const setProject = useProjectStore(setProjectSelector);
  const resetProject = useProjectStore(resetProjectSelector);

  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserInfo();

  React.useLayoutEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  React.useEffect(() => {
    if (!isClient) return;

    setBlocks(DEMO_BLOCKS);
    setProject({ project: DEMO_PROJECT, withOriginal: true });
    setSelectedBlock({ block: DEMO_BLOCKS[0], withOriginal: true });
  }, [isClient, setBlocks, setSelectedBlock, setProject]);

  React.useEffect(
    () => () => {
      resetProject();
      setBlocks([]);
      setSelectedBlock(null);
    },
    [resetProject, setBlocks, setSelectedBlock]
  );

  if (pathname === ROUTES.demoSite) return children;

  if (!user) return null;

  return (
    <LKLayoutContext.Provider value={{ navigation, setNavigation, subNavigation, setSubNavigation, isDemo, setIsDemo }}>
      <SubscriptionsContext.Provider value={{ subscriptions, setSubscription, plan, setPlan, frequency, setFrequency }}>
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
                    className={s["layout__user-info"]}
                    ActionComponent={
                      <Button
                        onClick={() => {
                          router.push(ROUTES.home);
                        }}
                        size="small"
                        type="primary"
                      >
                        Go to Home
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
                {navigation === ELKLayoutNavigation.sub && subNavigation === EBlockNavigation.advanced ? (
                  <AdvancedCustomizeWidget>{children}</AdvancedCustomizeWidget>
                ) : (
                  <CustomizeBlockLayout className={s.layout__splitter}>{children}</CustomizeBlockLayout>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </SubscriptionsContext.Provider>
    </LKLayoutContext.Provider>
  );
};

export default DemoLayout;
