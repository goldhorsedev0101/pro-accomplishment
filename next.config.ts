import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'klfjpkpxgrwdqvpozizo.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'zenkoders.com',
      },
    ],
  },
  allowedDevOrigins: [
    'https://dk0hr8rc-3000.uks1.devtunnels.ms/', // your VSCode tunnel / localhost proxy
    'http://localhost:3000', // local dev if frontend/backend are separate ports
  ],
};

export default nextConfig;
