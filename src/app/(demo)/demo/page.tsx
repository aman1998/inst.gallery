"use client";
import React from "react";

import SitePageContainer from "@containers/SitePageContainer";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";
import { useBlockStore } from "@entities/Block/model/store";
import { blocksSelector } from "@entities/Block/model/selectors";
import { ESubscriptionPlan } from "@entities/Subscription/model/types";

const Page: React.FC = () => {
  const project = useProjectStore(projectSelector);
  const blocks = useBlockStore(blocksSelector);

  if (!project) return null;

  return <SitePageContainer project={{ ...project, blocks }} plan={ESubscriptionPlan.business} />;
};

export default Page;
