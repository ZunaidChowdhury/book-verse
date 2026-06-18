/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // This allows non-https sources if needed
      },
    ],
  },
};

export default nextConfig;
