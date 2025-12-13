import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {

    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
};

export default nextConfig;
