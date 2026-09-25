import { readFile, writeFile } from "node:fs/promises";

const directory = new URL("../content/questions/", import.meta.url);
const files = ["c1.json", "c1-ortografia.json", "c1-equilibrat-850.json"];
const banks = await Promise.all(files.map(async file => ({
  file,
  questions: JSON.parse(await readFile(new URL(file, directory), "utf8")),
})));

let threeIndex = 0;
let twoIndex = 0;
for (const bank of banks) {
  bank.questions = bank.questions.map(question => {
    const correct = question.options[question.answer];
    const target = question.options.length === 3 ? threeIndex++ % 3 : twoIndex++ % 2;
    const current = question.options.indexOf(correct);
    const shift = (current - target + question.options.length) % question.options.length;
    const options = question.options.map((_, index) => question.options[(index + shift) % question.options.length]);
    return { ...question, options, answer: options.indexOf(correct) };
  });
  await writeFile(new URL(bank.file, directory), `${JSON.stringify(bank.questions, null, 2)}\n`);
}

console.log(`Respostes C1 equilibrades: ${threeIndex} exercicis de tres opcions i ${twoIndex} de dues.`);
