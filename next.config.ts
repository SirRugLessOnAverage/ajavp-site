import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://mudgnaajtolytggksvvq.supabase.co https://*.supabase.co;
  font-src 'self' data:;
  connect-src 'self' https://mudgnaajtolytggksvvq.supabase.co wss://mudgnaajtolytggksvvq.supabase.co https://*.supabase.co;
  worker-src 'self' blob:;
  frame-src 'self' https://challenges.cloudflare.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mudgnaajtolytggksvvq.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/jif-classificacao",
        destination: "/jif/classificacao",
        permanent: true,
      },
      {
        source: "/clube",
        destination: "/associacao",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/admin-alertas", destination: "/admin-alertas.html" },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
