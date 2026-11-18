import { SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Lexend } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { PwaManager } from "@/components/layout/PwaManager";
import { CookieConsentBanner } from "@/components/privacy/CookieConsentBanner";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-dyslexic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: {
    default: "AJAVP | Associação de Jovens e Adultos de Vilar do Pinheiro",
    template: "%s | AJAVP",
  },
  description:
    "Associação desportiva, cultural e recreativa de Vilar do Pinheiro, Vila do Conde. Futsal, Atletismo, Ténis de Mesa, Duatlo e XL Jogos Inter-Freguesias (JIF).",
  applicationName: "AJAVP",
  authors: [{ name: "AJAVP", url: SITE_URL }],
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
    url: SITE_URL,
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
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning className={`${montserrat.variable} ${inter.variable} ${lexend.variable}`}>
      <head>
        {/* Acessibilidade & Usabilidade (a11y.css em globals.css) */}
        <script id="a11y-core-script" src="/assets/js/a11y.js" defer></script>
        {/* Motor PWA & Service Worker */}
        <script id="pwa-helper-script" src="/assets/js/pwa.js" defer></script>

        {/* Google Consent Mode v2 Default (RGPD / ePrivacy) */}
        <script
          id="google-consent-mode-default"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
              try {
                var consent = localStorage.getItem('ajavp_cookie_consent_v1');
                if (consent === 'granted') {
                  gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                  });
                }
              } catch(e) {}
            `,
          }}
        />

        {/* Google Tag Manager (GTM-WMFCGH89) — carregado em lazyOnload para não bloquear LCP/TBT */}
        <Script
          id="gtm-loader"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WMFCGH89');
            `,
          }}
        />

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
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WMFCGH89"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-brand-navy focus:text-white dark:focus:bg-amber-400 dark:focus:text-slate-950 focus:font-heading focus:font-bold focus:text-xs focus:shadow-xl"
        >
          Saltar para o conteúdo principal
        </a>
        <Header />
        <main id="conteudo-principal" className="flex-1 pb-16 xl:pb-0">{children}</main>
        <Footer />
        <MobileTabBar />
        <WhatsAppWidget />
        <PwaManager />
        <CookieConsentBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}
