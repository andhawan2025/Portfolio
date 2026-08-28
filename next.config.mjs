/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/portfolio",
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
