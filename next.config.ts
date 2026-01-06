import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "swiperjs.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.dummyjson.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: 'https', hostname: 'cdn.dummyjson.com', pathname: '/product-images/**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ⭐ Add this Webpack configuration to force the alias resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
