import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.dummyjson.com", "swiperjs.com"], // ✅ Add this line
  },
};

export default nextConfig;
