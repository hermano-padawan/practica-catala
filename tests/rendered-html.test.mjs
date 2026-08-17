import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports a GitHub Pages-ready home page", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<html[^>]+lang=["']ca["']/i);
  assert.match(html, /Practica Català/);
  assert.match(html, /\/practica-catala\/_next\//);
});
