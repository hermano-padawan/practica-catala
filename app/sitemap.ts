import type { MetadataRoute } from "next";
export const dynamic="force-static";

export default function sitemap():MetadataRoute.Sitemap{
  const base="https://practica-catala.online";
  return [
    {url:base+"/",lastModified:new Date("2026-08-18"),changeFrequency:"weekly",priority:1},
    {url:base+"/avis-legal/",lastModified:new Date("2026-08-18"),changeFrequency:"yearly",priority:.2},
    {url:base+"/privacitat/",lastModified:new Date("2026-08-18"),changeFrequency:"yearly",priority:.2},
    {url:base+"/cookies/",lastModified:new Date("2026-08-18"),changeFrequency:"yearly",priority:.2},
  ];
}
