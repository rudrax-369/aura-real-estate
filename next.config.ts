import type { NextConfig } from "next";

// Only apply GitHub Pages basePath in production builds
// In local dev (npm run dev), leave basePath empty so images load from /villa.png etc.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // Only prefix with repo name when building for GitHub Pages
  basePath: isProd ? "/aura-real-estate" : "",
  assetPrefix: isProd ? "/aura-real-estate/" : "",

  // Expose basePath to client-side code (used for <img> src prefixing)
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/aura-real-estate" : "",
  },

  // Required for static export
  images: {
    unoptimized: true,
  },

  // GitHub Pages needs trailing slashes
  trailingSlash: true,
};

export default nextConfig;
