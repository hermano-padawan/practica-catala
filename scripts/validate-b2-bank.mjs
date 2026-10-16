import {readFile} from "node:fs/promises";
const root=new URL("../content/questions/",import.meta.url);
const bank=JSON.parse(await readFile(new URL("b2.json",root),"utf8"));
const c1=[];
for(const name of ["c1.json","c1-ortografia.json","c1-equilibrat-850.json"]){
 try{c1.push(...JSON.parse(await readFile(new URL(name,root),"utf8")));}
 catch(error){if(error.code!=="ENOENT")throw error;}
}
const errors=[],ids=new Set(),prompts=new Set(),signatures=new Set();
const norm=t=>t.toLowerCase().normalize("NFC").replace(/[’]/g,"'").replace(/[^\p{L}\p{N}]+/gu," ").trim();
const core=t=>{const matches=[...t.matchAll(/«([^»]+)»/g)];return norm(matches.length?matches.at(-1)[1]:t);};
const c1Prompts=new Set(c1.map(q=>core(q.prompt)));
const counts={},rules={},answers={2:[0,0],3:[0,0,0]};
for(const [index,q]of bank.entries()){
 const at=q.id||String(index);
 if(!/^b2-propi-\d{4}$/.test(q.id)||ids.has(q.id))errors.push(at+": identificador invàlid o repetit");ids.add(q.id);
 if(q.level!=="B2"||q.status!=="published"||q.origin!=="b2-independent-2026-10")errors.push(at+": metadades invàlides");
 if(q.derivedFrom)errors.push(at+": no pot derivar de C1");
 if(!q.prompt?.trim()||prompts.has(norm(q.prompt)))errors.push(at+": enunciat buit o repetit");prompts.add(norm(q.prompt));
 if(!Array.isArray(q.options)||![2,3].includes(q.options.length)||new Set(q.options).size!==q.options.length)errors.push(at+": alternatives invàlides");
 if(!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length)errors.push(at+": resposta fora de rang");
 if(!q.explanation?.trim()||q.explanation.length>500)errors.push(at+": explicació invàlida");
 if(!q.source?.url?.startsWith("https://www.cpnl.cat/")||!q.source.locator)errors.push(at+": falta font");
 if(!q.reviewedAt||!q.reviewedBy||!q.examSkill||!q.exerciseType)errors.push(at+": falta informació editorial");
 const sig=JSON.stringify([norm(q.prompt),[...q.options].sort()]);
 if(signatures.has(sig))errors.push(at+": exercici duplicat");signatures.add(sig);
 if(c1Prompts.has(core(q.prompt)))errors.push(at+": mateix enunciat contextual que C1");
 if(/Selecciona quina|Selecciona quin|derivedFrom|Resol el cas següent:.*Completa/i.test(q.prompt))errors.push(at+": plantilla antiga");
 for(const text of q.options){
 if(/(?:rr|pp|tt|dd|gg)$/iu.test(text)||/ù|ì|á/.test(text))errors.push(at+": distractor artificial");
 }
 counts[q.topic]=(counts[q.topic]||0)+1;rules[q.exerciseType]=(rules[q.exerciseType]||0)+1;
 if(answers[q.options.length])answers[q.options.length][q.answer]++;
}
if(bank.length!==1000)errors.push("Calen 1.000 exercicis B2.");
for(const t of ["accentuacio","apostrofacio","ortografia","pronoms","verbs","connectors","lexic"])if(!counts[t])errors.push("Falta "+t);
for(const values of Object.values(answers))if(Math.max(...values)-Math.min(...values)>1)errors.push("Posicions de resposta desequilibrades");
const generator=await readFile(new URL("generate-b2-bank.mjs",import.meta.url),"utf8");
if(/c1(?:-equilibrat|-ortografia)?\.json|derivedFrom|transformedPrompt/.test(generator))errors.push("El generador encara depèn de C1");
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log(JSON.stringify({published:bank.length,topics:counts,skills:Object.keys(rules).length,answers,c1QuestionsCompared:c1.length,duplicatePrompts:0,derivedFromC1:0},null,2));
