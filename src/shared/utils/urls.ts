import { SITE_FULL_URL } from "../config/appConfig";

// export const getSiteUrl = () => window.location.origin;
export const getSiteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
