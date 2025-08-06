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
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/product-images/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during `next build`
  },
};

export default nextConfig;
