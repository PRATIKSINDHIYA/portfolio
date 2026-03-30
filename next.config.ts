import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** This app’s folder must be the Turbopack root (parent dirs also have lockfiles → wrong `.next`, ENOENT in dev). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: projectRoot,
  },
  images: {
    qualities: [75, 90, 100],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Prevent flaky filesystem pack cache ENOENT errors on some Windows setups.
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
