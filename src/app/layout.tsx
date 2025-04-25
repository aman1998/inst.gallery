import type { Metadata } from "next";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@shared/styles/globals.scss";

import {
  SITE_CREATOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  INSTAGRAM_URL,
} from "@shared/config/appConfig";
import LocaleProvider from "@shared/providers/LocaleProvider";
import AntdProvider from "@shared/providers/AntdProvider";
import InstagramProvider from "@shared/providers/InstagramProvider/InstagramProvider";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { mainFontFamily } from "@shared/config/fonts";

import Favicon from "../../public/favicon.ico";
import Favicon32 from "../../public/favicon-32x32.png";
import Favicon16 from "../../public/favicon-16x16.png";
import AppleTouchIcon from "../../public/apple-touch-icon.png";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(`https://${SITE_URL}`),
  icons: [
    { rel: "icon", url: Favicon.src, sizes: "any", type: "image/x-icon" },
    { rel: "icon", url: Favicon32.src, sizes: "32x32", type: "image/png" },
    { rel: "icon", url: Favicon16.src, sizes: "16x16", type: "image/png" },
    { rel: "apple-touch-icon", url: AppleTouchIcon.src, sizes: "180x180" },
    { rel: "manifest", url: "/site.webmanifest" },
  ],
  generator: "Next.js",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  keywords: ["Instagram", "Gallery"],
  authors: [{ name: SITE_CREATOR, url: INSTAGRAM_URL }],
  creator: SITE_CREATOR,
  publisher: SITE_CREATOR,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mainFontFamily.className} suppressHydrationWarning>
        <LocaleProvider>
          <AntdProvider primaryColor={PRIMARY_COLOR}>
            <InstagramProvider>{children}</InstagramProvider>
          </AntdProvider>
        </LocaleProvider>
      </body>
      <GoogleAnalytics gaId="G-T8W50755PB" />
    </html>
  );
}
