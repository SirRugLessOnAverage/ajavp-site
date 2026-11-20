import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://challenges.cloudflare.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://mudgnaajtolytggksvvq.supabase.co https://*.supabase.co https://i.ytimg.com https://*.youtube.com https://www.googletagmanager.com https://*.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.pt;
  font-src 'self' data:;
  connect-src 'self' https://mudgnaajtolytggksvvq.supabase.co wss://mudgnaajtolytggksvvq.supabase.co https://*.supabase.co https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com https://vitals.vercel-insights.com;
  worker-src 'self' blob:;
  frame-src 'self' https://challenges.cloudflare.com https://www.youtube-nocookie.com https://www.youtube.com https://maps.google.com https://www.google.com https://www.googletagmanager.com;
  frame-ancestors 'none';
  object-src 'none';
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
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mudgnaajtolytggksvvq.supabase.co",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
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
      {
        source: "/quero-ser-socio",
        destination: "/socios",
        permanent: true,
      },
      {
        source: "/admin-alertas",
        destination: "https://gestao.ajavp.pt/direcao/alertas",
        permanent: false,
      },
      {
        source: "/direcao/:path*",
        destination: "https://gestao.ajavp.pt/direcao/:path*",
        permanent: false,
      },
      {
        source: "/direcao",
        destination: "https://gestao.ajavp.pt/direcao",
        permanent: false,
      },
      {
        source: "/socio/:path*",
        destination: "https://gestao.ajavp.pt/socio/:path*",
        permanent: false,
      },
      {
        source: "/socio",
        destination: "https://gestao.ajavp.pt/socio",
        permanent: false,
      },
      {
        source: "/validar/:path*",
        destination: "https://gestao.ajavp.pt/validar/:path*",
        permanent: false,
      },
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
