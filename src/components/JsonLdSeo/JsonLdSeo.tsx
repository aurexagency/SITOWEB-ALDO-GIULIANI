/**
 * JsonLdSeo – React Server Component
 *
 * Inietta i dati strutturati Schema.org (JSON-LD) per Aldo Giuliani Photography.
 * - NON ha direttiva 'use client': è un puro Server Component.
 * - Non aggiunge runtime JavaScript al bundle del client.
 * - Non causa Hydration Mismatch perché il tag <script> viene reso
 *   lato server ed è completamente statico.
 *
 * Specifiche Schema.org usate:
 *  @type  : ["Photographer", "LocalBusiness"]  → combinazione ufficiale
 *  Ref    : https://schema.org/Photographer
 *           https://schema.org/LocalBusiness
 */

// ---------------------------------------------------------------------------
// Tipizzazione inline – nessuna dipendenza da 'schema-dts' o altri package.
// Garantisce type-safety completa senza appesantire il bundle.
// ---------------------------------------------------------------------------

type AdministrativeArea = {
  "@type": "AdministrativeArea" | "City" | "State";
  name: string;
};

type PostalAddress = {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
};

type GeoCoordinates = {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
};

type ContactPoint = {
  "@type": "ContactPoint";
  contactType: string;
  availableLanguage: string[];
  areaServed: string[];
};

type OfferCatalog = {
  "@type": "OfferCatalog";
  name: string;
  itemListElement: ItemOffered[];
};

type ItemOffered = {
  "@type": "Offer";
  itemOffered: {
    "@type": "Service";
    name: string;
    description: string;
  };
};

type PhotographerSchema = {
  "@context": "https://schema.org";
  "@type": ["Photographer", "LocalBusiness"];
  "@id": string;
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  image?: string;
  logo?: { "@type": "ImageObject"; url: string };
  priceRange: string;
  currenciesAccepted?: string;
  paymentAccepted?: string;
  address: PostalAddress;
  geo?: GeoCoordinates;
  areaServed: (AdministrativeArea | string)[];
  hasOfferCatalog: OfferCatalog;
  contactPoint?: ContactPoint;
  sameAs?: string[];
  knowsAbout?: string[];
  award?: string[];
};

// ---------------------------------------------------------------------------
// Dati strutturati – modifica qui se i dati del brand cambiano.
// ---------------------------------------------------------------------------

const aldoGiulianiSchema: PhotographerSchema = {
  "@context": "https://schema.org",
  "@type": ["Photographer", "LocalBusiness"],

  // Canonical URI univoco per questo schema nel Knowledge Graph di Google
  "@id": "https://aldogiuliani.it/#photographer",

  name: "Aldo Giuliani Photography",
  alternateName: "Aldo Giuliani Fotografo",
  description:
    "Servizi fotografici di lusso per matrimoni ed eventi. Lo stile inconfondibile di Aldo Giuliani tra reportage e alta moda.",
  url: "https://aldogiuliani.it",

  // Contatti
  telephone: "+39 3493566813",
  email: "a.giulianiphoto@gmail.com",

  // Indicatore luxury per Google Shopping / Knowledge Panel
  priceRange: "$$$$",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",

  // Sede operativa – Grosseto, Toscana
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grosseto",
    addressRegion: "Toscana",
    postalCode: "58100",
    addressCountry: "IT",
  },

  // Coordinate geografiche del capoluogo (GR) per le SERP locali
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.7602,
    longitude: 11.1128,
  },

  // Aree di servizio – mix di City e State per copertura granulare
  areaServed: [
    { "@type": "City", name: "Grosseto" },
    { "@type": "City", name: "Firenze" },
    { "@type": "City", name: "Forte dei Marmi" },
    { "@type": "City", name: "Pisa" },
    { "@type": "City", name: "Livorno" },
    { "@type": "City", name: "Roma" },
    { "@type": "City", name: "Milano" },
    { "@type": "State", name: "Tuscany" },
    // Destination Wedding internazionali – generici
    "France",
    "Greece",
    "United Kingdom",
  ],

  // Catalogo servizi
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Aldo Giuliani – Servizi Fotografici",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fotografia di Matrimonio",
          description:
            "Reportage matrimoniale di lusso con luce naturale e stile documentaristico narrativo.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Reportage & Documentario",
          description:
            "Reportage ad alto contrasto per eventi corporate, culturali e sociali.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Moda & Portrait",
          description:
            "Shooting editoriali di moda e ritratti professionali con estetica luxury.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sport Photography",
          description:
            "Fotografia sportiva ad alta velocità: azione, emozione e racconto visivo.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wildlife & Nature",
          description:
            "Fotografia naturalistica e wildlife con attenzione alla luce ambientale e alla narrazione.",
        },
      },
    ],
  },

  // Punto di contatto (lingua e aree coperte)
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Italian", "English"],
    areaServed: ["IT", "FR", "GB", "GR"],
  },

  // Profili social / sameAs
  sameAs: [
    "https://www.instagram.com/aldo_giuliani/",
    "https://www.facebook.com/aldogiuliani",
  ],

  // Competenze per il Knowledge Graph
  knowsAbout: [
    "Wedding Photography",
    "Luxury Photography",
    "Photojournalism",
    "Natural Light Photography",
    "Fashion Photography",
    "Wildlife Photography",
    "Sport Photography",
  ],
};

// ---------------------------------------------------------------------------
// Server Component – nessun hook, nessun effetto client-side.
// ---------------------------------------------------------------------------

export default function JsonLdSeo() {
  return (
    <script
      id="json-ld-photographer"
      type="application/ld+json"
      // dangerouslySetInnerHTML è il metodo sicuro e raccomandato da Next.js
      // per iniettare JSON-LD: il contenuto è completamente sotto nostro controllo
      // e non proviene mai da input utente.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(aldoGiulianiSchema, null, 0),
      }}
    />
  );
}
