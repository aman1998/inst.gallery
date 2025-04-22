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
  title: "Visualize Your Portfolio in Instagram Style",
  titleLevel: 1,
  subtitle:
    "Create stunning portfolio widgets inspired by Instagram’s aesthetic." +
    "Perfect for showcasing your work, engaging your audience, and building your personal brand" +
    "— all in a clean, minimal format.",

  imageWrapperStyle: {
    borderRadius: 12,
  },
  imageStyle: {},

  posts: [],
  postsSettings,
};

export const MOCK_BLOCK_2_CUSTOMIZATION: ICustomizeBlock2 = {
  title: "Portfolio",
  subtitle: "My works",
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
      children:
        "This site helps you create a clean, Instagram-style widget to showcase your work — no need to upload actual posts (for now).",
    },
    {
      key: "2",
      label: "Do I need to know how to code?",
      children: "Not at all! It's made for creators — no coding required.",
    },
    {
      key: "3",
      label: "Is it free to use?",
      children: "Yes, you can start with a free version. More advanced features are available in the premium plan.",
    },
    {
      key: "4",
      label: "Can I customize my widget?",
      children: "Definitely. Choose from different layouts, tweak colors, and add your own images and text.",
    },
    {
      key: "5",
      label: "How do I share my widget?",
      children:
        "You’ll get a unique link — perfect for your Instagram bio, link-in-bio tools, or anywhere else online.",
    },
    {
      key: "6",
      label: "Can I import my Instagram posts?",
      children:
        "Not yet — but this feature is on the way! Soon, you’ll be able to import your Instagram content with a click.",
    },
  ],

  itemsStyle: {},
};
