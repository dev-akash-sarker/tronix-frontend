import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "swiperjs.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.dummyjson.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.dummyjson.com", pathname: "/product-images/**" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, { dev }) => {
    if (!dev) {
      // Override console.log in production only
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tap("DisableConsoleLog", () => {
            if (typeof window !== "undefined") {
              window.console.log = () => {};
            }
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;
