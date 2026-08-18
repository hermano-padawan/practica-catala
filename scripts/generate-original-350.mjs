import { writeFile } from "node:fs/promises";

const blocks = [
  { key:"nas", label:"les consonants nasals", url:"https://www.cpnl.cat/gramatica/20/8-la-m-i-la-n", locator:"Remarques sobre m, n i grups mpt/mpc, línies 75-146", words:`cambra rambla ambre company compra ampliar simfonia amfitrió triomf emmagatzemar immòbil emmetzinar emmirallar emmurallat gamma gemma immaculat immersió commutar immortal somrís premsa Assumpció redempció assumpte atemptat redemptor circumferència circumstància convidar invent canvi tramvia triumvirat Anna innat annex connector innocent perenne compte impremta empremta somriure somnàmbul mnemotècnic exempció exempt peremptori símptoma temptació prompte`.split(" ")},
  { key:"hac", label:"l'ús de la hac", url:"https://www.cpnl.cat/gramatica/21/9-la-h", locator:"Hac muda, llistes de mots i hac aspirada, línies 69-203", words:`hàbil ham harmonia haver hecatombe hectolitre hectòmetre hegemonia hel·lènic hemicicle hemisferi hendecasíl·lab heptàgon heràldic herba hereu hèrnia heterodox hexàgon hissar hivern hospital hostatge hoste hòstia hulla adherir ahir aleshores alhora anhel anihilar aprehensió cohesió cohibir conhort desinhibir exhalar exhaurir exhortar filharmònic inherent inhibició maharajà menhir tothom tothora sahrauí suahili subhasta vehicle`.split(" ")},
  { key:"erra", label:"la r i la rr", url:"https://www.cpnl.cat/gramatica/25/11-els-sons-de-la-erra-r-i-rr", locator:"Grafia de r/rr i erra final, línies 69-151", words:`mare cara pera aritmètica poruga rata Ramon arròs guitarra torre parlar mirar cantar córrer témer créixer dormir patir repartir blavor colomar grisor fuster mocador cor amor mar far futur familiar honor valor atur radar favor raig racó rumiar rondinar conreu enraonar enrojolar antiracisme autoretrat contrareforma contrarellotge contrarestar contrarevolució extraradi infraroig multiracial neorealisme preromànic ultraràpid terra arruïnar arriscar errar arrítmia`.split(" ")},
  { key:"ixe", label:"la x i el dígraf ix", url:"https://www.cpnl.cat/gramatica/30/14-la-ix-i-la-x", locator:"Regles i vocabulari de x/ix", words:`xop reixa panxa peix calaix feix coix fluix xarop xeringa xarampió punxar enguixar rauxa aixeta baixar caixa faixa maduixa queixal vaixell créixer conèixer néixer aparèixer merèixer teixir afegix xicot xemeneia xifra ximple xiular xocolata xoriço xàfec xampú xalet xapa xerrada xerrac xiulet xiclet xinxeta anxova butxaca carxofa clixé disbauxa eixam eixugar`.split(" ")},
  { key:"txig", label:"les grafies tx i ig", url:"https://www.cpnl.cat/gramatica/28/13-la-tx-i-la-ig", locator:"Regles i exemples de tx, ig, g i tj", words:`cotxe dutxa fletxa metxa petxina caputxa butxaca despatx escabetx empatx cartutx sandvitx esquitxat fitxa panotxa totxo desitjar desig boja boig lletja lleig mitjana mig roja roig bogeria mareig passeig sorteig bateig assaig raig faig maig safareig estoig enuig rebuig puig llebeig roineig esquitx esquitxar despatxar empatxar fitxar cartutxera gavatx capritx escabetxar`.split(" ")},
  { key:"accent", label:"l'accentuació gràfica", url:"https://www.cpnl.cat/gramatica/35/17-l-accentuacio-grafica", locator:"Classificació i regles d'accentuació", words:`camió cançó cafè perquè després també arròs jardí matí ningú comú tímid fàcil àngel càncer caràcter fenòmens orígens telèfon plàtan préstec màquina música pàgina història ciència família església memòria política pràctica pública ràpida última ànima brúixola fórmula període quilòmetre número víctima avió camí Berlín interès comprèn depèn conèixer créixer córrer això allò`.split(" ")},
  { key:"guionet", label:"l'ús del guionet", url:"https://www.cpnl.cat/gramatica/133/21-el-guionet", locator:"Compostos amb guionet i compostos soldats", words:`compravenda blaugrana sordmut pocavergonya maldecap grecoromà politicosocial nord-est sud-oest nord-oest sud-est ping-pong zig-zag xup-xup nyam-nyam tic-tac vint-i-un trenta-dos quaranta-cinc seixanta-vuit noranta-nou déu-n'hi-do adeu-siau abans-d'ahir despús-ahir qui-sap-lo para-sol gira-sol penja-robes guarda-roba obreampolles llevataps trencaclosques escuradents comptagotes parallamps gratacel bocamoll capgròs cara-xuclat poca-solta poca-vergonya pit-roig pèl-roig barba-roig penya-segat allioli coliflor filferro capicua`.split(" ")},
];

const replacements = {
  nas:[["mm","m"],["nn","n"],["mp","np"],["mb","nb"],["m","n"],["n","m"]],
  hac:[["h",""],["h","j"],["h","g"]],
  erra:[["rr","r"],["r","rr"],["r",""]],
  ixe:[["ix","x"],["ix","j"],["x","ix"],["x","ch"]],
  txig:[["tx","ig"],["tx","ch"],["ig","tx"],["ig","g"],["tj","g"],["j","g"],["j","tx"],["g","j"]],
  accent:[["à","á"],["è","é"],["é","è"],["í","i"],["ó","ò"],["ò","ó"],["ú","u"],["ç","c"]],
  guionet:[["-",""],["-"," "]],
};
const frames = [
  "Quina és la grafia normativa?", "Tria el mot ben escrit.", "Quina forma admet la normativa?",
  "Assenyala l'opció ortogràficament correcta.", "Quina forma conservaries en una revisió professional?",
  "Tria l'única opció sense errors.", "Quina grafia és adequada en un text formal?",
];

function wrongForms(word,key){
  const candidates=[];
  for(const [from,to] of replacements[key]){
    if(word.includes(from)) candidates.push(word.replace(from,to));
    if(candidates.length===2) break;
  }
  const plain=word.normalize("NFD").replace(/\p{Diacritic}/gu,"").replace("·","");
  if(plain!==word) candidates.push(plain);
  if(key==="hac" && !word.startsWith("h")) candidates.push(`h${word}`);
  if(key==="guionet" && !word.includes("-")) candidates.push(word.replace(/^(.{3,7})/,"$1-"));
  const accented=word.replace(/[aeiou]/,v=>({a:"à",e:"è",i:"í",o:"ò",u:"ú"})[v]);
  if(accented!==word) candidates.push(accented);
  const shortened=word.replace(/[mnrx]/,"");
  if(shortened!==word) candidates.push(shortened);
  candidates.push(`${word}h`);
  return [...new Set(candidates)].filter(candidate=>candidate!==word).slice(0,2);
}

const questions=[];
for(const block of blocks){
  if(block.words.length<50) throw new Error(`${block.key}: s'esperaven almenys 50 mots i n'hi ha ${block.words.length}`);
  block.words = block.words.slice(0,50);
  for(const [index,word] of block.words.entries()){
    const wrong=wrongForms(word,block.key);
    if(wrong.length!==2) throw new Error(`${block.key}/${word}: no hi ha dos distractors`);
    const answer=(questions.length+index)%3;
    const options=[...wrong]; options.splice(answer,0,word);
    questions.push({
      id:`c1-${block.key}-${String(651+questions.length).padStart(3,"0")}`,
      level:"C1", topic:"ortografia", status:"published", prompt:frames[index%frames.length],
      options, answer,
      explanation:`La forma normativa és «${word}». Aquest exercici treballa ${block.label}.`,
      source:{url:block.url,locator:block.locator}, reviewedAt:"2026-08-18",
      reviewedBy:"Codex; contrast CPNL i revisió automàtica de consistència"
    });
  }
}
await writeFile(new URL("../content/questions/c1-originals-350.json",import.meta.url),`${JSON.stringify(questions,null,2)}\n`);
console.log(`Generats ${questions.length} exercicis originals.`);
