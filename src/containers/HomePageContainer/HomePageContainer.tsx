import React from "react";
import dynamic from "next/dynamic";

import BlockFlexWidget from "@widgets/Block/BlockFlexWidget";
import VideoPlayerWidget from "@widgets/VideoPlayerWidget";

import { MOCK_BLOCK_1_CUSTOMIZATION, MOCK_BLOCK_4_CUSTOMIZATION } from "@entities/Block/lib/MOCK";
import { EBlockType } from "@entities/Block/model/types";
import { MOCK_INSTAGRAM_POSTS } from "@entities/Instagram/lib/constants";

import SmoothScrollProvider from "@shared/providers/SmoothScrollProvider";
import { ROUTES } from "@shared/config/routes";
import { PRIMARY_COLOR, SITE_PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";

import s from "./HomePageContainer.module.scss";

// const Parallax = dynamic(() => import("@containers/HomePageContainer/components/Parallax"), {
//   ssr: false,
// });

const SubscriptionPlans = dynamic(() => import("@widgets/Subscription/SubscriptionPlansHome"), {
  ssr: false,
});

const BlockCollapseWidget = dynamic(() => import("@widgets/Block/BlockCollapseWidget"), {
  ssr: false,
});

const HomePageContainer: React.FC = () => (
  <SmoothScrollProvider>
    <div className={s.page}>
      <div>
        <BlockFlexWidget
          classNameWrapper={s.page__block}
          block={{
            type: EBlockType.type1,
            created_at: new Date(),
            block_id: "1",
            customization: {
              ...MOCK_BLOCK_1_CUSTOMIZATION,
              posts: MOCK_INSTAGRAM_POSTS.slice(0, 6),
              advancedSettings: {
                ...MOCK_BLOCK_1_CUSTOMIZATION.advancedSettings,
                withBg: true,
                bgColor: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${SITE_PRIMARY_COLOR})`,
                // bgColor: PRIMARY_COLOR,
                textColor: "var(--white)",
              },
              buttonSettings: {
                ...MOCK_BLOCK_1_CUSTOMIZATION.buttonSettings,
                buttonText: "Start right now",
                buttonLink: ROUTES.customize,
                buttonColor: PRIMARY_COLOR,
                buttonType: "default",
              },
            },
          }}
        />
        <VideoPlayerWidget className={s.page__video} />
      </div>
      <SubscriptionPlans />
      <BlockCollapseWidget
        block={{
          type: EBlockType.type4,
          created_at: new Date(),
          block_id: "4",
          customization: MOCK_BLOCK_4_CUSTOMIZATION,
        }}
      />
    </div>
  </SmoothScrollProvider>
);
export default HomePageContainer;
