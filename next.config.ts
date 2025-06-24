import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // e.g. https or http
        hostname: "swiperjs.com", // The domain name
        port: "", // Optional (usually empty for default ports)
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
