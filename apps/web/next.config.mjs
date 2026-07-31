/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/registry/**',
      },
      // In a real production scenario, you would also add your production registry domain here
      {
        protocol: 'https',
        hostname: 'media.sectloom.dpdns.org',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/registry/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
        ],
      },
    ];
  },
  transpilePackages: ["@sectloom/components", "@sectloom/tokens", "@sectloom/contracts", "@sectloom/registry"],
};

export default nextConfig;
