import type { MetadataRoute } from "next";
import { site } from "../site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/o-nas`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/kontakt`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
