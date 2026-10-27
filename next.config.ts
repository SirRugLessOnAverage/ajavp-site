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
  async rewrites() {
    return [
      { source: "/associacao", destination: "/associacao.html" },
      { source: "/jif", destination: "/jif.html" },
      { source: "/jif-classificacao", destination: "/jif-classificacao.html" },
      { source: "/jif/futsal", destination: "/jif/futsal.html" },
      { source: "/modalidades", destination: "/modalidades.html" },
      { source: "/patrocinadores", destination: "/patrocinadores.html" },
      { source: "/multimedia", destination: "/multimedia.html" },
      { source: "/contactos", destination: "/contactos.html" },
      { source: "/admin-alertas", destination: "/admin-alertas.html" },
      { source: "/acessibilidade", destination: "/acessibilidade.html" },
    ];
  },
};

export default nextConfig;
