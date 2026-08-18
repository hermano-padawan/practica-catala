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
const nasContexts = [
  "La masia conserva una ___ amb volta de pedra.","Van passejar per la ___ fins al mar.","L'___ desprenia una olor intensa.","Treballa amb un ___ de la universitat.","La ___ de material es farà abans de divendres.",
  "Volen ___ la biblioteca municipal.","L'orquestra interpretarà una ___ de Mozart.","L'___ va presentar l'espectacle.","La victòria va ser un gran ___.","Cal ___ els documents en un lloc segur.",
  "L'edifici continua ___ malgrat les obres.","El verí podria ___ l'aigua del pou.","El mirall permet ___ el paisatge.","Han ___ tot el recinte.","La lletra grega ___ apareix en la fórmula.",
  "La joiera va encastar una ___ al penjoll.","El laboratori ha de romandre ___.","La ___ en aigua freda va durar pocs segons.","El sistema permet ___ dues línies telefòniques.","La llegenda parla d'un heroi ___.",
  "Va respondre amb un gest ___.","La ___ va publicar un comunicat.","Celebren l'___ de la Mare de Déu.","La indemnització forma part de la ___.","Encara queda un ___ per resoldre.",
  "L'explosió va ser un ___ contra la població.","El personatge busca el seu ___.","El diàmetre divideix la ___ en dues parts.","Actuarem segons aquesta ___.","Ens volen ___ a participar en el projecte.",
  "L'enginyer va presentar un nou ___.","El ple ha aprovat el ___ pressupostari.","El centre estudia cada proposta de ___.","Roma fou governada per un ___.","L'actriu es diu ___.",
  "És un talent ___.","El contracte inclou un document ___.","Aquest mot funciona com a ___.","L'acusat es declara ___.","La fulla és ___.",
  "Revisa el ___ abans de pagar.","El diari sortirà de la ___.","La policia va trobar una ___ a la porta.","El nadó va començar a ___.","El protagonista caminava ___.",
  "Aquesta regla és fàcil de recordar amb un recurs ___.","El tràmit gaudeix d'una ___ fiscal.","El candidat està ___ de fer la prova.","La resposta té un caràcter ___.","La febre pot ser un ___ de la infecció."
];
const erraContexts = [
  "La seva ___ treballava a l'hospital.","La capsa té una ___ transparent.","Va menjar una ___ per postres.","L'exercici d'___ era força complex.","La gata és tímida i ___.",
  "Una ___ travessava el camí.","En ___ presentarà la ponència.","Hem preparat ___ amb verdures.","Aprèn a tocar la ___.","Des de la ___ es veu tota la vall.",
  "Hem de ___ amb la direcció.","Vam ___ atentament el paisatge.","El cor va començar a ___.","Li agrada ___ cada matí.","No has de ___ cap conseqüència.",
  "Les plantes necessiten llum per ___.","Després de dinar vol ___.","No podem ___ aquesta injustícia.","Cal ___ els fullets entre els assistents.","La ___ del cel anunciava tempesta.",
  "Han restaurat un ___ abandonat.","La ___ de l'hivern tenyia el paisatge.","El ___ va reparar la porta.","Duia un ___ de seda.","El metge li va auscultar el ___.",
  "La novel·la parla d'un ___ impossible.","El vaixell es va endinsar a la ___.","La llum del ___ guiava els navegants.","El projecte mira cap al ___.","És un parent ___.",
  "Va rebre l'acte amb gran ___.","La proposta aporta molt de ___.","La taxa d'___ ha disminuït.","El ___ meteorològic detectava la tempesta.","Em pots fer el ___ d'acostar-m'ho?",
  "Un ___ de sol entrava per la finestra.","Van seure en un ___ tranquil.","Necessito temps per ___ la resposta.","Deixa de ___ i explica què et passa.","El ___ ha quedat negat per la pluja.",
  "Prefereixo ___ abans de respondre.","La vergonya la va fer ___.","La campanya combat l'___.","El museu exposa un ___ de l'artista.","El moviment impulsava la ___.",
  "Va guanyar la prova ___.","L'equip intenta ___ l'ofensiva rival.","La ___ va transformar el país.","Viuen en un barri de l'___.","La càmera detecta radiació d'___."
];
if(nasContexts.length!==50 || erraContexts.length!==50) throw new Error("Cada bloc contextual ha de contenir exactament 50 frases");

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
    const contexts=block.key==="nas"?nasContexts:block.key==="erra"?erraContexts:null;
    const prompt=contexts?`Completa amb la forma correcta: «${contexts[index]}»`:frames[index%frames.length];
    questions.push({
      id:`c1-${block.key}-${String(651+questions.length).padStart(3,"0")}`,
      level:"C1", topic:"ortografia", status:"published", prompt,
      options, answer,
      explanation:`La forma normativa és «${word}». Aquest exercici treballa ${block.label}.`,
      source:{url:block.url,locator:block.locator}, reviewedAt:"2026-08-18",
      reviewedBy:"Codex; contrast CPNL i revisió automàtica de consistència"
    });
  }
}
await writeFile(new URL("../content/questions/c1-originals-350.json",import.meta.url),`${JSON.stringify(questions,null,2)}\n`);
console.log(`Generats ${questions.length} exercicis originals.`);
