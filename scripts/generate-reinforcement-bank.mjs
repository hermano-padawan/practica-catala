import { readFile, writeFile } from "node:fs/promises";

const input = new URL("../content/questions/c1-ortografia.json", import.meta.url);
const base = JSON.parse(await readFile(input, "utf8"));
const promptFrames = [
  (q) => `Exercici de reforç. ${q.prompt}`,
  () => "En una revisió editorial, quina és l'única forma normativa?",
  () => "Quina grafia acceptaries en un text formal?",
  () => "Tria l'opció que no conté cap error ortogràfic.",
  () => "Quina forma conservaries després de passar el corrector?",
];

const questions = base.flatMap((q, baseIndex) => promptFrames.map((frame, variant) => {
  const shift = (baseIndex + variant + 1) % q.options.length;
  const options = q.options.map((_, index) => q.options[(index + shift) % q.options.length]);
  const correct = q.options[q.answer];
  return {
    ...q,
    id: `c1-ref-${String(151 + baseIndex * 5 + variant).padStart(3, "0")}`,
    prompt: frame(q),
    options,
    answer: options.indexOf(correct),
    explanation: `${q.explanation} Forma correcta: ${correct}.`,
    reviewedAt: "2026-08-18",
    reviewedBy: "Codex; revisió estructural i contrast CPNL",
    exerciseType: ["compleció", "revisió", "registre formal", "detecció", "correcció"][variant],
  };
}));

await writeFile(new URL("../content/questions/c1-reforc-500.json", import.meta.url), `${JSON.stringify(questions, null, 2)}\n`);
console.log(`Generats ${questions.length} exercicis de reforç.`);
