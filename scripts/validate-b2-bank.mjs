import { readFile } from "node:fs/promises";

const questions = JSON.parse(await readFile(new URL("../content/questions/b2.json", import.meta.url), "utf8"));
const c1 = [
  ...JSON.parse(await readFile(new URL("../content/questions/c1.json", import.meta.url), "utf8")),
  ...JSON.parse(await readFile(new URL("../content/questions/c1-ortografia.json", import.meta.url), "utf8")),
  ...JSON.parse(await readFile(new URL("../content/questions/c1-equilibrat-850.json", import.meta.url), "utf8")),
];
const errors = [], ids = new Set(), signatures = new Set(), semanticSignatures = new Set(), topics = new Map(), examSkills = new Map();
const c1Signatures = new Set(c1.map(q => JSON.stringify([q.prompt, q.options])));
const words = (text) => text.match(/\p{L}+/gu) ?? [];
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
  const semanticSignature = JSON.stringify([q.prompt,[...q.options].sort()]); if (semanticSignatures.has(semanticSignature)) errors.push(`${at}: exercici repetit amb les opcions reordenades`); semanticSignatures.add(semanticSignature);
  if (c1Signatures.has(signature)) errors.push(`${at}: còpia literal d'un exercici C1`);
  const suspicious = [q.prompt, ...q.options].flatMap(text => words(text).filter(word => (word.match(/[áàéèíìóòúù]/gi) ?? []).length > 1));
  if (suspicious.length) errors.push(`${at}: possible paraula amb dos accents: ${suspicious.join(", ")}`);
  if ((q.prompt.match(/\?/g) ?? []).length > 2) errors.push(`${at}: massa preguntes acumulades en un sol enunciat`);
  if (/Quina .+\? (En un text|Revisa la forma|Quina opció permet)/i.test(q.prompt)) errors.push(`${at}: instruccions concatenades`);
  if (q.topic === "lexic" && q.id.startsWith("b2-gen-") && q.options.length !== 2) errors.push(`${at}: el contrast lèxic ha de tenir dues opcions pertinents`);
  if (q.id.startsWith("b2-gen-") && q.topic !== "lexic" && q.options.length < 2) errors.push(`${at}: falten alternatives plausibles`);
  if (!q.examSkill) errors.push(`${at}: falta vincular l'exercici amb una habilitat de la prova B2`);
  if (/^(En aquest exercici|Per practicar la regla|Ara,|Comprova també aquest cas)/i.test(q.prompt)) errors.push(`${at}: inici mecànic o de farciment`);
  if (q.options.some(option => /hanur|una l'|launiversitat|vëina|^[ldn] [A-ZÀ-Ü]|\b(?:el|la|de|per|a)'|['’]\s/iu.test(option))) errors.push(`${at}: distractor artificial detectat`);
  if (q.options.includes("l'universitat") && q.answer === q.options.indexOf("l'universitat")) errors.push(`${at}: apostrofació incorrecta de la universitat`);
  topics.set(q.topic,(topics.get(q.topic)??0)+1);
  examSkills.set(q.examSkill,(examSkills.get(q.examSkill)??0)+1);
}
for (const topic of ["accentuacio","apostrofacio","ortografia","pronoms","verbs","connectors","lexic"]) if (!topics.has(topic)) errors.push(`Falta el tema ${topic}`);
if (questions.length !== 1000) errors.push(`El banc B2 ha de tenir 1.000 exercicis, no ${questions.length}`);
if (questions.some(q=>q.status !== "published")) errors.push("Tots els exercicis B2 de llançament han d'estar publicats");
for (const skill of ["ortografia en context","morfologia nominal","gramàtica en context","transformació de frases","lèxic contextual","formació de paraules"]) if (!examSkills.has(skill)) errors.push(`Falta l'habilitat oficial adaptada: ${skill}`);
const answerSpread = questions.reduce((counts,q) => (counts[q.answer]=(counts[q.answer]??0)+1, counts), {});
if (Object.keys(answerSpread).length < 2) errors.push("Les respostes correctes no estan prou distribuïdes");
const threeOptionAnswers = [0, 1, 2].map(answer => questions.filter(q => q.options.length === 3 && q.answer === answer).length);
if (Math.max(...threeOptionAnswers) - Math.min(...threeOptionAnswers) > 25) errors.push(`Les respostes A/B/C estan desequilibrades: ${threeOptionAnswers.join("/")}`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Banc B2 vàlid: ${questions.length} exercicis publicats i cap còpia literal de C1.`);
console.log(`Distribució: ${[...topics].map(([topic,total])=>`${topic}=${total}`).join(", ")}.`);
console.log(`Posicions correctes: ${Object.entries(answerSpread).map(([answer,total])=>`${answer}=${total}`).join(", ")}.`);
console.log(`Preguntes de tres opcions: A=${threeOptionAnswers[0]}, B=${threeOptionAnswers[1]}, C=${threeOptionAnswers[2]}.`);
console.log(`Habilitats B2: ${[...examSkills].map(([skill,total])=>`${skill}=${total}`).join(", ")}.`);
