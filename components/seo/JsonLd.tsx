import { SITE_URL, EMAIL_GERAL } from "@/lib/site";

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
    email: EMAIL_GERAL,
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
  endDate?: string;
  locationName: string;
  description?: string;
  url?: string;
  image?: string;
  performers?: string[];
}

function computeDefaultEndDate(startDate: string): string {
  const match = startDate.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return startDate;
  const [, y, m, d, hh, mm, ss = "00"] = match;
  const dt = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss)));
  dt.setUTCHours(dt.getUTCHours() + 1);
  return dt.toISOString().slice(0, 19);
}

export function SportsEventJsonLd({ events }: { events: SportsEventJsonLdItem[] }) {
  if (!events || events.length === 0) return null;

  const data = events.map((ev) => {
    const eventUrl = ev.url || `${SITE_URL}/jif/futsal`;
    const eventImage = ev.image
      ? ev.image.startsWith("http")
        ? ev.image
        : `${SITE_URL}${ev.image.startsWith("/") ? "" : "/"}${ev.image}`
      : `${SITE_URL}/assets/images/hero-amalgama.webp`;

    const performers =
      ev.performers && ev.performers.length > 0
        ? ev.performers.map((name) => ({ "@type": "SportsTeam", name }))
        : [{ "@type": "SportsTeam", name: "AJAVP — Associação de Jovens e Adultos de Vilar do Pinheiro" }];

    return {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: ev.name,
      startDate: ev.startDate,
      endDate: ev.endDate || computeDefaultEndDate(ev.startDate),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: [eventImage],
      performer: performers,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: eventUrl,
      },
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
      url: eventUrl,
    };
  });

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
