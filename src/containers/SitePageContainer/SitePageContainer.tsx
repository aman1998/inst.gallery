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
  if (!project.blocks.length) return null;

  const { maxBlocks, excludedBlocks, maxUploadPosts, excludedInstagramType } = getSubscriptionsConfig(plan);

  const blocks = isDemo
    ? project.blocks
    : project.blocks
        .slice(0, maxBlocks) // Ограничиваем количество блоков по лимиту подписки
        .reduce((acc, block) => {
          // Пропускаем блоки, если их тип в списке исключённых для текущей подписки
          if (excludedBlocks.includes(block.type)) return acc;

          // Проверка на специфический тип блока (например, блок с Instagram-постами)
          if (isBlock2(block)) {
            // Фильтруем посты по media_type, исключаем нежелательные типы (например, VIDEO, CAROUSEL)
            const filteredPosts = block.customization.posts
              .filter((post) => !excludedInstagramType.includes(post.media_type))
              .slice(0, maxUploadPosts); // Обрезаем по максимальному количеству постов

            // Если после фильтрации постов не осталось — блок не добавляем
            if (filteredPosts.length === 0) return acc;

            // Добавляем блок с обновлёнными постами
            acc.push({
              ...block,
              customization: {
                ...block.customization,
                posts: filteredPosts,
              },
            });
          } else {
            // Если блок не требует фильтрации — просто добавляем его
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
