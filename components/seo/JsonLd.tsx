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

export function JsonLd() {
  const data = buildOrganizationJsonLd();
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
