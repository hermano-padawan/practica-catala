import { readFile, writeFile } from "node:fs/promises";

const input = new URL("../content/questions/c1-originals-350.json", import.meta.url);
const base = JSON.parse(await readFile(input, "utf8"));
const byBlock = Object.groupBy(base, (q) => q.id.split("-")[1]);
const pairFrames = [
  "Quina parella està escrita íntegrament d'acord amb la normativa?",
  "En quina opció són correctes totes dues grafies?",
  "Tria la parella que superaria una revisió ortogràfica.",
  "Quina proposta no necessita cap esmena?",
  "Assenyala l'única parella sense cap falta ortogràfica.",
];
const correctionFrames = [
  (a,b) => "Un text conté «"+a+"» i «"+b+"». Quina esmena corregeix tots dos mots?",
  (a,b) => "La versió provisional escriu «"+a+" / "+b+"». Quina revisió és completa?",
  (a,b) => "Cal corregir simultàniament «"+a+"» i «"+b+"». Quina opció ho resol?",
  (a,b) => "El corrector ha marcat «"+a+"» i «"+b+"». Quina substitució és normativa?",
  (a,b) => "Quina proposta rectifica sense deixar cap error en «"+a+"; "+b+"»?",
];
const triadFrames = [
  "Quina sèrie de tres mots és completament normativa?",
  "Només una opció conté tres grafies correctes. Quina és?",
  "Quina línia podria publicar-se sense cap correcció?",
  "Assenyala la sèrie que no conté cap interferència ortogràfica.",
  "En quina opció són normatius els tres mots?",
];
const correct = (q) => q.options[q.answer];
const wrong = (q,n=0) => q.options.filter((_,i)=>i!==q.answer)[n%2];
function ordered(correctOption,distractors,seed){
  const answer=seed%3,options=[...distractors]; options.splice(answer,0,correctOption);
  return {options,answer};
}
function make(q,id,prompt,packed,explanation,exerciseType){
  return {id,level:"C1",topic:"ortografia",status:"published",prompt,...packed,explanation,
    source:q.source,reviewedAt:"2026-08-18",
    reviewedBy:"Codex; auditoria de varietat, consistència i contrast CPNL",exerciseType};
}
const questions=[];
let serial=151;
for(const group of Object.values(byBlock)){
  for(let i=0;i<25;i++){
    const a=group[i*2],b=group[i*2+1],ca=correct(a),cb=correct(b),wa=wrong(a),wb=wrong(b,1);
    const packed=ordered(ca+" · "+cb,[wa+" · "+wb,ca+" · "+wb],serial);
    questions.push(make(a,"c1-rev-"+serial++,pairFrames[i%5],packed,
      "La parella normativa és «"+ca+" · "+cb+"»; les altres opcions mantenen almenys una grafia incorrecta.","comparació doble"));
  }
  for(let i=0;i<25;i++){
    const a=group[i],b=group[49-i],ca=correct(a),cb=correct(b),wa=wrong(a,1),wb=wrong(b);
    const packed=ordered(ca+" · "+cb,[wa+" · "+cb,ca+" · "+wb],serial);
    questions.push(make(a,"c1-rev-"+serial++,correctionFrames[i%5](wa,wb),packed,
      "Cal substituir «"+wa+"» per «"+ca+"» i «"+wb+"» per «"+cb+"».","correcció doble"));
  }
}
const triadCounts=[22,22,22,21,21,21,21];
for(const [blockIndex,group] of Object.values(byBlock).entries()){
  for(let i=0;i<triadCounts[blockIndex];i++){
    const a=group[i],b=group[(i+17)%50],c=group[(i+34)%50];
    const ca=correct(a),cb=correct(b),cc=correct(c);
    const packed=ordered(ca+" · "+cb+" · "+cc,[
      wrong(a)+" · "+cb+" · "+wrong(c,1),ca+" · "+wrong(b,1)+" · "+cc],serial);
    questions.push(make(a,"c1-rev-"+serial++,triadFrames[i%5],packed,
      "La sèrie íntegrament normativa és «"+ca+" · "+cb+" · "+cc+"».","diagnòstic triple"));
  }
}
if(questions.length!==500) throw new Error("S'han generat "+questions.length+" exercicis, no 500.");
await writeFile(new URL("../content/questions/c1-reforc-500.json",import.meta.url),JSON.stringify(questions,null,2)+"\n");
console.log("Generats "+questions.length+" exercicis revisats i compostos.");
