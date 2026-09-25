import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports a GitHub Pages-ready home page", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<html[^>]+lang=["']ca["']/i);
  assert.match(html, /Practica Català/);
  assert.match(html, /1000(?:<!-- -->)? preguntes publicades/);
  assert.match(html, /Practicar B2/);
  assert.match(html, /href=["']\/b2\/["']/);
  assert.match(html, /(?:href|src)=["']\/_next\//);
  assert.match(html, /https:\/\/practica-catala\.online\//);
  assert.match(html, /property="og:image" content="https:\/\/practica-catala\.online\/social-card\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /rel="icon" href="\/favicon\.svg"/);
  assert.match(html, /rel="apple-touch-icon" href="\/apple-touch-icon\.png"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /EducationalApplication/);
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /Fer 10 preguntes més/);
  assert.match(source, /practica-catala-c1-progress/);
  assert.match(source, /El servei d'urgències funciona/);
  assert.match(html, /Avís legal/);
  assert.equal((await readFile(new URL("../out/CNAME", import.meta.url), "utf8")).trim(), "practica-catala.online");
  for (const page of ["avis-legal", "privacitat", "cookies"]) {
    const legalHtml = await readFile(new URL(`../out/${page}/index.html`, import.meta.url), "utf8");
    assert.match(legalHtml, /practicacatala@atomicmail\.io/);
    if (page !== "cookies") assert.match(legalHtml, /Lluís Jané Viles/);
  }
});

test("exports the complete B2 experience", async () => {
  const html = await readFile(new URL("../out/b2/index.html", import.meta.url), "utf8");
  assert.match(html, /Practica català/);
  assert.doesNotMatch(html, /exercicis B2 revisats/);
  assert.match(html, /canonical[^>]+https:\/\/practica-catala\.online\/b2\//);
  const source = await readFile(new URL("../app/b2/practice.tsx", import.meta.url), "utf8");
  assert.match(source, /practica-catala-b2-progress/);
  for (const topic of ["Accentuació", "Ortografia", "Apostrofació", "Pronoms febles", "Verbs", "Connectors", "Lèxic"]) {
    assert.match(html, new RegExp(topic));
  }
  assert.match(html, /LearningResource/);
  const sitemap = await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /https:\/\/practica-catala\.online\/b2\//);
});
