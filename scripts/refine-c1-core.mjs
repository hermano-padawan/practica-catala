import { readFile, writeFile } from "node:fs/promises";

const path = new URL("../content/questions/c1.json", import.meta.url);
const questions = JSON.parse(await readFile(path, "utf8"));
const artificial = (option) => /una l'|launiversitat|la'història|la'iaia|la'Imma|la'UEFA|el'hiat|la'una|la'o|^l [A-ZÀ-Ü]/iu.test(option);

const refined = questions.map((question) => {
  const correct = question.options[question.answer];
  let options = question.options.filter((option, index) => index === question.answer || !artificial(option));
  if (options.length < 2) {
    const fallback = question.options.find((option, index) => index !== question.answer);
    options = [correct, fallback];
  }
  return {
    ...question,
    options,
    answer: options.indexOf(correct),
    reviewedAt: "2026-09-25",
    reviewedBy: "Codex; revisió C1 i contrast amb la font CPNL",
  };
});

await writeFile(path, `${JSON.stringify(refined, null, 2)}\n`);
console.log(`Nucli C1 depurat: ${refined.length} exercicis.`);
