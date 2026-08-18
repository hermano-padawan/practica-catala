import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports a GitHub Pages-ready home page", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<html[^>]+lang=["']ca["']/i);
  assert.match(html, /Practica Català/);
  assert.match(html, /1000(?:<!-- -->)? preguntes publicades/);
  assert.match(html, /B1 i B2 arribaran després/);
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
    if (page !== "cookies") assert.match(legalHtml, /\[posa aquí nom i cognom\]/);
  }
});
