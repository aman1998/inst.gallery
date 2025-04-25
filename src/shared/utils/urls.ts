import { SITE_FULL_URL } from "../config/appConfig";

export const getSiteUrl = () => (!!process.env.IS_DEV ? window.location.origin : SITE_FULL_URL);
