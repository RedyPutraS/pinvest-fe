// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "pinvestbucket.s3.ap-southeast-2.amazonaws.com",
      "pinvest.oss-ap-southeast-5.aliyuncs.com",
      "images.pexels.com",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  async rewrites() {
    // TODO: Turn off in prod
    return [
      {
        source: "/api/:path*",
        destination: "https://api.pinvest.co.id/api/:path*",
        // destination: "http://127.0.0.1:8000/api/:path*",
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
  },
};
export default config;
