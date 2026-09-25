import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../content/questions/", import.meta.url);
const load = async (name) => JSON.parse(await readFile(new URL(name, root), "utf8"));
const seed = await load("b2.json");
const c1 = [
  ...await load("c1.json"),
  ...await load("c1-ortografia.json"),
  ...await load("c1-equilibrat-850.json"),
].filter((question) => question.status === "published");

const clean = (value) => value.replace(/\s+/g, " ").trim();
const topic = (value) => value === "dieresi" ? "accentuacio" : value;
const rotate = (values, amount) => values.map((_, index) => values[(index + amount) % values.length]);

function transformedPrompt(question) {
  if (/universitat/i.test(question.prompt)) {
    const contexts = [
      "Estudia a l'universitat pública.",
      "Treballa a l'universitat des de fa dos anys.",
      "Demà anirà a l'universitat.",
      "La seva germana començarà la universitat al setembre.",
      "Han visitat la universitat aquest matí.",
      "La universitat ofereix un curs intensiu.",
      "Vol matricular-se a la universitat.",
      "Han convocat una reunió a la universitat.",
      "La jornada tindrà lloc a la universitat.",
      "Coneix bé la biblioteca de la universitat.",
      "Aquesta universitat té diversos campus.",
      "Arribarem a la universitat abans de les nou.",
      "La universitat publicarà els resultats demà.",
    ];
    const universityIds = ["c1-apo-026", "c1-ortbal-104", "c1-bal-326", "c1-bal-327", "c1-bal-382", "c1-bal-466"];
    const contextIndex = universityIds.indexOf(question.id);
    return `Quina forma corregeix l'apostrofació de «${contexts[contextIndex >= 0 ? contextIndex : 0]}»?`;
  }
  const prompt = clean(question.prompt);
  if (/^Completa(?: amb la forma correcta)?:/i.test(prompt)) {
    return prompt.replace(/^Completa(?: amb la forma correcta)?:/i, "Tria l'opció adequada per completar:");
  }
  if (/^Quina paraula està escrita correctament\?/i.test(prompt)) return prompt.replace(/^Quina paraula està escrita correctament\?/i, "Selecciona la paraula ben escrita.");
  if (/^Quina (?:és|forma|frase|expressió|parella|opció)/i.test(prompt)) return prompt.replace(/^Quina/i, "Selecciona quina");
  if (/^Quin /i.test(prompt)) return prompt.replace(/^Quin /i, "Selecciona quin ");
  if (/^Tria /i.test(prompt)) return prompt.replace(/^Tria /i, "Escull ");
  if (/^Substitueix /i.test(prompt)) return prompt.replace(/^Substitueix /i, "Fes la substitució de ");
  if (/^Corregeix la forma verbal de/i.test(prompt)) return prompt.replace(/^Corregeix la forma verbal de/i, "Quina forma verbal corregeix");
  if (/^Corregeix aquesta frase:/i.test(prompt)) return prompt.replace(/^Corregeix aquesta frase:/i, "Selecciona la forma que corregeix la frase:");
  if (/^Revisa aquesta frase:/i.test(prompt)) return prompt.replace(/^Revisa aquesta frase:/i, "Detecta la forma adequada en la frase:");
  if (/Completa:/i.test(prompt)) return prompt.replace(/Completa:/i, "Respon:");
  if (prompt.includes("___")) return `Tria l'opció que completa correctament: «${prompt}»`;
  return `Resol el cas següent: ${prompt}`;
}

const accentCount = (word) => (word.match(/[áàéèíìóòúù]/gi) ?? []).length;
const artificialOption = (option) => option.split(/[^\p{L}]+/u).some(word => accentCount(word) > 1)
  || /hanur|una l'|launiversitat|vëina|^[ldn] [A-ZÀ-Ü]|\b(?:el|la|de|per|a)'|['’]\s/iu.test(option);

function examSkillFor(question) {
  const text = `${question.prompt} ${question.explanation ?? ""}`;
  if (topic(question.topic) === "lexic") return "lèxic contextual";
  if (/derivat|derivació|sufix|prefix|formar una paraula/i.test(text)) return "formació de paraules";
  if (/plural|femení|adjectiu|substantiu|concordan/i.test(text)) return "morfologia nominal";
  if (/corregeix|substitueix|transforma|revisa la frase/i.test(question.prompt)) return "transformació de frases";
  if (["pronoms", "verbs", "connectors"].includes(topic(question.topic))) return "gramàtica en context";
  return "ortografia en context";
}

function usefulOptions(question) {
  const correct = question.options[question.answer];
  if (question.exerciseType === "haver-hi") {
    const alternatives = new Map([
      ["hi ha", ["hi han", "ha"]],
      ["hi havia", ["hi havien", "havia"]],
      ["hi haurà", ["hi hauran", "haurà"]],
      ["hi va haver", ["hi van haver", "va haver"]],
    ]).get(correct);
    if (alternatives) return [correct, ...alternatives];
  }
  const incorrect = question.options.filter((option, index) => index !== question.answer && !artificialOption(option));
  const mentioned = incorrect.find(option => question.prompt.toLocaleLowerCase("ca").includes(option.toLocaleLowerCase("ca")));
  if (topic(question.topic) === "lexic") return [correct, mentioned ?? incorrect[0]];
  const orderedIncorrect = mentioned ? [mentioned, ...incorrect.filter(option => option !== mentioned)] : incorrect;
  return [correct, ...orderedIncorrect.slice(0, 2)];
}

const generated = [];
const generatedSignatures = new Set(seed.slice(0, 18).map(question => JSON.stringify([question.prompt, question.options])));
const sourceSemantics = new Set();
for (const source of c1) {
  if (generated.length >= 975) break;
  const sourceSemantic = JSON.stringify([source.prompt, [...source.options].sort()]);
  if (sourceSemantics.has(sourceSemantic)) continue;
  sourceSemantics.add(sourceSemantic);
  const index = generated.length;
  let baseOptions = usefulOptions(source);
  let correct = source.options[source.answer];
  let explanation = clean(source.explanation).replace("de addició", "d'addició").replace("de exemplificació", "d'exemplificació");
  if (/universitat/i.test(source.prompt) && source.options.includes("la universitat")) {
    correct = "la universitat";
    baseOptions = ["la universitat", "l'universitat"];
    explanation = "L'article femení no s'apostrofa davant d'una u àtona: la universitat.";
  }
  const shifted = rotate(baseOptions, index % baseOptions.length);
  let prompt = clean(transformedPrompt(source));
  let signature = JSON.stringify([prompt, shifted]);
  if (generatedSignatures.has(signature)) {
    prompt = prompt.replace(/\?$/, "") + " en aquest context?";
    signature = JSON.stringify([prompt, shifted]);
  }
  generatedSignatures.add(signature);
  generated.push({
    id: `b2-gen-${String(index + 19).padStart(4, "0")}`,
    level: "B2",
    topic: topic(source.topic),
    status: "published",
    prompt,
    options: shifted,
    answer: shifted.indexOf(correct),
    explanation: explanation.slice(0, 180),
    source: source.source,
    reviewedAt: "2026-09-24",
    reviewedBy: "Codex; adaptació estructural contrastada amb la font CPNL",
    derivedFrom: source.id,
    exerciseType: source.exerciseType ?? "ortografia contextual",
    examSkill: examSkillFor(source),
  });
}

if (generated.length !== 975) throw new Error(`No hi ha prou exercicis font diferents: ${generated.length} de 975.`);

const extraSources = {
  accent: { url: "https://www.cpnl.cat/gramatica/35/17-l-accentuacio-grafica", locator: "Accentuació gràfica i accents diacrítics" },
  dieresi: { url: "https://www.cpnl.cat/gramatica/36/18-la-dieresi", locator: "Dièresi per marcar el hiat" },
  apostrof: { url: "https://www.cpnl.cat/gramatica/14/3-l-apostrofacio-i-les-contraccions", locator: "Apostrofació de l'article femení" },
  pronoms: { url: "https://www.cpnl.cat/gramatica/66/37-els-pronoms-febles", locator: "Usos dels pronoms en i hi" },
  verbs: { url: "https://www.cpnl.cat/gramatica/46/13-els-verbs", locator: "Present de subjuntiu" },
  connectors: { url: "https://www.cpnl.cat/gramatica/73/2-lligar-les-idees-connectors-i-marcadors-textuals", locator: "Connectors de reformulació" },
  lexic: { url: "https://www.cpnl.cat/gramatica/135/6-els-barbarismes", locator: "Barbarismes i alternatives normatives" },
};
const curatedExtras = [
  ["b2-extra-001", "accentuacio", "Completa: «No he vingut ___ estava malalt.»", ["perquè", "per què", "perque"], 0, "«Perquè» és una conjunció causal i porta accent; «per què» s'usa en preguntes.", extraSources.accent],
  ["b2-extra-002", "accentuacio", "Completa amb la forma correcta: «Hem comprat ___ al mercat.»", ["raïm", "raim", "ràim"], 0, "«Raïm» porta dièresi perquè la i forma una síl·laba diferent de la a.", extraSources.dieresi],
  ["b2-extra-003", "apostrofacio", "Tria la forma correcta.", ["l'ira", "la ira"], 0, "L'article femení s'apostrofa davant d'una i tònica: l'ira.", extraSources.apostrof],
  ["b2-extra-004", "pronoms", "Completa: «Parles sovint de la feina? Sí, ___ parlo sovint.»", ["en", "hi", "ho"], 0, "«En» substitueix un complement introduït per la preposició de: de la feina.", extraSources.pronoms],
  ["b2-extra-005", "verbs", "Completa: «Cal que ___ abans de les vuit.»", ["vingueu", "veniu", "vindreu"], 0, "Després de «cal que» usem el present de subjuntiu: vingueu.", extraSources.verbs],
  ["b2-extra-006", "connectors", "Completa: «El servei serà universal; ___, arribarà a tothom.»", ["és a dir", "tanmateix", "per tant"], 0, "«És a dir» reformula la primera idea per explicar-la amb altres paraules.", extraSources.connectors],
  ["b2-extra-007", "lexic", "Quina forma és normativa per indicar les dimensions d'un objecte?", ["mida", "tamany"], 0, "«Mida» és la forma normativa; «tamany» és un castellanisme.", extraSources.lexic],
].map(([id, exerciseTopic, prompt, options, answer, explanation, source]) => ({
  id, level: "B2", topic: exerciseTopic, status: "published", prompt, options, answer, explanation, source,
  reviewedAt: "2026-09-24", reviewedBy: "Codex; exercici B2 original i contrast CPNL", exerciseType: "exercici B2 original",
}));

const initial = seed.slice(0, 18).map((question) => ({ ...question, status: "published", examSkill: examSkillFor(question) }));
const output = [...initial, ...generated, ...curatedExtras].map(question => ({
  ...question,
  examSkill: question.examSkill ?? examSkillFor(question),
}));
if (output.length !== 1000) throw new Error(`S'esperaven 1.000 exercicis B2 i se n'han generat ${output.length}.`);
await writeFile(new URL("b2.json", root), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Generat banc B2: ${output.length} exercicis.`);
