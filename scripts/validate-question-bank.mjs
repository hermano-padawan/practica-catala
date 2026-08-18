import { readFile } from "node:fs/promises";

const directory = new URL("../content/questions/", import.meta.url);
const paths = ["c1.json","c1-ortografia.json","c1-equilibrat-850.json"].map((file) => new URL(file, directory));
const questions = (await Promise.all(paths.map(async (path) => JSON.parse(await readFile(path, "utf8"))))).flat();
const errors = [];
const ids = new Set();
const exactExercises = new Set();

for (const [index, q] of questions.entries()) {
  const at = `questions[${index}]`;
  if (!q.id || ids.has(q.id)) errors.push(`${at}: id absent o duplicat`);
  ids.add(q.id);
  if (!['draft', 'reviewed', 'published', 'rejected'].includes(q.status)) errors.push(`${at}: estat no vàlid`);
  if (!q.prompt?.trim()) errors.push(`${at}: falta l'enunciat`);
  if (q.level !== "C1") errors.push(`${at}: nivell inesperat`);
  if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${at}: calen almenys dues opcions`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) errors.push(`${at}: resposta fora de rang`);
  if (new Set(q.options).size !== q.options.length) errors.push(`${at}: opcions duplicades`);
  if (q.options?.some((option) => option !== option.trim())) errors.push(`${at}: espais sobrers en una opció`);
  if (!q.explanation?.trim()) errors.push(`${at}: falta l'explicació`);
  if (q.explanation?.split("\n").length > 3) errors.push(`${at}: l'explicació supera les tres línies`);
  if (q.explanation?.length > 180) errors.push(`${at}: l'explicació és massa llarga`);
  if (/Aquest exercici treballa|La forma normativa és/.test(q.explanation ?? "")) errors.push(`${at}: explicació genèrica o metalingüística`);
  for (const option of q.options ?? []) {
    for (const word of option.split(/\s+/)) {
      const accents = word.match(/[àèéíòóúÀÈÉÍÒÓÚ]/g)?.length ?? 0;
      if (accents > 1) errors.push(`${at}: l'opció conté un mot amb més d'un accent gràfic: ${word}`);
    }
  }
  const signature = JSON.stringify([q.prompt, q.options]);
  if (exactExercises.has(signature)) errors.push(`${at}: exercici exactament duplicat`);
  exactExercises.add(signature);
  if (q.status === 'published') {
    if (!q.source?.url || !q.source?.locator) errors.push(`${at}: una pregunta publicada necessita font i localitzador`);
    if (!q.reviewedAt || !q.reviewedBy) errors.push(`${at}: una pregunta publicada necessita revisió documentada`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const published = questions.filter((q) => q.status === "published").length;
console.log(`Banc vàlid: ${questions.length} registres; ${published} publicats.`);
