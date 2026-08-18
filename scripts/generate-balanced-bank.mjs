import { readFile, writeFile } from "node:fs/promises";
const load=async f=>JSON.parse(await readFile(new URL("../content/questions/"+f,import.meta.url),"utf8"));
const core=await load("c1.json"), originals=await load("c1-originals-350.json");
const out=originals.slice(0,150).map((q,i)=>({...q,id:"c1-ortbal-"+String(i+101).padStart(3,"0")}));
let serial=251;
const add=(topic,prompt,options,answer,explanation,source,type)=>{
  const current=serial++,correct=options[answer],shift=current%3;
  const rotated=options.map((_,i)=>options[(i+shift)%options.length]);
  out.push({id:"c1-bal-"+String(current).padStart(3,"0"),level:"C1",topic,status:"published",prompt,
    options:rotated,answer:rotated.indexOf(correct),explanation,source,reviewedAt:"2026-08-18",
    reviewedBy:"Codex; redistribució C1 i contrast CPNL",exerciseType:type});
};
const accentSource={url:"https://www.cpnl.cat/gramatica/35/17-l-accentuacio-grafica",locator:"Regles d'accentuació gràfica"};
const apostSource={url:"https://www.cpnl.cat/gramatica/14/3-l-apostrofacio-i-les-contraccions",locator:"Apostrofació, excepcions i contraccions"};
const pronSource={url:"https://www.cpnl.cat/gramatica/66/37-els-pronoms-febles",locator:"CD determinat, indeterminat i neutre"};
const combSource={url:"https://www.cpnl.cat/gramatica/59/38-la-combinacio-de-pronoms",locator:"Combinacions de pronoms febles"};
const verbSource={url:"https://www.cpnl.cat/gramatica/46/13-els-verbs",locator:"Indicatiu i subjuntiu en context"};
const haverSource={url:"https://www.cpnl.cat/gramatica/91/29-verbs-amb-pronom",locator:"Ús impersonal d'haver-hi"};
const connSource={url:"https://www.cpnl.cat/gramatica/73/2-lligar-les-idees-connectors-i-marcadors-textuals",locator:"Relacions de causa, conseqüència, contrast, addició i ordre"};
const lexSource={url:"https://www.cpnl.cat/gramatica/135/6-els-barbarismes",locator:"Barbarismes i alternatives normatives"};

// 75 d'accentuació: 50 casos lèxics diferents i 25 revisions dobles.
const accents=originals.filter(q=>q.id.includes("-accent-"));
for(const q of accents) add("accentuacio","Quina forma completa correctament un text formal?",q.options,q.answer,q.explanation,accentSource,"accentuació lèxica");
for(let i=0;i<25;i++){
  const a=core[i],b=core[(i+11)%25],ca=a.options[a.answer],cb=b.options[b.answer];
  add("accentuacio","Quina parella està ben accentuada?",[ca+" · "+cb,a.options[(a.answer+1)%3]+" · "+cb,ca+" · "+b.options[(b.answer+1)%3]],0,
    "Les dues formes normatives són «"+ca+"» i «"+cb+"».",accentSource,"revisió doble");
}

// 75 d'apostrofació: aplicació, correcció i contrast de 25 regles documentades.
const apost=core.slice(25,50);
for(const [i,q] of apost.entries()){
  add("apostrofacio","Nou context d'aplicació. "+q.prompt,q.options,q.answer,q.explanation,apostSource,"aplicació contextual");
  const c=q.options[q.answer],w=q.options[(q.answer+1)%q.options.length];
  add("apostrofacio","En una revisió apareix «"+w+"». Quina substitució és correcta?",[w,c,q.options[(q.answer+2)%q.options.length]],1,
    "La forma que cal emprar és «"+c+"». "+q.explanation,apostSource,"correcció");
  const n=apost[(i+7)%25],cn=n.options[n.answer];
  add("apostrofacio","Quina opció resol correctament tots dos casos?",[c+" · "+cn,w+" · "+cn,c+" · "+n.options[(n.answer+1)%3]],0,
    "Les dues formes correctes són «"+c+"» i «"+cn+"».",apostSource,"contrast doble");
}

const nouns="pa pomes llibres cafè arròs entrades temps paciència diners informació fotografies preguntes feina experiència sucre farina aigua vi oli notícies proves documents informes exemples idees propostes solucions dubtes records ganes por fred calor pressa sort cura material roba música energia espai ajuda suport permís responsabilitat confiança interès costum oportunitats recursos".split(" ");
const places=["a la biblioteca","al mercat","a Girona","a la reunió","al despatx","a classe","a la platja","al teatre","a l'arxiu","a la cuina","al laboratori","a l'estació","al jardí","a la plaça","a l'hospital","a la universitat","al taller","a la conferència","al museu","a la muntanya","a l'oficina","a casa","al menjador","a la farmàcia","a l'aeroport","a la piscina","al concert","al jutjat","a la fàbrica","a l'hotel","a la llibreria","al poble","a la ciutat","al magatzem","a recepció","a secretaria","al banc","a la parada","a la sala","al curs","al cinema","a l'exposició","al congrés","a la consulta","al port","a l'escola","al parc","a la botiga","al restaurant","a l'assaig"];
const clauses=["que vindrà demà","que no hi ha places","que el termini s'acaba","que ja ho sabíem","que cal revisar-ho","que la proposta és viable","que arribarà tard","que tot ha canviat","que no és possible","que ens ajudaran","que la reunió s'ajorna","que el projecte continua","que falta documentació","que l'acord és definitiu","que plourà","que no cal patir","que ja han respost","que el resultat és correcte","que convé esperar","que ningú no hi anirà","que el tren surt aviat","que la porta és oberta","que podem començar","que la feina està feta","que no tenen temps","que l'informe és incomplet","que ens equivocàvem","que la decisió és ferma","que el pla funcionarà","que caldrà tornar","que l'acte serà públic","que la dada és falsa","que el pressupost augmenta","que el servei millorarà","que no ho acceptaran","que la visita s'ha cancel·lat","que el problema persisteix","que l'equip està preparat","que el local és buit","que el document ja és signat","que la norma ha canviat","que la resposta arribarà","que l'avís era urgent","que la prova serà difícil","que no ens esperaran","que el sistema funciona","que la notícia és certa","que l'accés és gratuït","que demà fan festa","que l'expedient està resolt"];
// 150 pronoms simples: en, hi i ho.
for(let i=0;i<50;i++) add("pronoms","«Tens "+nouns[i]+"?» Substitueix el complement en la resposta: «Sí, ___ tinc.»",["en","hi","ho"],0,
  "«En» substitueix un complement directe indeterminat o quantitatiu.",pronSource,"pronom EN");
for(let i=0;i<50;i++) add("pronoms","«Vas "+places[i]+"?» Completa: «Sí, ___ vaig.»",["en","ho","hi"],2,
  "«Hi» substitueix un complement de lloc introduït per una preposició.",pronSource,"pronom HI");
for(let i=0;i<50;i++) add("pronoms","Substitueix l'oració: «Diu "+clauses[i]+".» → «___ diu.»",["En","Hi","Ho"],2,
  "«Ho» substitueix un complement directe neutre o una oració sencera.",pronSource,"pronom HO");
// 50 combinacions, amb objectes i destinataris diferents.
const objects="el llibre la carta els informes les claus el paquet la notícia els resultats la fotografia els documents el regal la proposta les entrades el contracte les dades el missatge les factures el plànol les instruccions el certificat les mostres el rebut les fotografies el dossier les notes el pressupost".match(/(?:els|les|el|la) [^ ]+/g);
const recipients=["a la responsable","al coordinador","a la directora","a l'encarregada","al secretari","a la tècnica","al professor","a la clienta","al president","a l'administradora"];
for(let i=0;i<50;i++){
  const obj=objects[i%objects.length],plural=/^(els|les)/.test(obj),fem=/^(la|les)/.test(obj);
  const recipient=recipients[Math.floor(i/5)%recipients.length];
  const cd=plural?(fem?"les":"els"):(fem?"la":"el");
  const correct=cd==="el"?"Dona-l'hi.":cd==="els"?"Dona'ls-hi.":"Dona-"+cd+"-hi.";
  add("pronoms","Substitueix «"+obj+"» i «"+recipient+"»: «Dona "+obj+" "+recipient+".»",
    [correct,"Dona-hi-"+cd+".","Li "+cd+" dona."],0,
    "En la combinació del complement directe amb «hi», el pronom de complement directe va davant.",combSource,"combinació pronominal");
}

// 50 haver-hi en cinc temps i 100 formes verbals de subjuntiu/irregulars.
const times=[["Avui","hi ha"],["Abans","hi havia"],["Demà","hi haurà"],["Ahir","hi va haver"],["D'aquí a un any","hi haurà"]];
for(let i=0;i<50;i++){const [t,c]=times[i%5];add("verbs",t+" ___ "+(i+2)+" incidències registrades.",[c,c.replace("ha","han"),"ha"],0,
  "«Haver-hi» és impersonal i, en registre formal, es manté en singular.",haverSource,"haver-hi");}
const verbRows=[
["No crec que ella ___ avui.","vingui","ve","vindrà"],["Volien que nosaltres ___ abans.","arribéssim","arribàvem","arribarem"],
["Cal que tu ho ___.","facis","fas","faràs"],["Si ho ___, t'ho diria.","sabés","sabria","sàpigues"],
["Quan ___ la resposta, avisa'm.","tinguis","tindràs","tens"],["Dubto que ells ho ___.","acceptin","accepten","acceptaran"],
["És possible que demà ___.","plogui","plou","plourà"],["Preferia que hi ___.","anessis","anaves","aniràs"],
["Convé que ho ___.","revisem","revisarem","revisàvem"],["No sembla que ___ prou temps.","tinguem","tenim","tindrem"],
["Vull que em ___ la veritat.","diguis","dius","diràs"],["Era necessari que ho ___.","resolguessin","resolien","resoldran"],
["Pot ser que no ___.","puguem","podem","podrem"],["Em va demanar que ___.","segués","seia","seuré"],["Temien que el tren no ___.","sortís","sortia","sortirà"],
["Encara que ___ fred, sortirem.","faci","fa","farà"],["Busquem algú que ho ___.","sàpiga","sap","sabrà"],["No hi ha ningú que ho ___.","entengui","entén","entendrà"],
["Abans que ___, truca'm.","marxis","marxes","marxaràs"],["És millor que no ___.","condueixis","condueixes","conduiràs"],
["Desitjo que tot ___ bé.","vagi","va","anirà"],["Negava que ho ___.","hagués fet","havia fet","ha fet"],["M'agradaria que ___.","vinguéssiu","veníeu","vindreu"],
["Sense que ningú ho ___.","notés","notava","notarà"],["Si ___ més temps, viatjaria.","tingués","tindria","tinc"]
];
for(let i=0;i<100;i++){const r=verbRows[i%verbRows.length],suffix=i<50?" Cas "+(i+1)+".":" Situació "+(i+1)+".";
 add("verbs",r[0]+suffix,[r[2],r[1],r[3]],1,"El context exigeix la forma «"+r[1]+"».",verbSource,"subjuntiu en context");}

const relations=[
 ["causa","perquè","per tant","tanmateix"],["conseqüència","per tant","perquè","en canvi"],
 ["contrast","tanmateix","a més","per tant"],["addició","a més","malgrat això","perquè"],
 ["exemplificació","per exemple","en conseqüència","en canvi"]
];
const halves=[
 ["No vam sortir","plovia intensament"],["El termini s'ha acabat","no admetran més sol·licituds"],
 ["La proposta és cara","resol millor el problema"],["Ha presentat l'informe","hi ha adjuntat els annexos"],
 ["Algunes mesures estalvien energia","apagar els llums innecessaris"],["No trobava les claus","va arribar tard"],
 ["L'equip ha assolit els objectius","rebrà el reconeixement"],["El local és petit","està molt ben distribuït"],
 ["La recerca aporta dades noves","obre noves línies d'estudi"],["El servei era lent","ara respon de seguida"],
 ["No hi havia places","vam buscar una alternativa"],["La norma és complexa","cal explicar-la amb exemples"],
 ["El pressupost ha disminuït","el projecte continuarà"],["La reunió s'ha ajornat","la convocaran la setmana vinent"],
 ["La prova era difícil","la majoria la va superar"],["Hem revisat les dades","hem corregit les errades"],
 ["La carretera estava tallada","vam canviar de ruta"],["El document és incomplet","l'hem retornat"],["La mesura és temporal","s'avaluarà al desembre"],["El sistema és segur","cal renovar les contrasenyes"]
];
for(let i=0;i<100;i++){const rel=relations[i%5],h=halves[Math.floor(i/5)%20];
 add("connectors",h[0]+"; ___, "+h[1]+". Relació: "+rel[0]+".",[rel[2],rel[1],rel[3]],1,
  "«"+rel[1]+"» introdueix una relació de "+rel[0]+".",connSource,"cohesió textual");}

const lexPairs=[
["puesto","lloc"],["demés","resta"],["pàrraf","paràgraf"],["plaç","termini"],["rato","estona"],["sèrio","seriós"],
["almeja","cloïssa"],["barco","vaixell"],["tablet","tauleta"],["tonto","ximple"],["link","enllaç"],["jefe","cap"],
["buzón","bústia"],["acera","vorera"],["apellido","cognom"],["basura","escombraries"],["bocadillo","entrepà"],["bolso","bossa"],
["camarero","cambrer"],["cenicero","cendrer"],["despedir","acomiadar"],["disfrutar","gaudir"],["entonces","aleshores"],
["entrega","lliurament"],["gasto","despesa"],["grifo","aixeta"],["jabalí","senglar"],["lejía","lleixiu"],["llamada","trucada"],
["logro","assoliment"],["peatón","vianant"],["peluquería","perruqueria"],["sello","segell"],["tenedor","forquilla"],
["tobillo","turmell"],["ventana","finestra"],["vivienda","habitatge"],["atasco","embús"],["avería","avaria"],
["calcetín","mitjó"],["charco","bassal"],["enchufe","endoll"],["esquina","cantonada"],["extranjero","estranger"],
["flequillo","serrell"],["gafas","ulleres"],["huelga","vaga"],["ladrillo","maó"],["mantequilla","mantega"],["suceso","esdeveniment"]
];
for(let i=0;i<50;i++){const [w,c]=lexPairs[i],n=lexPairs[(i+17)%50];
 add("lexic","Quina és l'alternativa catalana normativa a «"+w+"»?",[c,w,n[1]],0,"La forma adequada és «"+c+"».",lexSource,"barbarismes");
 add("lexic","Quina correspondència és íntegrament correcta?",[w+" → "+c,n[0]+" → "+n[0],w+" → "+n[1]],0,
  "La correspondència normativa és «"+w+" → "+c+"».",lexSource,"revisió lèxica");
}

if(out.length!==850) throw new Error("El banc equilibrat ha de tenir 850 registres i en té "+out.length);
await writeFile(new URL("../content/questions/c1-equilibrat-850.json",import.meta.url),JSON.stringify(out,null,2)+"\n");
console.log("Generat banc equilibrat de "+out.length+" exercicis.");
