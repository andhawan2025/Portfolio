/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for a fully static Cloudflare Pages export
  basePath: "/portfolio", // Forces all routes and assets to serve under /portfolio
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "://unsplash.com",
      },
    ],
  },
}

export default nextConfig
