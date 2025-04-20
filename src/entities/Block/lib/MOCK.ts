import {
  EPostsListType,
  ICustomizeAdvanced,
  ICustomizeBlock1,
  ICustomizeBlock2,
  ICustomizeBlock4,
  ICustomizeButton,
  ICustomizePosts,
} from "@entities/Block/model/customizeTypes";

import { INSTAGRAM_URL } from "@shared/config/appConfig";

const buttonSettings: ICustomizeButton = {
  buttonVisible: true,
  buttonLink: INSTAGRAM_URL,
  buttonType: "default",
  buttonTab: "new",
  buttonText: "Contact me",
  buttonSize: "middle",
  buttonStyle: {},
  buttonColor: "rgb(207, 106, 106)",
  buttonWithArrow: true,
};

const advancedSettings: ICustomizeAdvanced = {
  withBg: true,
  bgColor: "rgb(105, 54, 54)",
  textColor: "rgb(207, 106, 106)",
  isReverse: false,
  isColumn: false,
};

const postsSettings: ICustomizePosts = {
  postsWithBg: true,
  postsLength: 6,
  postsType: EPostsListType.gallery,
  postsStyle: {
    gap: 8,
  },
};

export const MOCK_BLOCK_1_CUSTOMIZATION: ICustomizeBlock1 = {
  advancedSettings,
  buttonSettings,

  headerStyle: {
    alignItems: "center",
  },
  title: "Visualize Your Instagram posts",
  titleLevel: 1,
  subtitle:
    "Upload your Instagram posts and turn them into stunning landing pages in seconds. " +
    "Showcase your content, engage your audience, and grow your brand effortlessly.",

  imageWrapperStyle: {
    borderRadius: 12,
  },
  imageStyle: {},

  posts: [],
  postsSettings,
};

export const MOCK_BLOCK_2_CUSTOMIZATION: ICustomizeBlock2 = {
  description: "My works",
  imageWrapperStyle: {
    borderRadius: 12,
  },
  imageStyle: {},

  posts: [],
  postsSettings: {
    postsWithBg: true,
    postsLength: 3,
    postsType: EPostsListType.grid,
    postsStyle: {
      gap: 12,
    },
  },
};

export const MOCK_BLOCK_4_CUSTOMIZATION: ICustomizeBlock4 = {
  advancedSettings: { ...advancedSettings, withBg: false, textColor: "#2D2D2D" },
  buttonSettings: { ...buttonSettings, buttonVisible: false },

  headerStyle: {
    alignItems: "center",
  },
  title: "Facts & Questions",
  titleLevel: 2,
  subtitle: "",

  items: [
    {
      key: "1",
      label: "What is this site about?",
      children: "This site allows you to turn your Instagram posts into beautiful landing pages in just a few clicks.",
    },
    {
      key: "2",
      label: "Do I need to know how to code?",
      children: "Not at all! Our tool is designed for creators and influencers — no coding required.",
    },
    {
      key: "3",
      label: "Is it free to use?",
      children: "Yes, you can create a basic landing page for free. For more features, we offer a premium plan.",
    },
    {
      key: "4",
      label: "Can I customize my landing page?",
      children: " Absolutely. You can choose layouts, colors, and add your own content.",
    },
    {
      key: "5",
      label: "How do I share my landing page?",
      children: "Each landing page gets a unique URL you can share anywhere — Instagram bio, stories, or messages.",
    },
  ],
  itemsStyle: {},
};
