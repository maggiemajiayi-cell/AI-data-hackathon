import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Sprout_voice_input_AItraining',
  assetPrefix: '/Sprout_voice_input_AItraining/',
};

export default nextConfig;
