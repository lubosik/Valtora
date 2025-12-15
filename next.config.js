/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Bind to localhost only to avoid permission issues
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig

