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
const recipientsSingular=["a la responsable","al coordinador","a la directora","a l'encarregada","al secretari"];
const recipientsPlural=["a les responsables","als coordinadors","a les directores","als encarregats","a les tècniques"];
for(let i=0;i<50;i++){
  const obj=objects[i%objects.length],plural=/^(els|les)/.test(obj),fem=/^(la|les)/.test(obj);
  const recipientPlural=i>=25;
  const recipient=(recipientPlural?recipientsPlural:recipientsSingular)[i%5];
  const cd=plural?(fem?"les":"els"):(fem?"la":"el");
  const correct=recipientPlural?"Dona'ls-"+cd+".":cd==="el"?"Dona-l'hi.":cd==="els"?"Dona'ls-hi.":"Dona-"+cd+"-hi.";
  add("pronoms","Substitueix «"+obj+"» i «"+recipient+"»: «Dona "+obj+" "+recipient+".»",
    [correct,recipientPlural?"Dona-"+cd+"-hi.":"Dona-hi-"+cd+".",recipientPlural?"Dona'ls-hi.":"Li "+cd+" dona."],0,
    recipientPlural?"Amb un complement indirecte plural, mantenim «els» davant del pronom de complement directe.":"Amb un complement indirecte singular, «li» es transforma en «hi» i va darrere del pronom de complement directe.",combSource,"combinació pronominal");
}

// 50 haver-hi en cinc temps i 100 formes verbals de subjuntiu/irregulars.
const times=[["Avui","hi ha"],["Abans","hi havia"],["Demà","hi haurà"],["Ahir","hi va haver"],["D'aquí a un any","hi haurà"]];
const existents=["tres incidències registrades","moltes sol·licituds pendents","dues places disponibles","prou cadires per a tothom","diversos errors al document","massa vehicles al carrer","cinc persones esperant","noves proves a l'expedient","algunes qüestions per resoldre","més opcions que abans","poques entrades a la venda","molts canvis al programa","dos avisos urgents","diverses causes possibles","més alumnes matriculats","quatre reunions previstes","moltes dades duplicades","noves mesures de seguretat","tres testimonis citats","alguns obstacles imprevistos","prou recursos disponibles","moltes botigues obertes","dos accessos alternatius","diverses activitats gratuïtes","cinc documents sense signar","més arbres a la plaça","poques habitacions lliures","algunes diferències importants","moltes consultes acumulades","tres factures incorrectes","nous criteris d'avaluació","diverses rutes senyalitzades","quatre candidats finalistes","moltes famílies interessades","dos ordinadors espatllats","alguns dubtes raonables","més serveis al barri","poques queixes formals","tres cursos intensius","diverses obres en marxa","moltes carpetes arxivades","dos terminis simultanis","algunes excepcions a la regla","més controls fronterers","quatre propostes viables","moltes persones voluntàries","tres informes contradictoris","alguns seients buits","dues sortides d'emergència","més oportunitats laborals"];
for(let i=0;i<50;i++){const [t,c]=times[i%5];add("verbs",t+" ___ "+existents[i]+".",[c,c.replace("ha","han"),"ha"],0,
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
,
["No permetran que hi ___.","entrem","entrem-hi","entrarem"],["Procurava que no se'n ___.","adonessin","adonaven","adonaran"],
["És probable que el preu ___.","pugi","puja","pujarà"],["Volia que m'ho ___.","expliquessis","explicaves","explicaràs"],
["Quan ho ___, podrem continuar.","hàgiu acabat","heu acabat","acabareu"],["No acceptava que el ___.","contradiguessin","contradeien","contradiran"],
["Convé que la porta romangui ___.","tancada","tancarà","tancava"],["Si no ___ tant, dormiries millor.","treballessis","treballaràs","treballaves"],
["Ens sorprèn que encara no ___.","hagin arribat","han arribat","arribaran"],["Demanava que li ___ una còpia.","enviessin","enviaven","enviaran"],
["No era segur que el pont ___.","resistís","resistia","resistirà"],["Tant de bo ___ la beca.","obtinguis","obtens","obtindràs"],
["Encara que no hi ___, comptarem amb tu.","assisteixis","assisteixes","assistiràs"],["Calia que els tècnics ho ___.","verifiquessin","verificaven","verificaran"],
["No pensava que la coneguessis tan ___.","bé","bona","milloraria"],["Si m'ho ___, ho entendria.","demostressis","demostraràs","demostraves"],
["Esperarem fins que ens ___.","atenguin","atenen","atendran"],["Era improbable que se'n ___.","recordés","recordava","recordarà"],
["Necessitem una persona que ___ alemany.","parli","parla","parlarà"],["No marxis sense que t'ho ___.","confirmin","confirmen","confirmaran"],
["Potser convindria que ho ___.","ajornéssim","ajornàvem","ajornarem"],["Em molestava que sempre ___.","interrompessis","interrompies","interrompràs"],
["Sigui com ___, acabarem la feina.","sigui","és","serà"],["No trobaràs ningú que t'ho ___.","garanteixi","garanteix","garantirà"],
["Hauríem preferit que ens ho ___ abans.","comuniquessin","comunicaven","comunicaran"]
];
for(let i=0;i<100;i++){const r=verbRows[i%50],correction=i>=50;
 const prompt=correction?"Corregeix la forma verbal de «"+r[0].replace("___",r[2])+"»":r[0];
 add("verbs",prompt,[r[2],r[1],r[3]],1,"El context exigeix la forma «"+r[1]+"».",verbSource,correction?"correcció verbal":"subjuntiu en context");}

const connectorGroups=[
 {rel:"causa",c:"perquè",d:["per tant","tanmateix"],items:[
 ["Vam ajornar l'excursió","plovia intensament"],["No ha vingut a la reunió","està malalt"],["Han tancat la carretera","hi ha hagut una esllavissada"],["He apagat l'ordinador","ja no el necessitava"],["No podem publicar l'informe","encara conté errors"],["La planta s'ha assecat","ningú no l'ha regada"],["Hem canviat de sala","l'anterior era massa petita"],["Porta l'abric","fa molt de fred"],["No li han concedit l'ajut","faltava documentació"],["El tren acumula retard","hi ha una avaria"],["Han suspès el concert","el cantant ha perdut la veu"],["No contestava el telèfon","era en una entrevista"],["Cal repetir la prova","els resultats no són concloents"],["La botiga avui no obre","és festa local"],["Hem reduït la despesa","el pressupost era insuficient"],["No travessis el riu","baixa molt ple"],["Han reforçat el servei","ha augmentat la demanda"],["Va acceptar l'oferta","les condicions eren bones"],["No han admès el recurs","es va presentar fora de termini"],["Obre la finestra","aquí dins fa calor"]]},
 {rel:"conseqüència",c:"per tant",d:["perquè","tanmateix"],items:[
 ["S'ha acabat el termini","no admetran més sol·licituds"],["La carretera està tallada","haurem de buscar una altra ruta"],["Ha superat totes les proves","obtindrà el certificat"],["No queda cap entrada","no podrem assistir al concert"],["El document no està signat","no té validesa"],["Plou molt","el partit s'ajornarà"],["Han augmentat els costos","caldrà revisar el pressupost"],["La sala és plena","obrirem l'espai annex"],["No ha presentat els justificants","haurà de retornar l'ajut"],["El sistema ha fallat","activarem el protocol manual"],["L'equip ha complert els objectius","rebrà una gratificació"],["La demanda ha crescut","ampliarem l'horari"],["El pont és inestable","restarà tancat"],["La prova ha estat negativa","no caldrà repetir el tractament"],["No hi ha prou quòrum","la votació no es pot fer"],["La informació era falsa","han rectificat la notícia"],["S'ha espatllat la calefacció","treballarem en una altra planta"],["Tots hi estan d'acord","aprovarem la proposta"],["El pagament s'ha duplicat","en reclamarem la devolució"],["La previsió és favorable","mantindrem l'activitat"]]},
 {rel:"contrast",c:"tanmateix",d:["a més","per tant"],items:[
 ["La proposta és cara","és la més completa"],["Plovia intensament","vam sortir a caminar"],["El local és petit","està molt ben distribuït"],["No tenia experiència","va resoldre el problema"],["La prova era difícil","la majoria la va superar"],["El termini era molt curt","vam lliurar la feina a temps"],["El cotxe és antic","funciona perfectament"],["Havia estudiat molt","no va aprovar"],["El servei rebia crítiques","va renovar el contracte"],["La ruta és llarga","no presenta gaire desnivell"],["L'informe és breu","conté totes les dades necessàries"],["El producte és econòmic","ofereix una bona qualitat"],["Estava molt cansada","va acabar la cursa"],["La norma sembla clara","genera interpretacions diferents"],["No compartim el diagnòstic","acceptarem la decisió"],["La sala era sorollosa","la presentació es va entendre bé"],["El projecte comporta riscos","pot generar molts beneficis"],["L'accés és complicat","el paisatge compensa l'esforç"],["Les vendes han baixat","l'empresa contractarà personal"],["No és una solució definitiva","permet guanyar temps"]]},
 {rel:"addició",c:"a més",d:["malgrat això","perquè"],items:[
 ["Ha redactat l'informe","hi ha incorporat tots els annexos"],["El curs és gratuït","ofereix material en línia"],["La mesura redueix el consum","millora la seguretat"],["Domina l'anglès","parla alemany amb fluïdesa"],["Han renovat la façana","han reparat la teulada"],["El programa és intuïtiu","funciona en dispositius mòbils"],["La biblioteca amplia l'horari","obrirà els diumenges"],["Ha obtingut la millor nota","ha rebut una menció especial"],["El barri disposa de metro","té diverses línies d'autobús"],["L'acord millora els salaris","redueix la jornada laboral"],["La reforma crea més espai","aprofita millor la llum natural"],["L'estudi aporta dades noves","proposa mesures concretes"],["El museu ha renovat l'exposició","ha creat una visita virtual"],["La convocatòria ofereix cent places","inclou una borsa de reserva"],["El vehicle consumeix poc","emet menys contaminants"],["Han netejat el bosc","han senyalitzat els camins"],["La plataforma permet fer tràmits","envia avisos automàtics"],["La dieta és equilibrada","resulta fàcil de seguir"],["L'equip ha reduït els errors","ha accelerat els lliuraments"],["El pla protegeix el patrimoni","promou el comerç local"]]},
 {rel:"exemplificació",c:"per exemple",d:["en conseqüència","en canvi"],items:[
 ["Algunes mesures permeten estalviar energia","apagar els llums innecessaris"],["Hi ha fruites riques en vitamina C","la taronja"],["Diversos oficis requereixen precisió manual","la rellotgeria"],["Alguns tràmits es poden fer en línia","demanar un certificat"],["Moltes aus migren a la tardor","les orenetes"],["Certs materials són bons aïllants","el suro"],["Algunes activitats milloren la resistència","nedar"],["Hi ha fonts d'energia renovable","la solar"],["Diversos connectors expressen contrast","tanmateix"],["Alguns residus s'han de dur a la deixalleria","les piles"],["Moltes plantes aromàtiques són mediterrànies","la farigola"],["Certes dades són especialment sensibles","les mèdiques"],["Hi ha mesures per reduir el trànsit","ampliar el transport públic"],["Algunes paraules porten dièresi","veïna"],["Diversos mamífers hibernen","la marmota"],["Hi ha documents que exigeixen signatura","el contracte"],["Alguns aliments contenen molt de ferro","les llenties"],["Certes despeses són deduïbles","les vinculades a l'activitat"],["Hi ha eines per comprovar l'ortografia","els diccionaris normatius"],["Alguns espais naturals tenen protecció especial","els parcs nacionals"]]}
];
for(const group of connectorGroups) for(const [left,right] of group.items){
 const prompt=group.rel==="causa"?left+" ___ "+right+".":group.rel==="exemplificació"?left+", ___, "+right+".":left+"; ___, "+right+".";
 add("connectors",prompt,[group.d[0],group.c,group.d[1]],1,
  "«"+group.c+"» introdueix una relació de "+group.rel+".",connSource,"cohesió textual");
}

const lexPairs=[
["abertura","obertura"],["garantitzar","garantir"],["aconteixement","esdeveniment"],["acostumbrar","acostumar"],["adelantar","avançar"],
["ademés","a més"],["agotar","esgotar"],["agravar","agreujar"],["albedrío","albir"],["alcançar","assolir"],
["algo","alguna cosa"],["ambos","ambdós"],["amparo","empara"],["àngul","angle"],["aplaçar","ajornar"],
["apoiar","donar suport"],["arrepentir-se","penedir-se"],["retràs","retard"],["hassanya","proesa"],["bisagra","frontissa"],
["búsqueda","recerca"],["calificar","qualificar"],["calitat","qualitat"],["cantitat","quantitat"],["casi","gairebé"],
["ganader","ramader"],["humillar","humiliar"],["crusar","creuar"],["cuidadós","acurat"],["demés","la resta"],
["derribar","enderrocar"],["derrotxar","malbaratar"],["desarrollar","desenvolupar"],["desde luego","per descomptat"],["jusgat","jutjat"],
["desetxar","rebutjar"],["despejar","aclarir"],["deuda","deute"],["donar-se compte","adonar-se"],["insertar","inserir"],
["enchufe","endoll"],["enfermetat","malaltia"],["en ves de","en lloc de"],["extranger","estranger"],["extrany","estrany"],
["fallo","errada"],["fetxa","data"],["financiar","finançar"],["fronterís","fronterer"],["fulla de paper","full de paper"]
];
for(let i=0;i<50;i++){const [w,c]=lexPairs[i],n=lexPairs[(i+17)%50];
 add("lexic","Quina és l'alternativa catalana normativa a «"+w+"»?",[c,w,n[1]],0,"La forma adequada és «"+c+"».",lexSource,"barbarismes");
 add("lexic","Quina correspondència és íntegrament correcta?",[w+" → "+c,n[0]+" → "+n[0],w+" → "+n[1]],0,
  "La correspondència normativa és «"+w+" → "+c+"».",lexSource,"revisió lèxica");
}

if(out.length!==850) throw new Error("El banc equilibrat ha de tenir 850 registres i en té "+out.length);
await writeFile(new URL("../content/questions/c1-equilibrat-850.json",import.meta.url),JSON.stringify(out,null,2)+"\n");
console.log("Generat banc equilibrat de "+out.length+" exercicis.");
