import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { A11yScript } from "@/components/layout/A11yScript";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajavp.vercel.app"),
  title: {
    default: "AJAVP | Associação de Jovens e Adultos de Vilar do Pinheiro",
    template: "%s | AJAVP",
  },
  description:
    "Associação desportiva, cultural e recreativa de Vilar do Pinheiro, Vila do Conde. Futsal, Atletismo, Ténis de Mesa, Duatlo e XL Jogos Inter-Freguesias (JIF).",
  applicationName: "AJAVP",
  authors: [{ name: "AJAVP", url: "https://ajavp.vercel.app" }],
  keywords: [
    "AJAVP",
    "Vilar do Pinheiro",
    "Vila do Conde",
    "JIF",
    "Jogos Inter-Freguesias",
    "Futsal",
    "Atletismo",
    "Desporto",
    "Associação",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "AJAVP | Associação de Jovens e Adultos de Vilar do Pinheiro",
    description:
      "Desporto, Cultura e Comunidade em Vilar do Pinheiro. Inscrições abertas e resultados em direto dos XL Jogos Inter-Freguesias.",
    url: "https://ajavp.vercel.app",
    siteName: "AJAVP",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "AJAVP Vilar do Pinheiro",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        {/* Folha de Estilos de Acessibilidade & Usabilidade (WCAG 2.1 AA) */}
        <link rel="stylesheet" href="/assets/css/a11y.css" />
        <script src="/assets/js/a11y.js" defer></script>

        {/* Anti-FOUC script for instant theme rendering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-brand-navy focus:text-white dark:focus:bg-amber-400 dark:focus:text-slate-950 focus:font-heading focus:font-bold focus:text-xs focus:shadow-xl"
        >
          Saltar para o conteúdo principal
        </a>
        <Header />
        <main id="conteudo-principal" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <A11yScript />
      </body>
    </html>
  );
}
