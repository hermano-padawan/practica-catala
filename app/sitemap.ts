import type { MetadataRoute } from "next";
export const dynamic="force-static";

export default function sitemap():MetadataRoute.Sitemap{
  return [{url:"https://hermano-padawan.github.io/practica-catala/",lastModified:new Date("2026-08-18"),changeFrequency:"weekly",priority:1}];
}
