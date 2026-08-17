import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/practica-catala",
  assetPrefix: "/practica-catala/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
