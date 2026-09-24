import { readFile } from "node:fs/promises";

const questions = JSON.parse(await readFile(new URL("../content/questions/b2.json", import.meta.url), "utf8"));
const errors = [], ids = new Set(), signatures = new Set(), topics = new Map();
for (const [index, q] of questions.entries()) {
  const at = `b2[${index}]`;
  if (!q.id || ids.has(q.id)) errors.push(`${at}: id absent o duplicat`); ids.add(q.id);
  if (q.level !== "B2") errors.push(`${at}: el nivell ha de ser B2`);
  if (!["draft","reviewed","published","rejected"].includes(q.status)) errors.push(`${at}: estat no vàlid`);
  if (!q.prompt?.trim()) errors.push(`${at}: falta l'enunciat`);
  if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 3 || new Set(q.options).size !== q.options.length) errors.push(`${at}: calen dues o tres opcions diferents`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) errors.push(`${at}: resposta fora de rang`);
  if (!q.explanation?.trim() || q.explanation.length > 180 || q.explanation.split("\n").length > 3) errors.push(`${at}: explicació absent o massa llarga`);
  if (!q.source?.url?.startsWith("https://www.cpnl.cat/") || !q.source?.locator) errors.push(`${at}: falta una font oficial localitzada`);
  if (!q.reviewedAt || !q.reviewedBy) errors.push(`${at}: falta documentar la revisió`);
  const signature = JSON.stringify([q.prompt,q.options]); if (signatures.has(signature)) errors.push(`${at}: exercici duplicat`); signatures.add(signature);
  topics.set(q.topic,(topics.get(q.topic)??0)+1);
}
for (const topic of ["accentuacio","apostrofacio","pronoms","verbs","connectors","lexic"]) if (!topics.has(topic)) errors.push(`Falta el tema ${topic}`);
if (questions.some(q=>q.status === "published")) errors.push("El lot pilot B2 encara no es pot publicar");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Pilot B2 vàlid: ${questions.length} exercicis revisables; cap de publicat.`);
console.log(`Distribució: ${[...topics].map(([topic,total])=>`${topic}=${total}`).join(", ")}.`);
