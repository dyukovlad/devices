/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev-space.su/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
