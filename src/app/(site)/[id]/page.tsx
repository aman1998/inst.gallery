import React, { cache } from "react";
import { notFound } from "next/navigation";

import SitePageContainer from "@containers/SitePageContainer";

import { IProject } from "@entities/Project/model/types";
import { ESubscriptionPlan } from "@entities/Subscription/model/types";
import { geSubscriptions } from "@entities/Subscription/model/actions";
import { getUserSubscriptionType } from "@entities/Subscription/lib/utils";

import { createClient } from "@shared/config/supabase/server";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { INSTAGRAM_URL, SITE_DESCRIPTION, SITE_NAME } from "@shared/config/appConfig";

import Favicon from "../../../../public/favicon.ico";
import Favicon32 from "../../../../public/favicon-32x32.png";
import Favicon16 from "../../../../public/favicon-16x16.png";
import AppleTouchIcon from "../../../../public/apple-touch-icon.png";

interface Props {
  params: { id: string };
}

const getPageInfo = async (link: string): Promise<IProject | null> => {
  const supabase = createClient();
  const { data, error } = await supabase.from(ESupabaseDB.projects).select("*").eq("link", link).single();

  if (error || !data) return null;

  return data as IProject;
};

const fetchPageInfoCache = cache(getPageInfo);

export async function generateMetadata({ params }: Props) {
  const project = await fetchPageInfoCache(params.id);

  if (!project?.isPublish) {
    return {
      title: `${SITE_NAME} | ${SITE_DESCRIPTION}`,
      description: SITE_DESCRIPTION,
      alternates: {
        canonical: `/${params.id}`,
      },
    };
  }

  // eslint-disable-next-line max-len
  const title = `${project?.meta?.title || SITE_NAME} | ${project?.meta?.description || SITE_DESCRIPTION} | ${SITE_NAME}`;
  const description = project?.meta?.description || SITE_DESCRIPTION;
  const authorName = project?.instagram_id ? `@${project.instagram_id}` : "Unknown author";
  const authorUrl = project?.instagram_id ? `https://www.instagram.com/${project?.instagram_id}` : INSTAGRAM_URL;

  return {
    title,
    description,
    authors: [
      {
        name: authorName,
        url: authorUrl,
      },
    ],
    icons: [
      { rel: "icon", url: project?.user_info?.avatar ?? Favicon.src, sizes: "any", type: "image/png" },
      { rel: "icon", url: project?.user_info?.avatar ?? Favicon32.src, sizes: "32x32", type: "image/png" },
      { rel: "icon", url: project?.user_info?.avatar ?? Favicon16.src, sizes: "16x16", type: "image/png" },
      { rel: "apple-touch-icon", url: project?.user_info?.avatar ?? AppleTouchIcon.src, sizes: "180x180" },
      { rel: "manifest", url: "/site.webmanifest" },
    ],
    creator: authorName,
    publisher: authorName,
    alternates: {
      canonical: `/${params.id}`,
    },
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  if (typeof params.id === "undefined") {
    notFound();
  }

  const project = await fetchPageInfoCache(params.id);

  if (!project || !project.isPublish) {
    notFound();
  }

  const subscriptions = await geSubscriptions(project.email);
  const plan: ESubscriptionPlan = getUserSubscriptionType(subscriptions);

  return <SitePageContainer project={project} plan={plan} />;
};

export default Page;
