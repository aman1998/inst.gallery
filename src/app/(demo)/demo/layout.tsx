import React from "react";
import { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@shared/config/appConfig";

export const metadata: Metadata = {
  title: `Demo Page | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(`https://${SITE_URL}/demo`),
  icons: [
    { rel: "icon", url: "/images/ronaldo.jpg", sizes: "any", type: "image/x-icon" },
    { rel: "icon", url: "/images/ronaldo.jpg", sizes: "32x32", type: "image/png" },
    { rel: "icon", url: "/images/ronaldo.jpg", sizes: "16x16", type: "image/png" },
    { rel: "apple-touch-icon", url: "/images/ronaldo.jpg", sizes: "180x180" },
    { rel: "manifest", url: "/site.webmanifest" },
  ],
};

const Layout = ({ children }: { children: React.ReactNode }) => children;

export default Layout;
