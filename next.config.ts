import type { NextConfig } from "next";

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
    ];
  },
  async rewrites() {
    return [
      { source: "/jif/futsal", destination: "/jif/futsal.html" },
      { source: "/admin-alertas", destination: "/admin-alertas.html" },
    ];
  },
};

export default nextConfig;
