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

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    name: "Free",
    type: ESubscriptionPlan.free,
    monthlyPrice: 0,
    annualPrice: 0,
    mainFeatures: [
      { title: "Blocks", value: 2 },
      { title: "Instagram Posts", value: 10 },
      // { title: "Cache update", value: "Every 1 hour" },
      { title: "Type", value: " Image" },
    ],
    detailedFeatures: [
      { title: "Multiple Instagram accounts", included: false },
      { title: "Priority support", included: false },
      // { title: "Analytics", included: false },
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
      { title: "Blocks", value: 5 },
      { title: "Instagram Posts", value: 50 },
      { title: "Type", value: " Image | Carousel" },
    ],
    detailedFeatures: [
      { title: "Multiple Instagram accounts", included: true },
      { title: "Priority support", included: true },
      // { title: "Analytics", included: false },
    ],
    buttonText: "Get Started",
    buttonType: "default",
    popular: true,
    priceId: { [ESubscriptionFrequency.month]: PERSONAL_MONTH_ID, [ESubscriptionFrequency.annual]: PERSONAL_YEAR_ID },
  },
  // {
  //   name: "Business",
  //   type: ESubscriptionPlan.business,
  //   monthlyPrice: BUSINESS_MONTHLY_PRICE,
  //   annualPrice: BUSINESS_ANNUAL_PRICE,
  //   mainFeatures: [
  //     { title: "Blocks", value: 10 },
  //     { title: "Instagram Posts", value: 100 },
  //     { title: "Type", value: " Image | Carousel | Video" },
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
    maxBlocks: 2,
    excludedBlocks: [...PRO_BLOCKS, ...PERSONAL_BLOCKS],
    maxUploadPosts: 10,
    excludedInstagramType: [EInstagramType.CAROUSEL_ALBUM, EInstagramType.VIDEO],
    withAnimation: false,
  },
  [ESubscriptionPlan.personal]: {
    maxBlocks: 5,
    excludedBlocks: PRO_BLOCKS,
    maxUploadPosts: 50,
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
