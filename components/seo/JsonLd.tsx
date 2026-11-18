import { SITE_URL } from "@/lib/site";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Associação de Jovens e Adultos de Vilar do Pinheiro",
    alternateName: "AJAVP",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.png`,
    sport: [
      "Futsal",
      "Atletismo",
      "Ténis de Mesa",
      "Duatlo",
      "Badminton",
      "Futebol de Praia",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua 103, n.º 43, Urbanização de Real",
      postalCode: "4485-823",
      addressLocality: "Vilar do Pinheiro",
      addressRegion: "Vila do Conde",
      addressCountry: "PT",
    },
    telephone: "+351917194933",
    email: "geralajavp@gmail.com",
    sameAs: [
      "https://www.instagram.com/ajavp.javip",
      "https://www.facebook.com/ajavp.oficial",
      "https://www.youtube.com/@AJAVP",
    ],
  };
}

function renderJsonLdScript(data: unknown) {
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

export function JsonLd() {
  return renderJsonLdScript(buildOrganizationJsonLd());
}

export interface NewsArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  authorName?: string | null;
  category?: string | null;
}

export function NewsArticleJsonLd({
  title,
  description,
  slug,
  imageUrl,
  publishedAt,
  updatedAt,
  authorName,
  category,
}: NewsArticleJsonLdProps) {
  const absoluteImage = imageUrl.startsWith("http")
    ? imageUrl
    : `${SITE_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    image: [absoluteImage],
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: updatedAt || publishedAt || new Date().toISOString(),
    articleSection: category || "Desporto & Comunidade",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/noticias/${slug}`,
    },
    author: {
      "@type": "Organization",
      name: authorName || "AJAVP — Associação de Jovens e Adultos de Vilar do Pinheiro",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "AJAVP",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/images/logo.png`,
      },
    },
  };

  return renderJsonLdScript(data);
}

export interface SportsEventJsonLdItem {
  name: string;
  startDate: string; // YYYY-MM-DD or ISO
  locationName: string;
  description?: string;
  url?: string;
}

export function SportsEventJsonLd({ events }: { events: SportsEventJsonLdItem[] }) {
  if (!events || events.length === 0) return null;

  const data = events.map((ev) => ({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: ev.name,
    startDate: ev.startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: ev.locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vila do Conde",
        addressRegion: "Porto",
        addressCountry: "PT",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "AJAVP / ADCCVC - XL Jogos Inter-Freguesias",
      url: SITE_URL,
    },
    description: ev.description || `${ev.name} nos XL Jogos Inter-Freguesias de Vila do Conde.`,
    url: ev.url || `${SITE_URL}/jif/futsal`,
  }));

  return renderJsonLdScript(data);
}

export interface FaqJsonLdItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqJsonLdItem[] }) {
  if (!items || items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return renderJsonLdScript(data);
}
