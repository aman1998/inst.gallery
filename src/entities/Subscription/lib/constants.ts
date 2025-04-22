import { ESubscriptionFrequency, ESubscriptionPlan, ISubscriptionPlan } from "@entities/Subscription/model/types";
import { EBlockType } from "@entities/Block/model/types";
import { EInstagramType } from "@entities/Instagram/model/types";

export const FREE_MONTH_ID = "pri_01jewzhcapegr1zn1dm9k2mm40";
export const FREE_YEAR_ID = "pri_01jewzk29vs7hnvwfbdb02qbpv";

export const PERSONAL_MONTH_ID = "pri_01jbp7ysehe5xgxkgt5cq1ybjz";
export const PERSONAL_YEAR_ID = "pri_01jbp7z50e61p65ca5bzbazq0q";

export const BUSINESS_MONTH_ID = "pri_01jbp80n4z882b6zpjdj2mdbca";
export const BUSINESS_YEAR_ID = "pri_01jbp7zz06bkh724t16z39ftxk";

export const freeIds = [FREE_MONTH_ID, FREE_MONTH_ID];
export const personalIds = [PERSONAL_MONTH_ID, PERSONAL_MONTH_ID];
export const businessIds = [BUSINESS_MONTH_ID, BUSINESS_YEAR_ID];

export const PERSONAL_MONTHLY_PRICE = 10;
export const PERSONAL_ANNUAL_PRICE = 6;

export const BUSINESS_MONTHLY_PRICE = 15;
export const BUSINESS_ANNUAL_PRICE = 8;

export const PRO_BLOCKS = [] as EBlockType[];
export const PERSONAL_BLOCKS = [EBlockType.type4] as EBlockType[];

export const FREE_MAX_POSTS = 6;
export const PERSONAL_MAX_POSTS = 60;

export const FREE_MAX_BLOCKS = 1;
export const PERSONAL_MAX_BLOCKS = 5;

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    name: "Free",
    type: ESubscriptionPlan.free,
    monthlyPrice: 0,
    annualPrice: 0,
    mainFeatures: [
      { title: "Works", value: FREE_MAX_POSTS },
      // { title: "Blocks", value: FREE_MAX_BLOCKS },
      { title: "Image", value: "Single" },
      // { title: "Widget type", value: "Basic" },
    ],
    detailedFeatures: [
      { title: "Priority support", included: false },
      { title: "No service branding", included: false },
      { title: "Analytics", included: false },
    ],
    buttonText: "Get Started",
    buttonType: "default",
    priceId: { [ESubscriptionFrequency.month]: FREE_MONTH_ID, [ESubscriptionFrequency.annual]: FREE_YEAR_ID },
  },
  {
    name: "Personal",
    type: ESubscriptionPlan.personal,
    monthlyPrice: PERSONAL_MONTHLY_PRICE,
    annualPrice: PERSONAL_ANNUAL_PRICE,
    mainFeatures: [
      { title: "Works", value: PERSONAL_MAX_POSTS },
      // { title: "Blocks", value: PERSONAL_MAX_BLOCKS },
      { title: "Image", value: "Single | Carousel | Video" },
      // { title: "Widget type", value: "Advanced" },
    ],
    detailedFeatures: [
      { title: "Priority support", included: true },
      { title: "No service branding", included: true },
      { title: "Analytics", included: true },
    ],
    buttonText: "Get Started",
    buttonType: "default",
    popular: true,
    isPaused: true,
    priceId: { [ESubscriptionFrequency.month]: PERSONAL_MONTH_ID, [ESubscriptionFrequency.annual]: PERSONAL_YEAR_ID },
  },
  // {
  //   name: "Business",
  //   type: ESubscriptionPlan.business,
  //   monthlyPrice: BUSINESS_MONTHLY_PRICE,
  //   annualPrice: BUSINESS_ANNUAL_PRICE,
  //   mainFeatures: [
  //     { title: "Works", value: 100 },
  //     { title: "Image", value: " Image | Carousel | Video" },
  //   ],
  //   detailedFeatures: [
  //     { title: "Multiple Instagram accounts", included: true },
  //     { title: "Priority support", included: true },
  //     { title: "Analytics", included: true },
  //   ],
  //   buttonText: "Get Started",
  //   buttonType: "primary",
  //   popular: false,
  //   priceId: {
  //     [ESubscriptionFrequency.month]: BUSINESS_MONTH_ID,
  //     [ESubscriptionFrequency.annual]: BUSINESS_YEAR_ID,
  //   },
  // },
];

export const SUBSCRIPTIONS_CONFIG = {
  [ESubscriptionPlan.free]: {
    maxBlocks: FREE_MAX_BLOCKS,
    excludedBlocks: [...PRO_BLOCKS, ...PERSONAL_BLOCKS],
    maxUploadPosts: FREE_MAX_POSTS,
    excludedInstagramType: [EInstagramType.CAROUSEL_ALBUM, EInstagramType.VIDEO],
    withAnimation: false,
  },
  [ESubscriptionPlan.personal]: {
    maxBlocks: PERSONAL_MAX_BLOCKS,
    excludedBlocks: PRO_BLOCKS,
    maxUploadPosts: PERSONAL_MAX_POSTS,
    excludedInstagramType: [EInstagramType.VIDEO],
    withAnimation: true,
  },
  [ESubscriptionPlan.business]: {
    maxBlocks: 10,
    excludedBlocks: [] as EBlockType[],
    maxUploadPosts: 100,
    excludedInstagramType: [] as EInstagramType[],
    withAnimation: true,
  },
};
