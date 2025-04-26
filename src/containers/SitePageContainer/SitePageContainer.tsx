import React from "react";
import Head from "next/head";

import BlockBasicWidget from "@/widgets/Block/widgets/BasicWidget";

import { IProject } from "@entities/Project/model/types";
import { ESubscriptionPlan } from "@entities/Subscription/model/types";
import { getSubscriptionsConfig } from "@entities/Subscription/lib/utils";
import { IBlock, isBlock2 } from "@entities/Block/model/types";

import SmoothScrollProvider from "@shared/providers/SmoothScrollProvider";
import { ROUTES } from "@shared/config/routes";
import Button from "@shared/ui/Button";

import s from "./SitePageContainer.module.scss";

interface Props {
  project: IProject;
  plan: ESubscriptionPlan;
  isDemo?: boolean;
}

const SitePageContainer: React.FC<Props> = ({ project, plan, isDemo }) => {
  const { maxBlocks, excludedBlocks, maxUploadPosts, excludedInstagramType } = getSubscriptionsConfig(plan);

  const blocks = isDemo
    ? project.blocks
    : project.blocks
        .slice(0, maxBlocks) // Ограничиваем количество блоков по лимиту подписки
        .reduce((acc, block) => {
          if (excludedBlocks.includes(block.type)) return acc;

          if (isBlock2(block)) {
            const filteredPosts = block.customization.posts
              .filter((post) => !excludedInstagramType.includes(post.media_type))
              .slice(0, maxUploadPosts);

            acc.push({
              ...block,
              customization: {
                ...block.customization,
                posts: filteredPosts,
              },
            });
          } else {
            acc.push(block);
          }

          return acc;
        }, [] as IBlock[]);

  return (
    <SmoothScrollProvider>
      <div className={s.page}>
        <Head>
          <title>My page title</title>
        </Head>

        <main className={s.main}>
          {blocks.map((item) => (
            <BlockBasicWidget project={project} block={item} key={item.block_id} />
          ))}
          {(plan === ESubscriptionPlan.free || isDemo) && (
            <Button
              className={s["page__home-btn"]}
              href={ROUTES.home}
              target="_blank"
              rel="noopener noreferrer"
              type="default"
              style={{ height: 30, fontSize: 14, padding: "0 8px" }}
            >
              Want a page like this?
            </Button>
          )}
        </main>
      </div>
    </SmoothScrollProvider>
  );
};

export default SitePageContainer;
