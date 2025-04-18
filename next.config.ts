import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'droip.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  }
  /* config options here */
};

export default nextConfig;
