import React from "react";
import Head from "next/head";

import BlockWidget from "@widgets/Block/components/BlockWidget";

import { IProject } from "@entities/Project/model/types";
import { ESubscriptionPlan } from "@entities/Subscription/model/types";
import { SUBSCRIPTIONS_CONFIG } from "@entities/Subscription/lib/constants";

import SmoothScrollProvider from "@shared/providers/SmoothScrollProvider";
import { ROUTES } from "@shared/config/routes";
import Button from "@shared/ui/Button";

import s from "./SitePageContainer.module.scss";

interface Props {
  project: IProject;
  plan: ESubscriptionPlan;
}

const SitePageContainer: React.FC<Props> = ({ project, plan }) => {
  if (!project.blocks.length) return null;

  const { maxBlocks, excludedBlocks } = SUBSCRIPTIONS_CONFIG[plan] ?? SUBSCRIPTIONS_CONFIG[ESubscriptionPlan.free];

  const blocks = project.blocks.slice(0, maxBlocks).filter((item) => !excludedBlocks.includes(item.type));

  return (
    <SmoothScrollProvider>
      <div className={s.page}>
        <Head>
          <title>My page title</title>
        </Head>

        <main className={s.main}>
          {blocks.map((item) => (
            <BlockWidget block={item} key={item.block_id} />
          ))}
          {plan === ESubscriptionPlan.free && (
            <Button
              className={s["page__home-btn"]}
              href={ROUTES.home}
              target="_blank"
              type="default"
              style={{ height: 30, fontSize: 12, padding: "0 8px" }}
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
