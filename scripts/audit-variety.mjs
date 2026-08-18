import { readFile, readdir } from "node:fs/promises";
const dir=new URL("../content/questions/",import.meta.url);
const files=(await readdir(dir)).filter(f=>/^c1.*\.json$/.test(f)).sort();
const questions=(await Promise.all(files.map(async f=>JSON.parse(await readFile(new URL(f,dir),"utf8"))))).flat();
const signatures=new Set(),ids=new Set(),types=new Map(),answers=[0,0,0],errors=[];
for(const q of questions){
  const signature=JSON.stringify([q.prompt,q.options]);
  if(signatures.has(signature)) errors.push("Duplicat exacte: "+q.id);
  if(ids.has(q.id)) errors.push("ID duplicat: "+q.id);
  signatures.add(signature); ids.add(q.id);
  const type=q.exerciseType??"pregunta contextual";
  types.set(type,(types.get(type)??0)+1);
  answers[q.answer]=(answers[q.answer]??0)+1;
}
if(questions.length!==1000) errors.push("Total inesperat: "+questions.length);
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log("Auditoria superada: "+questions.length+" exercicis, "+signatures.size+" signatures úniques.");
console.log("Distribució de respostes A/B/C: "+answers.join("/")+".");
console.log("Tipus: "+[...types].map(([k,v])=>k+"="+v).join(", ")+".");
