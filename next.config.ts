import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/AI-data-hackathon',
  assetPrefix: '/AI-data-hackathon/',
};

export default nextConfig;
