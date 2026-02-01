import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "res.cloudinary.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
