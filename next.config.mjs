import { join } from "path"; // ✅

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  swcMinify: true,
  skipMiddlewareUrlNormalize: true,
  env: {
    IMAGES_HOST: process.env.IMAGES_HOST,
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGES_HOST,
        port: "",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "http",
        hostname: process.env.IMAGES_HOST,
        port: "",
        pathname: "/storage/v1/**",
      },
    ],
  },

  sassOptions: {
    additionalData: `@import "src/shared/styles/mixins/mixins";`,
    // includePaths: [join(__dirname, "styles")],
  },
};

export default nextConfig;
