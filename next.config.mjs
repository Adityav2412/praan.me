/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/founders-message',
        destination: '/founder',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
