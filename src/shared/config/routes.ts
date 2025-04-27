export type ID = string | number;

export enum ELink {
  home = "/",
  demoCustomize = "/p/demo",
  demoSite = "/demo",
  prices = "/p/prices",
  blog = "/p/blog",
  privacyPolicy = "/p/privacy",
  termsUse = "/p/terms",
  contacts = "/p/contacts",

  customize = "/customize",
  profile = "/profile",
  posts = "/profile/posts",
  works = "/profile/works",
  error = "/error",

  signIn = "/auth/signIn",
  signUp = "/auth/signUp",
  signUpConfirm = "/auth/signUpConfirm",
  newPassword = "/auth/new-password",
  restoreAuth = "/auth/restore",
  restoreAuthConfirm = "/auth/restoreConfirm",
  callback = "/auth/callback",
  authConfirm = "/auth/confirm",
  authError = "/auth/error",

  subscriptions = "/profile/subscriptions",
  subscriptionPrices = "/profile/subscriptions/prices",
  subscriptionCheckout = "/profile/subscriptions/checkout",
  subscriptionCheckoutSuccess = "/profile/subscriptions/checkout/success",
  subscriptionPayments = "/profile/subscriptions/payments",

  instagram = "/profile/instagram",
  instagramSelectAccount = "/profile/instagram/select",
  instagramCode = "/profile/instagram/code",

  apiWebhook = "/api/webhook",
  apiInstagramUrl = "/api/instagram/url",
  apiInstagramToken = "/api/instagram/token",
  apiInstagramCode = "/api/instagram/code",
  apiInstagramInfo = "/api/instagram/info",
  apiInstagramPosts = "/api/instagram/posts",
  apiInstagramMultipleCode = "/api/instagram/multiple/code",
}

export type TLinks = Record<keyof typeof ELink, ELink>;
export type TRoutes = TLinks & TSingleELink;

export type TSingleELink = {
  siteId: (id: ID) => string;
  instagramId: (id: ID) => string;
  subscriptionId: (id: ID) => string;
  subscriptionPricesId: (id: ID) => string;
  subscriptionPaymentsId: (id: ID) => string;

  apiInstagramInfoId: (id: ID) => string;
  apiInstagramPostsId: (id: ID) => string;
  apiInstagramTokenId: (id: ID) => string;
};

export const ROUTES: TRoutes = {
  home: ELink.home,
  demoCustomize: ELink.demoCustomize,
  demoSite: ELink.demoSite,
  prices: ELink.prices,
  blog: ELink.blog,
  privacyPolicy: ELink.privacyPolicy,
  termsUse: ELink.termsUse,
  contacts: ELink.contacts,

  customize: ELink.customize,
  profile: ELink.profile,
  posts: ELink.posts,
  works: ELink.works,
  error: ELink.error,

  signIn: ELink.signIn,
  signUp: ELink.signUp,
  signUpConfirm: ELink.signUpConfirm,
  newPassword: ELink.newPassword,
  restoreAuth: ELink.restoreAuth,
  restoreAuthConfirm: ELink.restoreAuthConfirm,
  callback: ELink.callback,
  authConfirm: ELink.authConfirm,
  authError: ELink.authError,

  siteId: (id) => `/${id}`,

  subscriptions: ELink.subscriptions,
  subscriptionId: (id: ID) => `${ELink.subscriptions}/${id}`,
  subscriptionPrices: ELink.subscriptionPrices,
  subscriptionPricesId: (id: ID) => `${ELink.subscriptionPrices}/${id}`,
  subscriptionPayments: ELink.subscriptionPayments,
  subscriptionPaymentsId: (id: ID) => `${ELink.subscriptionPayments}/${id}`,
  subscriptionCheckout: ELink.subscriptionCheckout,
  subscriptionCheckoutSuccess: ELink.subscriptionCheckoutSuccess,

  instagram: ELink.instagram,
  instagramSelectAccount: ELink.instagramSelectAccount,
  instagramId: (id) => `${ELink.instagram}/${id}`,
  instagramCode: ELink.instagramCode,

  apiWebhook: ELink.apiWebhook,
  apiInstagramUrl: ELink.apiInstagramUrl,
  apiInstagramToken: ELink.apiInstagramToken,
  apiInstagramCode: ELink.apiInstagramCode,
  apiInstagramInfo: ELink.apiInstagramInfo,
  apiInstagramPosts: ELink.apiInstagramPosts,
  apiInstagramMultipleCode: ELink.apiInstagramMultipleCode,

  apiInstagramInfoId: (id) => `${ELink.apiInstagramInfo}/${id}`,
  apiInstagramPostsId: (id) => `${ELink.apiInstagramPosts}/${id}`,
  apiInstagramTokenId: (id) => `${ELink.apiInstagramToken}/${id}`,
};

export const authRoutes = [
  ROUTES.signIn,
  ROUTES.signUp,
  ROUTES.signUpConfirm,
  ROUTES.restoreAuth,
  ROUTES.restoreAuthConfirm,
  ROUTES.callback,
  ROUTES.authConfirm,
  ROUTES.authError,
  // ROUTES.newPassword,
];

export const publicRoutes = [
  ...authRoutes,
  ROUTES.apiWebhook,
  ROUTES.home,
  ROUTES.demoCustomize,
  ROUTES.demoSite,
  ROUTES.prices,
  ROUTES.blog,
  ROUTES.privacyPolicy,
  ROUTES.termsUse,
  ROUTES.contacts,
];
