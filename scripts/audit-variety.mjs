import { readFile } from "node:fs/promises";
const dir=new URL("../content/questions/",import.meta.url);
const files=["c1.json","c1-ortografia.json","c1-equilibrat-850.json"];
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
const expected={accentuacio:100,apostrofacio:100,ortografia:250,pronoms:200,verbs:150,connectors:100,lexic:100};
for(const [topic,total] of Object.entries(expected)){
  const actual=questions.filter(q=>(q.topic==="dieresi"?"accentuacio":q.topic)===topic).length;
  if(actual!==total) errors.push("Distribució incorrecta de "+topic+": "+actual+"; s'esperaven "+total);
}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log("Auditoria superada: "+questions.length+" exercicis, "+signatures.size+" signatures úniques.");
console.log("Distribució de respostes A/B/C: "+answers.join("/")+".");
console.log("Tipus: "+[...types].map(([k,v])=>k+"="+v).join(", ")+".");
