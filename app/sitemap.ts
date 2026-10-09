import type { MetadataRoute } from "next";
export const dynamic="force-static";

export default function sitemap():MetadataRoute.Sitemap{
  const base="https://practica-catala.online";
  return [
    {url:base+"/",lastModified:new Date("2026-09-24"),changeFrequency:"weekly",priority:1},
    {url:base+"/b2/",lastModified:new Date("2026-09-24"),changeFrequency:"weekly",priority:.9},
  ];
}
