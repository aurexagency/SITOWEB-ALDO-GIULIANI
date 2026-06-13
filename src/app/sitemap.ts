import { MetadataRoute } from "next";
import { servicesSeo } from "@/config/servicesSeo";

const BASE_URL = "https://aldogiuliani.it";

export default function sitemap(): MetadataRoute.Sitemap {
  // Rotte statiche principali
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/preventivo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Rotte dinamiche dei servizi – generate automaticamente dalle chiavi di configurazione
  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(servicesSeo).map(
    (category) => ({
      url: `${BASE_URL}/servizi/${category}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...serviceRoutes];
}
