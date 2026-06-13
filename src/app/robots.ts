import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Permette a tutti i bot di scansionare il sito pubblico
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // Endpoint interni API (incluso /api/preventivo) – non indicizzabili
          "/_next/",    // Assets interni di Next.js – irrilevanti per i crawler
        ],
      },
    ],
    // Punta i motori di ricerca alla sitemap per la discovery automatica
    sitemap: "https://aldogiuliani.it/sitemap.xml",
  };
}
