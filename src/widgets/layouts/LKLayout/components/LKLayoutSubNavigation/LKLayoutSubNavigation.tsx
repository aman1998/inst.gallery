import React from "react";
import { Button, Divider } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import cn from "classnames";

import BlocksList from "@widgets/Block/components/BlocksList";
import LkLayoutCustomize from "@widgets/layouts/LKLayout/components/LkLayoutCustomize";
import LkLayoutAdvanced from "@widgets/layouts/LKLayout/components/LkLayoutAdvanced";
import LkLayoutPosts from "@widgets/layouts/LKLayout/components/LkLayoutPosts";
import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";
import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";

import { EBlockNavigation } from "@entities/Block/model/types";
import { useBlockStore } from "@entities/Block/model/store";
import { blocksSelector } from "@entities/Block/model/selectors";
import { getSubscriptionsConfig } from "@entities/Subscription/lib/utils";

import { useSubscriptionsInfo } from "@shared/providers/SubscriptionsProvider/lib/useSubscriptionsInfo";
import { useMessage } from "@shared/hooks/useMessage";

import s from "./LKLayoutSubNavigation.module.scss";

interface Props {
  className?: string;
}
const LKLayoutSubNavigation: React.FC<Props> = ({ className }) => {
  const blocks = useBlockStore(blocksSelector);

  const { subNavigation, setNavigation } = useLKLayout();
  const { errorMessage } = useMessage();

  const { plan } = useSubscriptionsInfo();
  const { maxBlocks } = getSubscriptionsConfig(plan);;

  const handleAddBlock = () => {
    if (maxBlocks <= blocks.length) {
      errorMessage("Blocks length limit reached");
      return;
    } else {
      setNavigation(ELKLayoutNavigation.create);
    }
  };

  const content = React.useMemo(() => {
    {
      switch (subNavigation) {
        case EBlockNavigation.blocks:
          return (
            <div className={s.navigation__blocks}>
              <Divider>Blocks</Divider>
              <Button
                size="large"
                className={s.navigation__add}
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddBlock}
              >
                Add
              </Button>
              <BlocksList />
            </div>
          );

        case EBlockNavigation.customize:
          return <LkLayoutCustomize />;
        case EBlockNavigation.posts:
          return <LkLayoutPosts />;
        case EBlockNavigation.advanced:
          return <LkLayoutAdvanced />;
        default:
          return null;
      }
    }
  }, [subNavigation, setNavigation]);

  return (
    <nav className={cn(s.navigation, className)}>
      <Button
        style={{ width: "100%", height: 60 }}
        type="text"
        icon={<ArrowLeftOutlined />}
        size="large"
        onClick={() => setNavigation(ELKLayoutNavigation.main)}
        className={s.navigation__btn}
      >
        Back
      </Button>
      <div className={s.navigation__content}>{content}</div>
    </nav>
  );
};

export default LKLayoutSubNavigation;
