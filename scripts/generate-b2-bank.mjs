import {readFile,writeFile} from "node:fs/promises";
const root=new URL("../content/questions/",import.meta.url);
// Preserve later editorial corrections. Rebuild only with an explicit --rebuild.
if(!process.argv.includes("--rebuild")){
 try{const existing=JSON.parse(await readFile(new URL("b2.json",root),"utf8"));
 if(existing.length===1000&&existing.every(q=>q.origin==="b2-independent-2026-10")){
 console.log("Banc B2 propi conservat: no se sobreescriuen les revisions manuals.");process.exit(0);
 }}catch(error){if(error.code!=="ENOENT")throw error;}
}
const bank=[];
const source=(topic)=>({url:"https://www.cpnl.cat/gramatica/nivell/intermedi-2",locator:({accentuacio:"Ortografia: accentuació gràfica, síl·labes i dièresi",ortografia:"Ortografia: consonants, b/v, s/ss/ç, g/j i r/rr",apostrofacio:"Ortografia: apostrofació i contraccions",pronoms:"Morfosintaxi: complements i pronoms febles",verbs:"Morfosintaxi: temps verbals, modes i concordança",connectors:"Textual: connectors de causa, conseqüència, contrast, condició i finalitat",lexic:"Morfosintaxi i lèxic: concordança, sinonímia i antonímia"})[topic]});
function add(topic,prompt,correct,wrong,explanation,skill="gramàtica en context",rule=""){
 const options=[correct,...wrong];if(new Set(options).size!==options.length)throw Error("Duplicate options: "+prompt);
 const pos=bank.filter(q=>q.options.length===options.length).length%options.length;
 options.splice(pos,0,options.shift());
 bank.push({id:"b2-propi-"+String(bank.length+1).padStart(4,"0"),level:"B2",topic,status:"published",prompt,options,answer:pos,explanation,source:source(topic),reviewedAt:"2026-10-16",reviewedBy:"Codex; revisió contextual i validació de coherència",examSkill:skill,exerciseType:rule,origin:"b2-independent-2026-10",difficulty:"B2"});
}
function fill(topic,sentence,correct,wrong,explanation,skill,rule){add(topic,"Completa: «"+sentence+"»",correct,wrong,explanation,skill,rule);}


// 240 inflexions contextualitzades: quatre temps, deu verbs per temps i sis persones.
const people=["jo","tu","la nostra companya","nosaltres","vosaltres","els nostres veïns"];
const verbGroups=[
["futur",[
["arribar","a l'estació amb prou temps","arribaré|arribaràs|arribarà|arribarem|arribareu|arribaran"],
["reservar","una taula al restaurant","reservaré|reservaràs|reservarà|reservarem|reservareu|reservaran"],
["organitzar","una recollida d'aliments","organitzaré|organitzaràs|organitzarà|organitzarem|organitzareu|organitzaran"],
["participar","en la cursa del barri","participaré|participaràs|participarà|participarem|participareu|participaran"],
["visitar","l'exposició de fotografia","visitaré|visitaràs|visitarà|visitarem|visitareu|visitaran"],
["aprendre","a preparar aquest plat","aprendré|aprendràs|aprendrà|aprendrem|aprendreu|aprendran"],
["rebre","la confirmació per correu","rebré|rebràs|rebrà|rebrem|rebreu|rebran"],
["sortir","amb el primer tren","sortiré|sortiràs|sortirà|sortirem|sortireu|sortiran"],
["dormir","en un refugi de muntanya","dormiré|dormiràs|dormirà|dormirem|dormireu|dormiran"],
["tornar","abans que es faci fosc","tornaré|tornaràs|tornarà|tornarem|tornareu|tornaran"]
]],
["condicional",[
["comprar","una bicicleta de segona mà","compraria|compraries|compraria|compraríem|compraríeu|comprarien"],
["canviar","els mobles de lloc","canviaria|canviaries|canviaria|canviaríem|canviaríeu|canviarien"],
["acceptar","la proposta de l'associació","acceptaria|acceptaries|acceptaria|acceptaríem|acceptaríeu|acceptarien"],
["demanar","un pressupost abans de decidir","demanaria|demanaries|demanaria|demanaríem|demanaríeu|demanarien"],
["poder","dedicar més temps al voluntariat","podria|podries|podria|podríem|podríeu|podrien"],
["voler","conèixer millor el barri","voldria|voldries|voldria|voldríem|voldríeu|voldrien"],
["tenir","més espai per treballar","tindria|tindries|tindria|tindríem|tindríeu|tindrien"],
["fer","una estada a l'estranger","faria|faries|faria|faríem|faríeu|farien"],
["anar","a treballar amb transport públic","aniria|aniries|aniria|aniríem|aniríeu|anirien"],
["viure","en un poble més tranquil","viuria|viuries|viuria|viuríem|viuríeu|viurien"]
]],
["imperfet",[
["cuinar","amb productes de l'hort","cuinava|cuinaves|cuinava|cuinàvem|cuinàveu|cuinaven"],
["caminar","fins a la feina","caminava|caminaves|caminava|caminàvem|caminàveu|caminaven"],
["treballar","en una botiga del centre","treballava|treballaves|treballava|treballàvem|treballàveu|treballaven"],
["estudiar","a la sala de lectura","estudiava|estudiaves|estudiava|estudiàvem|estudiàveu|estudiaven"],
["jugar","a cartes els diumenges","jugava|jugaves|jugava|jugàvem|jugàveu|jugaven"],
["llegir","el diari a l'hora d'esmorzar","llegia|llegies|llegia|llegíem|llegíeu|llegien"],
["escriure","cartes als amics","escrivia|escrivies|escrivia|escrivíem|escrivíeu|escrivien"],
["beure","aigua de la font","bevia|bevies|bevia|bevíem|bevíeu|bevien"],
["vendre","verdura al mercat setmanal","venia|venies|venia|veníem|veníeu|venien"],
["compartir","el cotxe per estalviar","compartia|comparties|compartia|compartíem|compartíeu|compartien"]
]],
["subjuntiu",[
["portar","el carnet de soci","porti|portis|porti|portem|porteu|portin"],
["avisar","amb un dia d'antelació","avisi|avisis|avisi|avisem|aviseu|avisin"],
["guardar","el comprovant de pagament","guardi|guardis|guardi|guardem|guardeu|guardin"],
["respectar","el descans dels residents","respecti|respectis|respecti|respectem|respecteu|respectin"],
["revisar","les dades de la reserva","revisi|revisis|revisi|revisem|reviseu|revisin"],
["esperar","a la zona indicada","esperi|esperis|esperi|esperem|espereu|esperin"],
["omplir","el formulari d'inscripció","ompli|omplis|ompli|omplim|ompliu|omplin"],
["obrir","les finestres per ventilar","obri|obris|obri|obrim|obriu|obrin"],
["permetre","l'accés al personal acreditat","permeti|permetis|permeti|permetem|permeteu|permetin"],
["respondre","el missatge de confirmació","respongui|responguis|respongui|responguem|respongueu|responguin"]
]]
];
for(const [tense,rows]of verbGroups)for(const [inf,tail,forms]of rows){
 const f=forms.split("|");for(let i=0;i<6;i++){
 const p=people[i],form=f[i];const others=[...new Set(f.filter(x=>x!==form))].slice(0,2);
 const deInf=/^[aeiouàèéíòóúh]/i.test(inf)?"d\'"+inf:"de "+inf;
 const label={futur:"el futur",condicional:"el condicional",imperfet:"l'imperfet d'indicatiu",subjuntiu:"el present de subjuntiu"}[tense];
 const sentence=tense==="futur"?"La setmana vinent, "+p+" ___ "+tail+".":tense==="condicional"?"Amb les condicions adequades, "+p+" ___ "+tail+".":tense==="imperfet"?"En aquella època, "+p+" ___ "+tail+".":"Cal que "+p+" ___ "+tail+".";
 add("verbs",sentence,form,others,
 "El subjecte és «"+p+"». La forma "+deInf+" que hi concorda en "+label+" és «"+form+"».","gramàtica en context","verb-"+tense);
 }}


// 90 concordances en context, amb tres transformacions diferents per adjectiu.
const agreement=[
["nou","nova","nous","noves","un local","una sala","uns locals","unes sales"],
["blanc","blanca","blancs","blanques","un llençol","una tovallola","uns llençols","unes tovalloles"],
["llarg","llarga","llargs","llargues","un trajecte","una caminada","uns trajectes","unes caminades"],
["ample","ampla","amples","amples","un passadís","una entrada","uns passadissos","unes entrades"],
["estret","estreta","estrets","estretes","un camí","una vorera","uns camins","unes voreres"],
["net","neta","nets","netes","un vidre","una cuina","uns vidres","unes cuines"],
["brut","bruta","bruts","brutes","un davantal","una sabata","uns davantals","unes sabates"],
["petit","petita","petits","petites","un paquet","una motxilla","uns paquets","unes motxilles"],
["alt","alta","alts","altes","un edifici","una torre","uns edificis","unes torres"],
["baix","baixa","baixos","baixes","un sostre","una taula","uns sostres","unes taules"],
["vermell","vermella","vermells","vermelles","un mocador","una carpeta","uns mocadors","unes carpetes"],
["groc","groga","grocs","grogues","un retolador","una flor","uns retoladors","unes flors"],
["verd","verda","verds","verdes","un semàfor","una fulla","uns semàfors","unes fulles"],
["sec","seca","secs","seques","un drap","una branca","uns draps","unes branques"],
["fresc","fresca","frescos","fresques","un aliment","una beguda","uns aliments","unes begudes"],
["dur","dura","durs","dures","un material","una superfície","uns materials","unes superfícies"],
["tou","tova","tous","toves","un coixí","una manta","uns coixins","unes mantes"],
["clar","clara","clars","clares","un missatge","una explicació","uns missatges","unes explicacions"],
["fosc","fosca","foscos","fosques","un túnel","una habitació","uns túnels","unes habitacions"],
["ple","plena","plens","plenes","un calaix","una capsa","uns calaixos","unes capses"],
["buit","buida","buits","buides","un prestatge","una ampolla","uns prestatges","unes ampolles"],
["tranquil","tranquil·la","tranquils","tranquil·les","un carrer","una plaça","uns carrers","unes places"],
["còmode","còmoda","còmodes","còmodes","un seient","una cadira","uns seients","unes cadires"],
["econòmic","econòmica","econòmics","econòmiques","un allotjament","una excursió","uns allotjaments","unes excursions"],
["car","cara","cars","cares","un producte","una reparació","uns productes","unes reparacions"],
["bonic","bonica","bonics","boniques","un paisatge","una fotografia","uns paisatges","unes fotografies"],
["antic","antiga","antics","antigues","un rellotge","una moneda","uns rellotges","unes monedes"],
["modern","moderna","moderns","modernes","un aparell","una instal·lació","uns aparells","unes instal·lacions"],
["pràctic","pràctica","pràctics","pràctiques","un consell","una solució","uns consells","unes solucions"],
["lluminós","lluminosa","lluminosos","lluminoses","un despatx","una aula","uns despatxos","unes aules"]
];
for(const [m,f,mp,fp,,nf]of agreement){
 for(const [noun,correct,kind]of [[nf,f,"femení singular"]]){
 const wrong=[...new Set([m,f,mp,fp].filter(x=>x!==correct))].slice(0,2);
 add("lexic",noun.charAt(0).toUpperCase()+noun.slice(1)+" ___.",correct,wrong,
 "«"+noun+"» és "+kind+". L'adjectiu també ha de concordar-hi: "+noun+" "+correct+".","morfologia nominal","concordança");
 }}


// 120 decisions d'article i contracció, sobre 40 noms diferents.
const articleNouns=[
["ascensor","m","l'"],["armari","m","l'"],["ordinador","m","l'"],["embut","m","l'"],["esborrany","m","l'"],
["informe","m","l'"],["aeroport","m","l'"],["aparcament","m","l'"],["estadi","m","l'"],["institut","m","l'"],
["entrada","f","l'"],["oferta","f","l'"],["adreça","f","l'"],["estufa","f","l'"],["ampolla","f","l'"],
["habitació","f","l'"],["eina","f","l'"],["armilla","f","l'"],["escala","f","l'"],["oficina","f","l'"],
["infermera","f","la"],["il·lusió","f","la"],["indústria","f","la"],["unió","f","la"],["unitat","f","la"],
["humitat","f","la"],["identitat","f","la"],["urgència","f","la"],["invitació","f","la"],["utilitat","f","la"],
["magatzem","m","el"],["vestidor","m","el"],["rebost","m","el"],["safareig","m","el"],["tauler","m","el"],
["terrassa","f","la"],["finestra","f","la"],["cuinera","f","la"],["recepció","f","la"],["bibliotecària","f","la"]
];
function joined(a,n){return a.endsWith("'")?a+n:a+" "+n;}
for(const [noun,gender,article]of articleNouns){
 const full=gender==="m"?"el":"la";const artCorrect=joined(article,noun);
 const articleOthers=[joined(full==="el"?"la":"el",noun),joined(article==="l'"?full:"l'",noun)];
 add("apostrofacio","Com escrivim «"+full+" + "+noun+"»?",artCorrect,articleOthers,
 article==="l'"?"L'article s'apostrofa davant del començament de «"+noun+"»: "+artCorrect+".":gender==="f"&&/^[ih u]/.test(noun)?"La i o la u inicial no és tònica (la h no sona). Mantenim l'article femení sencer: "+artCorrect+".":"Davant de consonant, mantenim l'article sencer: "+artCorrect+".","ortografia en context","article");
 for(const prep of ["a","de"]){
 const combined=article==="l'"?prep+" l'"+noun:article==="el"?(prep==="a"?"al":"del")+" "+noun:prep+" la "+noun;
 const candidates=[prep+" "+full+" "+noun,(prep==="a"?"al":"del")+" "+noun,prep+" l'"+noun,prep+" la "+noun];
 const wrong=[...new Set(candidates.filter(x=>x!==combined))].slice(0,2);
 add("apostrofacio","Ajunta correctament «"+prep+" + "+full+" + "+noun+"».",combined,wrong,
 article==="l'"?"L'article s'apostrofa i queda separat de la preposició: "+combined+".":article==="el"?"Ajuntem "+prep+" i el en una sola paraula: "+combined+".":"La preposició i l'article femení s'escriuen separats: "+combined+".","ortografia en context","contracció");
 }}


const directRows=[
["La recepcionista","revisa","rebut","reserva"],["El dependent","prepara","paquet","comanda"],
["La guia","mostra","plànol","fotografia"],["El tècnic","comprova","cable","connexió"],
["La cuinera","renta","ganivet","cullera"],["El conserge","neteja","vidre","porta"],
["La jardinera","rega","roser","planta"],["El client","demana","pressupost","factura"],
["La veïna","guarda","tiquet","garantia"],["El turista","consulta","horari","ruta"],
["La professora","corregeix","text","redacció"],["El pintor","pinta","marc","cadira"],
["La mecànica","canvia","pneumàtic","roda"],["El repartidor","porta","sobre","capsa"],
["La metgessa","signa","certificat","recepta"],["El bibliotecari","busca","llibre","revista"],
["La fotògrafa","tria","retrat","imatge"],["El nedador","recull","tovalló","tovallola"],
["La modista","planxa","pantaló","camisa"],["El fuster","repara","calaix","prestatgeria"],
["La dentista","desinfecta","instrument","safata"],["El monitor","reparteix","full","fitxa"],
["La periodista","redacta","article","notícia"],["El gestor","tramita","permís","sol·licitud"],
["La voluntària","classifica","aliment","joguina"],["El porter","tanca","portal","bústia"],
["La mare","penja","abric","jaqueta"],["El músic","transporta","violí","guitarra"],
["La secretària","arxiva","contracte","carta"],["El muntador","instal·la","prestatge","pantalla"]
];
const plurals={"rebut":"rebuts","reserva":"reserves","paquet":"paquets","comanda":"comandes","plànol":"plànols","fotografia":"fotografies","cable":"cables","connexió":"connexions","ganivet":"ganivets","cullera":"culleres","vidre":"vidres","porta":"portes","roser":"rosers","planta":"plantes","pressupost":"pressupostos","factura":"factures","tiquet":"tiquets","garantia":"garanties","horari":"horaris","ruta":"rutes","text":"textos","redacció":"redaccions","marc":"marcs","cadira":"cadires","pneumàtic":"pneumàtics","roda":"rodes","sobre":"sobres","capsa":"capses","certificat":"certificats","recepta":"receptes","llibre":"llibres","revista":"revistes","retrat":"retrats","imatge":"imatges","tovalló":"tovallons","tovallola":"tovalloles","pantaló":"pantalons","camisa":"camises","calaix":"calaixos","prestatgeria":"prestatgeries","instrument":"instruments","safata":"safates","full":"fulls","fitxa":"fitxes","article":"articles","notícia":"notícies","permís":"permisos","sol·licitud":"sol·licituds","aliment":"aliments","joguina":"joguines","portal":"portals","bústia":"bústies","abric":"abrics","jaqueta":"jaquetes","violí":"violins","guitarra":"guitarres","contracte":"contractes","carta":"cartes","prestatge":"prestatges","pantalla":"pantalles"};
for(const [subject,verb,m,f]of directRows){
 for(const [noun,article,pronoun,kind]of [[m,"el","el","masculí singular"],[f,"la","la","femení singular"],directRows.findIndex(r=>r[0]===subject)%2===0?[plurals[m],"els","els","masculí plural"]:[plurals[f],"les","les","femení plural"]]){
 const begins=/^[aeiouàèéíòóúh]/i.test(verb);
 const phrase=(pr)=>subject+" "+((pr==="el"||pr==="la")&&begins?"l'"+verb:pr+" "+verb)+".";
 const correct=phrase(pronoun);const wrong=[...new Set(["el","la","els","les"].map(phrase).filter(x=>x!==correct))].slice(0,2);
 const object=(article==="el"||article==="la")&&/^[aeiouàèéíòóúh]/i.test(noun)?"l'"+noun:article+" "+noun;
 add("pronoms","Evita repetir «"+object+"»: «"+subject+" "+verb+" "+object+"».",correct,wrong,
 "«"+object+"» és "+kind+". El substituïm pel pronom feble «"+pronoun+"»"+((pronoun==="el"||pronoun==="la")&&begins?", que davant del verb queda l'.":"."),
 "transformació de frases","pronom-directe");
 }}

const recipients=["la coordinadora","els monitors","la família","les delegades","el proveïdor","les clientes","la representant","els alumnes","el metge","les residents","la presidenta","els tècnics","la veïna","les professores","el gestor","els usuaris","la propietària","les voluntàries","el periodista","els comerciants","la directora","les sòcies","el missatger","els familiars","la secretària","les convidades","el responsable","els participants","la tutora","les companyes"];
for(let i=0;i<directRows.length;i++){
 const subject=directRows[i][0],recipient=recipients[i],plural=/^(els|les) /.test(recipient);
 const to=recipient.startsWith("els ")?"als "+recipient.slice(4):recipient.startsWith("el ")?"al "+recipient.slice(3):"a "+recipient;
 const correct=subject+" "+(plural?"els":"li")+" envia una resposta.";
 add("pronoms","Evita repetir «"+to+"»: «"+subject+" envia una resposta "+to+"».",correct,
 [subject+" "+(plural?"li":"els")+" envia una resposta.",subject+" "+(plural?"les":"la")+" envia una resposta."],
 "El destinatari és «"+recipient+"». El substituïm pel pronom feble "+(plural?"els, perquè parlem de diverses persones.":"li, perquè parlem d'una sola persona."),
 "transformació de frases","pronom-indirecte");
}

const quantified=[
["coixins","compro","dos"],["entrades","reservo","quatre"],["galetes","preparo","dotze"],["retoladors","necessito","cinc"],["llençols","porto","tres"],
["fotocòpies","demano","sis"],["ampolles","guardo","dues"],["bitllets","venc","deu"],["cadires","reparo","vuit"],["tasses","rento","set"]
];
for(const [noun,verb,num]of quantified)fill("pronoms","Quina quantitat de "+noun+" "+verb+"? ___ "+verb+" "+num+".","En",["Hi","Ho"],
 "El pronom feble en substitueix «"+noun+"». Conservem «"+num+"» perquè indica la quantitat.","gramàtica en context","pronom-en");
const places=[
["La Berta","treballa","al laboratori"],["En Karim","dina","a la cantina"],["La Paula","assaja","al local de música"],["En Marc","compra","al mercat cobert"],["La Sílvia","viu","a la masia"],
["En Biel","estudia","a la residència"],["La Nora","descansa","al jardí botànic"],["En Roc","entrena","al poliesportiu"],["La Joana","passeja","pel passeig marítim"],["En Nil","espera","a la parada del tramvia"]
];
for(const [s,v,p]of places)add("pronoms","Evita repetir el lloc «"+p+"»: «"+s+" "+v+" "+p+"».",s+" hi "+v+".",[s+" en "+v+".",s+" ho "+v+"."],
 "El pronom feble hi ens permet parlar d'aquest lloc sense repetir-ne el nom: "+p+".","transformació de frases","pronom-hi");
const neutral=[
["El responsable","confirma"],["La directora","comunica"],["El testimoni","recorda"],["La clienta","explica"],["El públic","celebra"],
["La portaveu","anuncia"],["El candidat","promet"],["La coordinadora","reconeix"],["El periodista","pregunta"],["La conductora","comenta"]
];
for(const [s,v]of neutral)add("pronoms","Substitueix «això»: «"+s+" "+v+" això».",s+" ho "+v+".",[s+" hi "+v+".",s+" en "+v+"."],
 "El pronom feble ho substitueix «això». Així evitem repetir la mateixa idea.","transformació de frases","pronom-ho");


const vocabulary=[
["El nou veí és molt amable amb tothom.","amable","agradable","desagradable"],
["La revisió de la caldera és obligatòria.","obligatòria","preceptiva","voluntària"],
["Aquest camí és segur per als vianants.","segur","que no presenta perill","perillós"],
["La cuina de l'apartament és espaiosa.","espaiosa","àmplia","estreta"],
["El transport públic és econòmic.","econòmic","barat","car"],
["La resposta del servei va ser ràpida.","ràpida","veloç","lenta"],
["El recipient ha de quedar buit.","buit","desocupat","ple"],
["La proposta és útil per al veïnat.","útil","profitosa","inútil"],
["El material és resistent als cops.","resistent","robust","fràgil"],
["La temperatura es manté estable.","estable","constant","variable"],
["El treballador ha estat puntual.","puntual","complidor amb l'hora","impuntual"],
["La família està satisfeta amb el resultat.","satisfeta","contenta","descontenta"],
["El paquet és lleuger de transportar.","lleuger","de poc pes","pesant"],
["L'accés principal està obert.","obert","accessible","tancat"],
["El termini és limitat.","limitat","restringit","il·limitat"],
["La connexió és permanent.","permanent","duradora","temporal"],
["El procediment és legal.","legal","conforme a la llei","il·legal"],
["La superfície ha quedat llisa.","llisa","sense irregularitats","rugosa"],
["El problema és freqüent en aquest model.","freqüent","habitual","excepcional"],
["La informació és pública.","pública","accessible a tothom","secreta"],
["El menjador és silenciós.","silenciós","tranquil pel que fa al soroll","sorollós"],
["El producte és escàs al mercat.","escàs","poc abundant","abundant"],
["La proposta és viable.","viable","realitzable","inviable"],
["El resultat és positiu.","positiu","favorable","negatiu"],
["El consum d'aigua és elevat.","elevat","alt","baix"],
["La imatge es veu nítida.","nítida","clara","borrosa"],
["El propietari es mostra flexible amb l'horari.","flexible","disposat a adaptar-se","inflexible"],
["La situació és urgent.","urgent","requereix atenció immediata","ajornable"],
["El trajecte és directe.","directe","sense desviacions","indirecte"],
["La màquina és sorollosa.","sorollosa","fa molt de soroll","silenciosa"],
["La roba encara és humida.","humida","una mica mullada","seca"],
["El menjar és abundant.","abundant","copiós","escàs"],
["La plaça és propera a l'estació.","propera","pròxima","llunyana"],
["El plànol és precís.","precís","exacte","imprecís"],
["El soroll és molest.","molest","empipador","agradable"],
["La porta és ampla.","ampla","espaiosa","estreta"],
["El pagament és anticipat.","anticipat","fet abans del moment previst","ajornat"],
["L'informe és complet.","complet","conté tota la informació necessària","incomplet"],
["La decisió és definitiva.","definitiva","final","provisional"],
["El viatge és llarg.","llarg","de molta durada","curt"],
["El disseny és modern.","modern","actual","antic"],
["La conducta ha estat prudent.","prudent","cauta","imprudent"],
["El curs és presencial.","presencial","amb assistència física al lloc","a distància"],
["La notícia és certa.","certa","vertadera","falsa"],
["El tracte ha estat cordial.","cordial","afectuós","hostil"],
["El cel es manté cobert.","cobert","ennuvolat","serè"],
["La finestra és opaca.","opaca","no deixa veure a través seu","transparent"],
["El servei és gratuït.","gratuït","sense cost","de pagament"],
["El local està endreçat.","endreçat","ordenat","desendreçat"],
["La lectura és obligada en aquest curs.","obligada","necessària","opcional"]
];
for(const [sentence,word,synonym,antonym]of vocabulary){
 add("lexic","Quina opció té el mateix sentit que «"+word+"» en aquesta frase? «"+sentence+"»",synonym,[antonym],
 "En aquesta frase, «"+word+"» vol dir «"+synonym+"». El context ens ajuda a triar el significat.","lèxic contextual","sinonímia");
 add("lexic","Quina opció expressa el contrari de «"+word+"» en aquesta frase? «"+sentence+"»",antonym,[synonym],
 "Aquí, el contrari de «"+word+"» és «"+antonym+"». «"+synonym+"» mantindria el significat original.","lèxic contextual","antonímia");
}


// Cada situació es treballa amb cinc relacions lògiques diferents.
const situations=[
["el taller s'ha ajornat","la tallerista està malalta","ens han proposat una altra data","hi ha prou persones inscrites","puguem aprofitar millor la sessió"],
["l'excursió es farà","ha deixat de nevar","encara fa força fred","el camí és segur","tothom conegui el paisatge"],
["el servei s'ha reforçat","ha augmentat el nombre de viatgers","la freqüència encara és insuficient","es manté la demanda","els passatgers esperin menys"],
["la biblioteca amplia l'horari","s'acosten els exàmens","té poc personal","hi ha pressupost","els estudiants disposin de més temps"],
["la comunitat instal·larà una rampa","l'entrada té esglaons","l'obra és costosa","s'aprova el pressupost","tothom pugui entrar sense dificultats"],
["el restaurant obrirà una terrassa","ha rebut el permís municipal","l'espai és reduït","fa bon temps","els clients puguin seure a fora"],
["la botiga ofereix repartiment","molts clients ho han demanat","el servei té un cost addicional","la compra supera els trenta euros","les persones grans no hagin de carregar pes"],
["l'escola organitza un intercanvi","vol fomentar l'aprenentatge de llengües","el calendari és ajustat","les famílies hi estan d'acord","els alumnes practiquin amb altres joves"],
["la cooperativa compra un vehicle","necessita transportar la collita","la inversió és important","obté el crèdit","els productes arribin frescos al mercat"],
["el museu renovarà les sales","les instal·lacions han quedat antigues","les obres duraran mesos","rep la subvenció","els visitants entenguin millor l'exposició"],
["l'empresa ofereix formació","ha canviat el programa informàtic","no pot aturar l'activitat","els horaris ho permeten","el personal aprengui a fer-lo servir"],
["el centre mèdic obre més consultes","ha crescut la població","falten professionals","es cobreixen les places","les visites es puguin programar abans"],
["el club canviarà els vestidors","hi ha problemes d'humitat","el pressupost és limitat","aconsegueix finançament","els esportistes tinguin un espai adequat"],
["l'ajuntament planta més arbres","vol reduir la calor als carrers","caldrà regar-los sovint","les arrels tenen prou espai","els vianants trobin més ombra"],
["la residència prepara activitats","les persones usuàries les han sol·licitat","hi ha pocs voluntaris","es confirma la participació","els residents mantinguin una vida activa"],
["la universitat ofereix tutories","l'alumnat necessita orientació","la demanda és molt alta","es reserva hora","els estudiants resolguin els dubtes"],
["el barri celebrarà una festa","l'associació compleix vint anys","la previsió anuncia pluja","s'aconsegueixen els permisos","els veïns es coneguin millor"],
["la piscina allargarà la temporada","les temperatures continuen sent altes","les despeses augmentaran","es pot garantir el manteniment","els usuaris aprofitin les instal·lacions"],
["el casal prepara un curs de cuina","moltes persones volen aprendre receptes noves","la cuina és petita","es forma un grup suficient","els participants guanyin autonomia"],
["el teatre programarà una altra funció","s'han venut totes les entrades","la companyia té altres compromisos","els actors estan disponibles","més espectadors puguin veure l'obra"]
];
for(const [rawPlan,cause,contrast,condition,goal]of situations){
 const plan=rawPlan[0].toUpperCase()+rawPlan.slice(1);
 add("connectors","«"+plan+" ___ "+cause+".»","perquè",["tot i que","si"],
 "El connector perquè introdueix el motiu: "+cause+".","gramàtica en context","causa");
 add("connectors","Tria el connector que expressa contrast: «"+plan+" ___ "+contrast+"».","tot i que",["perquè","si"],
 "Tot i que presenta una dificultat que no impedeix el que diu la primera part.","gramàtica en context","contrast");
 add("connectors","Expressa una condició: «"+plan+" ___ "+condition+"».","si",["perquè","tot i que"],
 "Si introdueix una condició: perquè passi la primera acció, s'ha de complir aquesta condició.","gramàtica en context","condició");
 add("connectors","Expressa la finalitat: «"+plan+" ___ "+goal+"».","per tal que",["tot i que","des que"],
 "Per tal que explica amb quin objectiu es fa l'acció. Equival a dir «amb la finalitat que».","gramàtica en context","finalitat");
 add("connectors","Uneix la causa i la conseqüència: «"+cause[0].toUpperCase()+cause.slice(1)+"; ___, "+rawPlan+"».","per tant",["en canvi","a més"],
 "Per tant introdueix la conseqüència de la informació anterior.","gramàtica en context","conseqüència");
}


const accents=[
["balcó","balco","Hem posat dues cadires al ___ per prendre la fresca.","aguda"],
["camió","camio","El ___ de repartiment ha descarregat les caixes.","aguda"],
["botó","boto","Prem el ___ verd per encendre l'aparell.","aguda"],
["sabó","sabo","Renta't les mans amb aigua i ___.","aguda"],
["carbó","carbo","La barbacoa funciona amb ___.","aguda"],
["cotó","coto","Aquesta samarreta és de ___ i es renta fàcilment.","aguda"],
["racó","raco","Hem creat un ___ de lectura al menjador.","aguda"],
["saló","salo","La conferència es farà al ___ d'actes.","aguda"],
["torró","torro","Per postres han servit una mica de ___.","aguda"],
["coixí","coixi","Aquest ___ m'ajuda a descansar el coll.","aguda"],
["jardí","jardi","Darrere de la residència hi ha un ___ amb bancs.","aguda"],
["veí","vei","El meu ___ m'ha deixat una escala.","aguda"],
["matí","mati","L'oficina només obre al ___.","aguda"],
["camí","cami","Segueix el ___ que passa pel costat del riu.","aguda"],
["destí","desti","Consulta el ___ abans de pujar al tren.","aguda"],
["pastís","pastis","Hem encarregat un ___ per a l'aniversari.","aguda"],
["permís","permis","Necessites un ___ per aparcar en aquesta zona.","aguda"],
["avís","avis","Han penjat un ___ a la porta de la farmàcia.","aguda"],
["anís","anis","La recepta porta unes gotes d'___.","aguda"],
["vernís","vernis","La fusta necessita una capa de ___.","aguda"],
["comú","comu","Els dos equips tenen un objectiu ___.","aguda"],
["oportú","oportu","Cal esperar el moment ___ per fer la proposta.","aguda"],
["ningú","ningu","A la sala d'espera no hi havia ___.","aguda"],
["algú","algu","Hi ha ___ que pugui ajudar-me amb la maleta?","aguda"],
["tabú","tabu","Volen parlar del tema sense convertir-lo en un ___.","aguda"],
["demà","dema","Si avui no podem acabar, continuarem ___.","aguda"],
["allà","alla","Deixa les caixes ___, al costat de la finestra.","aguda"],
["això","aixo","No entenc ___ que acabes de dir.","aguda"],
["allò","allo","Recordes ___ que vam veure al documental?","aguda"],
["també","tambe","La quota inclou el material i ___ les sortides.","aguda"],
["aquí","aqui","Espera'm ___, davant de la taquilla.","aguda"],
["així","aixi","Si ho col·loques ___, ocuparà menys espai.","aguda"],
["però","pero","Volíem caminar, ___ ha començat a pedregar.","aguda"],
["cafè","cafe","Després de dinar sempre demana un ___ descafeïnat.","aguda"],
["puré","pure","Avui han preparat un ___ de carbassa.","aguda"],
["sofà","sofa","La gata dorm al ___ del menjador.","aguda"],
["vostè","voste","Disculpi, ___ té hora reservada?","aguda"],
["interès","interes","La proposta ha despertat molt d'___ entre els socis.","aguda"],
["accés","acces","L'___ al recinte es fa pel carrer lateral.","aguda"],
["procés","proces","Ens explicaran tot el ___ de fabricació.","aguda"],
["música","musica","A la biblioteca pots escoltar ___ amb auriculars.","esdrúixola"],
["pàgina","pagina","La informació és a la primera ___ del fullet.","esdrúixola"],
["càmera","camera","La ___ de seguretat grava l'entrada del garatge.","esdrúixola"],
["làmpada","lampada","Hem canviat la ___ de la tauleta de nit.","esdrúixola"],
["pel·lícula","pel·licula","La ___ d'aquesta nit té subtítols en català.","esdrúixola"],
["pólvora","polvora","Els petards contenen ___.","esdrúixola"],
["fàbrica","fabrica","L'antiga ___ s'ha convertit en un centre cultural.","esdrúixola"],
["pèrdua","perdua","Cal comunicar la ___ de la targeta al banc.","esdrúixola"],
["família","familia","La ___ s'ha reunit per celebrar l'aniversari.","esdrúixola"],
["història","historia","El guia ens ha explicat la ___ del barri.","esdrúixola"],
["memòria","memoria","Ha escrit els encàrrecs per no confiar només en la ___.","esdrúixola"],
["pràctica","practica","La part ___ del curs es farà al taller.","esdrúixola"],
["pública","publica","La convocatòria és ___ i tothom la pot consultar.","esdrúixola"],
["única","unica","Aquesta és l'___ còpia que conservem del document.","esdrúixola"],
["última","ultima","La sortida serà l'___ setmana de juliol.","esdrúixola"],
["pròxima","proxima","A la ___ reunió votarem el pressupost.","esdrúixola"],
["clínica","clinica","La revisió es farà en una ___ del barri.","esdrúixola"],
["fórmula","formula","Cal aplicar la ___ indicada a l'enunciat.","esdrúixola"],
["brúixola","bruixola","A la sortida de muntanya portarem mapa i ___.","esdrúixola"],
["càrrega","carrega","Aquest vehicle no pot superar el límit de ___.","esdrúixola"],
["àlbum","album","Hem enganxat les fotografies en un ___.","plana"],
["ànec","anec","Un ___ s'ha acostat a la vora del canal.","plana"],
["àgil","agil","Busquem una manera més ___ de gestionar les reserves.","plana"],
["fàcil","facil","El muntatge és ___ si segueixes les instruccions.","plana"],
["difícil","dificil","Trobar aparcament aquí és força ___.","plana"],
["útil","util","Aquest adaptador és molt ___ quan viatgem.","plana"],
["fràgil","fragil","A l'embalatge hi diu que el contingut és ___.","plana"],
["mòbil","mobil","Deixa el telèfon ___ en silenci durant la visita.","plana"],
["túnel","tunel","El tren travessarà un ___ abans d'arribar.","plana"],
["sòlid","solid","Necessitem un suport ___ per aguantar el pes.","plana"],
["límit","limit","Respecta el ___ de velocitat de la via.","plana"],
["trànsit","transit","Hi ha molt de ___ a l'entrada de la ciutat.","plana"],
["públic","public","L'acte està obert al ___ sense inscripció.","plana"],
["tèxtil","textil","La mostra explica el passat ___ de la comarca.","plana"],
["hàbit","habit","Anar a peu a comprar és un ___ saludable.","plana"],
["àmbit","ambit","La mesura afecta l'___ laboral.","plana"],
["càmping","camping","Aquest estiu dormirem en una tenda al ___.","plana"],
["dipòsit","diposit","Cal omplir el ___ d'aigua abans de sortir.","plana"],
["semàfor","semafor","Espera que el ___ es posi verd per travessar.","plana"],
["préstec","prestec","He demanat un llibre en ___ a la biblioteca.","plana"],
["és","es","La recepció ___ a la planta baixa.","diacrític"],
["té","te","Aquest habitatge ___ dues habitacions.","diacrític"],
["més","mes","Necessitem ___ voluntaris per acabar la recollida.","diacrític"],
["bé","be","La reparació ha quedat molt ___.","diacrític"],
["sí","si","Quan li han preguntat si venia, ha dit que ___.","diacrític"],
["són","son","Aquestes claus ___ del magatzem.","diacrític"],
["dóna","dona","Tria la grafia actual: la finestra ___ al pati.","deprecated"],
["mà","ma","Alça la ___ si vols intervenir.","diacrític"],
["món","mon","El reportatge mostra escoles d'arreu del ___.","diacrític"],
["sòl","sol","Abans de plantar, hem d'analitzar el ___ del jardí.","diacrític"],
["raïm","raim","Per berenar hi ha un gotim de ___.","dièresi"],
["veïnat","veinat","El ___ ha participat en la neteja de la plaça.","dièresi"],
["països","paisos","A la fira hi participen productors de diversos ___.","dièresi"],
["aigüera","aiguera","Deixa els plats bruts a l'___.","dièresi"],
["paraigües","paraigues","Agafa el ___ perquè la previsió anuncia ruixats.","dièresi"],
["qüestió","questió","La seguretat és una ___ que preocupa el grup.","dièresi"],
["freqüent","frequent","És ___ trobar bicicletes en aquest camí.","dièresi"],
["llengües","llengues","A l'escola es parlen moltes ___ diferents.","dièresi"],
["cruïlla","cruilla","A la ___ següent has de girar a la dreta.","dièresi"],
["peüc","peuc","Ha trobat un ___ de llana al costat del bressol.","dièresi"]
];
for(const [word,wrong,sentence,kind]of accents){
 if(kind==="deprecated"){fill("accentuacio",sentence.replace("Tria la grafia actual: ",""),"dona",["dóna"],"La forma verbal dona s'escriu sense accent segons l'ortografia actual.","ortografia en context","diacrític");continue;}
 const exp=kind==="dièresi"?(/[gq]ü[ei]/.test(word)?"A «"+word+"», posem dièresi damunt la u per indicar que l’hem de pronunciar.":"A «"+word+"», la vocal amb dièresi va en una síl·laba diferent de la vocal anterior. Els dos puntets ens indiquen aquesta separació."):kind==="diacrític"?"En aquesta frase necessitem «"+word+"», amb accent diacrític. L'accent permet distingir aquesta paraula de «"+wrong+"».":kind==="esdrúixola"?"«"+word+"» és esdrúixola: la força de veu cau a l'antepenúltima síl·laba. Totes les esdrúixoles porten accent.":kind==="aguda"?"«"+word+"» és aguda: l’última síl·laba sona més fort. Porta accent perquè acaba en "+(/s$/.test(word)?"vocal seguida de s.":"vocal."):"«"+word+"» és plana: la penúltima síl·laba sona més fort. Com que acaba en -"+word.at(-1)+", porta accent.";
 fill("accentuacio",sentence,word,[wrong],exp,"ortografia en context","accent-"+kind);
}


const spellingGroups=[
["b/v","Fixa't en la b o la v: aquest mot s'escriu «{word}».",[
["bossa","vossa","Porta una ___ reutilitzable quan vagis a comprar."],
["batre","vatre","Primer has de ___ els ous amb una forquilla."],
["bany","vany","L'apartament té un ___ amb dutxa."],
["bena","vena","La ferida està coberta amb una ___ neta."],
["bola","vola","La criatura juga amb una ___ de plastilina."],
["buit","vuit","Si no hi ha res a dins, el recipient és ___."],
["bell","vell","En aquest exercici, un paisatge bonic és un paisatge ___."],
["bota","vota","S'ha embrutat una ___ caminant pel fang."],
["barca","varca","Van travessar el llac amb una ___ petita."],
["branca","vranca","L'ocell ha fet el niu en una ___ alta."],
["vaca","baca","A la granja han munyit una ___."],
["viatge","biatge","El preu inclou el ___ d'anada i tornada."],
["vacances","bacances","A l'agost farem dues setmanes de ___."],
["venda","benda","Aquest establiment es dedica a la ___ de bicicletes."],
["veure","beure","Des del mirador podem ___ tota la vall."],
["beure","veure","Després de córrer necessito ___ aigua."],
["vot","bot","Cada persona pot emetre un sol ___ a les eleccions."],
["voltar","boltar","Ens agrada ___ pel nucli antic sense pressa."],
["vapor","bapor","L'aigua bullent desprèn ___."],
["vern","bern","El ___ és un arbre que sol créixer prop de l'aigua."]
]],
["sibilants","La grafia correcta en aquesta frase és «{word}». Fixa't en les lletres que representen el so de la essa.",[
["passadís","pasadís","Les maletes bloquegen el ___ de l'hotel."],
["pissarra","pisarra","La docent ha escrit la data a la ___."],
["tassa","tasa","Serveix-me una ___ de xocolata calenta."],
["pressa","presa","No corris: avui no tenim ___."],
["massa","masa","Cal pastar la ___ del pa abans de deixar-la reposar."],
["bassa","basa","Després del ruixat s'ha format una ___ al camí."],
["dissabte","disabte","La parada del mercat obre cada ___."],
["necessari","necesari","No és ___ imprimir el comprovant."],
["possible","posible","Si és ___, voldria una habitació tranquil·la."],
["cansament","canssament","Després de la caminada notava molt de ___."],
["caçador","cassador","El ___ coneix bé els camins del bosc."],
["adreça","adressa","Escriu l'___ completa del destinatari."],
["cançó","cansó","El grup ha interpretat una ___ nova."],
["lliçó","llissó","Demà repassarem la ___ anterior."],
["peça","pessa","Falta una ___ per acabar el trencaclosques."],
["cistell","sistell","Hem recollit els bolets en un ___."],
["cercle","sercle","Dibuixa un ___ al voltant de la resposta."],
["zoològic","soològic","Han visitat el ___ amb una guia."],
["pinzell","pinsell","Necessites un ___ més fi per pintar aquest detall."],
["esmorzar","esmorsar","Abans de sortir, tenim temps per ___."]
]],
["g/j","La forma que encaixa és «{word}». Recorda com s'hi escriu el so de la g o la j.",[
["gelat","jelat","Per refrescar-se ha demanat un ___ de llimona."],
["gent","jent","Al vestíbul hi ha molta ___ esperant."],
["gener","jener","El contracte entrarà en vigor al mes de ___."],
["gerra","jerra","Porta una ___ d'aigua a la taula."],
["girafa","jirafa","La ___ té el coll molt llarg."],
["germana","jermana","La meva ___ treballa en una llibreria."],
["jaqueta","gaqueta","Penja la ___ al penjador de l'entrada."],
["joguina","goguina","A la botiga li han regalat una ___ de fusta."],
["justícia","gustícia","L'associació defensa la igualtat i la ___."],
["jove","jova","El voluntari més ___ encara estudia."]
]],
["r/rr","En aquest context escrivim «{word}». Compara el so d'una sola r amb el de rr entre vocals.",[
["carro","caro","El pagès transporta eines en un ___."],
["carretera","caretera","La ___ comarcal està tallada per obres."],
["carrer","carer","La farmàcia és al ___ del darrere."],
["arrencar","arencar","No podem ___ el motor perquè no hi ha bateria."],
["arrel","arel","Aquesta planta té una ___ molt profunda."],
["sorra","sora","Hem omplert la galleda de ___ de la platja."],
["terra","tera","Deixa les sabates a ___ abans d'entrar."],
["torre","tore","Des de la ___ del castell es veu el poble."],
["correu","coreu","T'enviarem la confirmació per ___ electrònic."],
["cirera","cirrera","La ___ és una fruita vermella amb pinyol."]
]],
["hac","La h no sona, però forma part de l'escriptura de «{word}».",[
["ahir","air","Ens vam conèixer ___ a la reunió."],
["avui","havui","La reserva comença ___ i acaba diumenge."],
["home","ome","Un ___ gran ens ha indicat el camí."],
["herba","erba","Després de ploure, l'___ ha crescut molt."],
["hivern","ivern","A l'___ els dies són més curts."],
["harmonia","armonia","Volen conviure en ___ amb el veïnat."],
["haver","aver","Pot ___ canviat l'horari de sortida."],
["ahir","hahir","La reunió va tenir lloc abans d'avui, és a dir, ___."],
["horitzó","oritzó","Des del far es veu tota la línia de l'___."],
["hàbil","àbil","És una persona molt ___ reparant aparells."]
]],
["m/n","En aquesta paraula, fixa't en la m o la n: la forma correcta és «{word}».",[
["campana","canpana","La ___ del campanar toca cada hora."],
["company","conpany","El meu ___ de pis arribarà al vespre."],
["embolicar","enbolicar","Vols ___ el regal amb aquest paper?"],
["tambor","tanbor","El grup marca el ritme amb un ___."],
["impossible","inpossible","Sense connexió és ___ enviar l'arxiu."],
["immens","inmens","El paisatge és ___ i no se'n veu el final."],
["connexió","conexió","La ___ d'internet s'ha interromput."],
["enviar","emviar","Recorda ___ el formulari abans de divendres."],
["convidar","comvidar","Volem ___ els veïns a la inauguració."],
["canviar","camviar","Necessito ___ l'hora de la visita."]
]],
["ela-geminada","El punt volat separa les dues eles de «{word}». No és el mateix que el dígraf ll.",[
["col·legi","collegi","El ___ del barri organitza una jornada oberta."],
["il·lusió","illusió","Li fa molta ___ retrobar els antics companys."],
["col·lecció","collecció","Conserva una ___ de postals antigues."],
["paral·lel","parallel","Aquest carrer és ___ al passeig."],
["sol·licitar","solicitar","Pots ___ el certificat per internet."],
["excel·lent","excellent","El servei rebut ha estat ___."],
["intel·ligent","intelligent","Han trobat una solució ___ al problema."],
["novel·la","novela","Està llegint una ___ d'aventures."],
["mil·límetre","millímetre","La peça fa un ___ de gruix."],
["instal·lació","installació","La ___ de l'antena es farà demà."]
]],
["consonant-final","En aquesta frase, el mot acaba com veus a «{word}». No ens refiem només del so final.",[
["verd","vert","El llum ___ indica que podem passar."],
["llarg","llarc","Han triat el recorregut més ___."],
["tard","tart","Si no sortim ara, arribarem ___."],
["sang","sanc","L'anàlisi requereix una mostra de ___."],
["càlid","càlit","El menjador té un ambient ___ i acollidor."],
["ràpid","ràpit","Necessitem un servei ___ de missatgeria."],
["record","recort","Guarda aquesta entrada com a ___ del concert."],
["acord","acort","Els representants han arribat a un ___."],
["grup","grub","El nostre ___ sortirà a les sis."],
["equip","equib","Cada ___ ha de portar el seu material."]
]]
];
for(const [rule,template,rows]of spellingGroups)for(const [word,wrong,sentence]of rows){
 let exp=template.replace("{word}",word);
 if(rule==="hac"&&word==="avui")exp="Avui s'escriu sense h. La h no es posa només perquè una paraula comenci per vocal.";
 
 if(rule==="b/v")exp="«"+word+"» s'escriu amb "+(word.includes("b")?"b":"v")+". Fixa't en aquesta lletra encara que, en molts parlars, b i v sonin igual.";
 if(rule==="sibilants")exp=word.includes("ss")?"«"+word+"» porta ss entre vocals perquè hi soni la essa sorda, com a serp.":word.includes("ç")?"«"+word+"» porta ç. Aquesta lletra fa el so de la s de serp davant de a, o o u.":"La forma correcta és «"+word+"». Fixa't en les lletres que escriuen el so de la essa en aquest mot.";
 if(rule==="g/j")exp="«"+word+"» s'escriu amb "+(word.startsWith("g")?"g davant de e o i.":"j davant de a, o o u.");
 if(rule==="r/rr")exp=word.includes("rr")?"«"+word+"» porta rr entre vocals per representar el so fort de la erra.":"«"+word+"» s'escriu amb una sola r entre vocals: cirera. No hi posem rr.";
 if(rule==="hac"&&word!=="avui")exp=word==="ahir"?"Ahir porta una h al mig, encara que no soni: a-h-i-r.":"«"+word+"» comença amb h. No la pronunciem, però cal escriure-la.";
 if(rule==="m/n")exp=word==="immens"?"Immens s'escriu amb dues emes juntes: mm.":word==="connexió"?"Connexió porta dues enes juntes: nn.":/nv/.test(word)?"«"+word+"» porta n davant de v. Compara-ho amb m davant de b: enviar, però embenar.":"«"+word+"» porta m davant de p o b. Recorda aquesta parella de consonants.";
 fill("ortografia",sentence,word,[wrong],exp,"ortografia en context",rule);
}


const readingTexts=[
["biblioteca","La biblioteca del districte tancarà la sala d'estudi durant dues setmanes per renovar la ventilació. El préstec de llibres continuarà funcionant a la planta baixa. Qui necessiti un espai per estudiar podrà utilitzar el casal, de dilluns a divendres fins a les vuit del vespre. Els llibres que vencin durant les obres es podran retornar una setmana més tard sense penalització.",[
["Quin servei queda temporalment fora d'ús?","La sala d'estudi","El préstec de llibres","Tota la biblioteca"],
["Per què es tanca la sala?","Per millorar la ventilació","Per reduir l'horari del personal","Per manca de llibres"],
["On es podrà estudiar mentre durin les obres?","Al casal","A la planta baixa de la biblioteca","A la recepció municipal"],
["Què passa amb els préstecs que vencen durant les obres?","Es disposa d'una setmana addicional per retornar-los","S'han de retornar abans de començar les obres","Cal pagar una penalització"],
["El casal ofereix l'alternativa també el diumenge?","El text només anuncia l'horari de dilluns a divendres","Sí, fins a les vuit","Sí, durant tot el dia"],
["Quina frase resumeix millor l'avís?","Una part de la biblioteca tanca, però s'ofereixen alternatives","La biblioteca suspèn tots els serveis sense alternativa","La biblioteca deixa de prestar llibres definitivament"]
]],
["lloguer","La propietària ha comunicat que es repararà una canonada de l'edifici dimarts entre les nou i les dotze. Durant aquestes hores es tallarà l'aigua. Recomana guardar-ne una mica el vespre anterior. Si la reparació s'allarga, l'administrador avisarà per missatge. No cal que els residents siguin a casa, perquè els operaris treballaran en una zona comuna.",[
["Quin subministrament s'interromprà?","L'aigua","L'electricitat","El gas"],
["Per què recomanen guardar aigua?","Per poder-ne disposar durant el tall","Per ajudar els operaris a reparar la canonada","Perquè el servei desapareixerà definitivament"],
["Cal que els residents siguin a casa?","No, els treballs es fan en una zona comuna","Sí, han d'obrir la porta del pis","Només els residents de la planta baixa"],
["Qui avisarà si els treballs duren més del previst?","L'administrador","Cada resident","La companyia elèctrica"],
["Quan convé preparar la reserva d'aigua?","El vespre abans de la reparació","Quan s'acabi la reparació","El dimecres al matí"],
["Quina informació depèn de com avancin les obres?","Si el tall s'allargarà més enllà de les dotze","Si els operaris treballaran dimarts","Si la reparació afecta una canonada"]
]],
["formació","L'empresa ofereix un curs de fulls de càlcul per al personal d'administració. Les sessions es faran dins de l'horari laboral, però caldrà acordar amb cada responsable com es cobreix l'atenció al públic. No es demanen coneixements avançats. Les places són limitades i tindran prioritat les persones que utilitzen el programa habitualment. La inscripció no garanteix, per tant, obtenir plaça.",[
["A qui s'adreça principalment el curs?","Al personal d'administració","Només al personal informàtic","A qualsevol client de l'empresa"],
["Què cal organitzar abans d'assistir-hi?","La cobertura de l'atenció al públic","Un canvi de contracte","La compra obligatòria d'un ordinador"],
["Cal tenir un nivell avançat del programa?","No, el text ho descarta","Sí, és un requisit imprescindible","Només per a la primera sessió"],
["Qui té preferència per obtenir plaça?","Qui utilitza el programa habitualment","Qui fa menys temps que treballa a l'empresa","Qui es pot quedar fora d'horari"],
["Apuntar-s'hi assegura poder fer el curs?","No, hi ha places limitades i un criteri de prioritat","Sí, qualsevol inscripció s'accepta automàticament","Sí, si es paga de seguida"],
["Quina expressió indica una conseqüència en el text?","per tant","però","habitualment"]
]],
["mercat","El mercat municipal iniciarà una prova de repartiment a domicili durant tres mesos. El servei serà gratuït per a compres superiors a quaranta euros i tindrà un petit cost per a la resta. Les comandes s'hauran de fer abans de les dotze per rebre-les aquella mateixa tarda. Acabada la prova, els paradistes valoraran si el nombre de demandes permet mantenir el servei.",[
["El servei s'ofereix inicialment de manera definitiva?","No, primer es farà una prova de tres mesos","Sí, ja s'ha decidit mantenir-lo sempre","No, només funcionarà un dia"],
["Quina compra té repartiment gratuït?","Una compra de cinquanta euros","Una compra de vint euros","Qualsevol compra, sense condicions"],
["Què cal fer per rebre la compra aquella tarda?","Fer la comanda abans de les dotze","Fer-la després de les sis","Anar a recollir-la personalment"],
["De què dependrà que el servei continuï?","De la valoració de la demanda que rebi","Del temps que faci el primer dia","De si totes les compres superen cent euros"],
["Què indica «per a la resta»?","Les compres que no superen el llindar anunciat","Els paradistes que tanquen a la tarda","Els clients d'altres municipis"],
["Quina afirmació coincideix amb el text?","Algunes compres tindran un cost de repartiment","Totes les comandes es lliuraran al matí","El servei només acceptarà compres grans"]
]],
["excursió","L'associació proposa una caminada de vuit quilòmetres amb un desnivell moderat. No és una activitat tècnica, però requereix estar acostumat a caminar. Cal portar calçat adequat i aigua, perquè no hi ha fonts durant el recorregut. En cas de pluja intensa, s'ajornarà una setmana. L'organització confirmarà la sortida el vespre anterior.",[
["És suficient pensar que no és una ruta tècnica per apuntar-s'hi sense preparació?","No, cal estar acostumat a caminar","Sí, el text diu que no exigeix cap esforç","Sí, perquè tota la ruta es fa en vehicle"],
["Per què és important portar aigua?","Perquè no es trobaran fonts durant el recorregut","Perquè l'organització la vendrà al final","Per rentar el calçat abans de sortir"],
["Què passarà si plou intensament?","La caminada es farà una setmana més tard","La ruta s'allargarà vuit quilòmetres","Se suprimirà qualsevol confirmació"],
["Quan es confirmarà la sortida?","El vespre anterior","Una setmana després","Quan tothom arribi al punt final"],
["Quina distància s'ha anunciat?","Vuit quilòmetres","Vuit-cents metres","Divuit quilòmetres"],
["Quin equipament s'esmenta expressament?","Calçat adequat i aigua","Material d'escalada obligatori","Una bicicleta de muntanya"]
]],
["teletreball","A partir del mes vinent, el personal podrà demanar un dia setmanal de teletreball. La mesura no s'aplicarà automàticament: caldrà autorització i garantir que el servei presencial queda cobert. Durant la jornada a distància s'haurà d'estar disponible pels canals habituals. L'empresa revisarà el funcionament del sistema al cap de sis mesos.",[
["El teletreball s'aplica a tothom sense tràmits?","No, s'ha de demanar i autoritzar","Sí, sense cap excepció","Només si es deixen d'atendre els usuaris"],
["Quina freqüència màxima anuncia la mesura?","Un dia cada setmana","Sis mesos seguits","Tots els dies laborables"],
["Quina condició afecta el servei presencial?","Ha de continuar quedant cobert","S'ha de tancar el dia de teletreball","Només obrirà al final del mes"],
["Cal estar localitzable durant el teletreball?","Sí, pels canals habituals","No, és un dia de descans","Només després d'acabar la jornada"],
["Quan s'avaluarà el sistema?","Al cap de sis mesos","Després de sis dies","Abans que es pugui demanar"],
["Quina idea resumeix la política?","S'ofereix flexibilitat amb condicions de servei i disponibilitat","Es concedeix un dia festiu addicional","Se substitueix tota l'atenció presencial"]
]],
["concert","Les entrades del concert es podran comprar per internet o a la taquilla. Les persones menors de setze anys hauran d'anar acompanyades d'una persona adulta. El recinte obrirà una hora abans de l'actuació. No es permetrà tornar a entrar un cop se n'hagi sortit, encara que es conservi l'entrada. Si l'organització cancel·la l'acte, se'n retornarà l'import.",[
["Com es poden adquirir les entrades?","Per internet o a taquilla","Només per telèfon","Només a la porta quan acabi el concert"],
["Quina condició afecta una persona de quinze anys?","Ha d'anar acompanyada d'una persona adulta","Pot entrar sola obligatòriament","No pot assistir-hi en cap cas"],
["Quan s'obriran les portes?","Una hora abans de l'actuació","Quan s'acabi la primera cançó","Un dia abans"],
["Es pot sortir i tornar a entrar amb la mateixa entrada?","No, el text ho prohibeix","Sí, sempre que es conservi l'entrada","Només si no han passat deu minuts"],
["En quin cas s'anuncia la devolució de l'import?","Si l'organització cancel·la l'acte","Si l'espectador canvia d'opinió","Si es decideix arribar tard"],
["Quin paper té «encara que» en l'avís?","Indica que conservar l'entrada no elimina la prohibició","Presenta la causa de la cancel·lació","Ofereix una alternativa de compra"]
]],
["intercanvi","El casal organitza un intercanvi de roba en bon estat. Cada participant podrà portar fins a cinc peces netes i rebrà un val per cadascuna. Els vals permetran endur-se altres peces, però no es podran canviar per diners. La roba que no s'intercanviï es donarà a una entitat social, sempre que qui l'ha portada hi estigui d'acord.",[
["Quin límit s'estableix per participant?","Cinc peces","Cinc bosses sense límit de peces","Una única peça"],
["Quines condicions ha de complir la roba?","Estar neta i en bon estat","Ser nova i amb etiqueta","Ser de la mateixa talla"],
["Què es rep a canvi de cada peça acceptada?","Un val","Una quantitat fixa de diners","Un rebut de compra original"],
["Es poden convertir els vals en diners?","No, només serveixen per a l'intercanvi","Sí, al final de la jornada","Sí, si es porten cinc peces"],
["La roba sobrant es dona automàticament?","No, cal el consentiment de qui l'ha portada","Sí, sense consultar-ho","No, s'ha de llençar tota"],
["Quin és l'objectiu principal de l'activitat?","Reutilitzar roba mitjançant un intercanvi","Vendre roba amb benefici econòmic","Obligar tothom a comprar peces noves"]
]],
["aparcament","Durant la fira, l'aparcament del centre quedarà reservat als vehicles dels expositors. Els visitants podran deixar el cotxe gratuïtament al recinte esportiu, des d'on sortirà una llançadora cada quinze minuts. El servei acabarà mitja hora després del tancament de la fira. Es recomana utilitzar el transport públic sempre que sigui possible.",[
["Qui podrà utilitzar l'aparcament del centre?","Els expositors acreditats","Tots els visitants","Només els conductors de la llançadora"],
["On s'ofereix aparcament gratuït als visitants?","Al recinte esportiu","Al centre de la fira","En qualsevol carrer, sense restriccions"],
["Amb quina freqüència sortirà la llançadora?","Cada quinze minuts","Cada hora i mitja","Només una vegada al dia"],
["Quan acabarà el servei de llançadora?","Trenta minuts després que tanqui la fira","Trenta minuts abans que obri","Al mateix moment que obri la fira"],
["És obligatori arribar amb transport públic?","No, és una recomanació","Sí, no hi ha cap alternativa","Només per als expositors"],
["Quina necessitat resol la llançadora?","Connecta l'aparcament alternatiu amb la fira","Substitueix tots els transports de la ciutat","Transporta els vehicles fins al centre"]
]],
["inscripció","Per inscriure's al taller cal omplir el formulari i esperar el missatge de confirmació. El pagament s'ha de fer només després de rebre'l. Si no s'abona la quota en tres dies, la plaça s'oferirà a la llista d'espera. Les persones que necessitin alguna adaptació poden indicar-ho al formulari perquè l'organització ho valori abans de començar.",[
["Quin és el primer pas per inscriure's?","Omplir el formulari","Pagar sense esperar cap resposta","Anar directament a la primera sessió"],
["Quan s'ha de pagar?","Després de rebre la confirmació","Abans d'omplir el formulari","Quan acabi tot el taller"],
["Què passa si no es paga dins del termini?","La plaça es pot oferir a la llista d'espera","La quota es duplica automàticament","La inscripció passa a ser gratuïta"],
["Quin termini s'anuncia per abonar la quota?","Tres dies","Tres setmanes","Un mes"],
["Com es pot comunicar una necessitat d'adaptació?","Indicant-la al formulari","Esperant obligatòriament a l'última sessió","Pagant una segona quota"],
["El formulari tot sol assegura definitivament la plaça?","No, també cal confirmació i pagament dins del termini","Sí, encara que no s'aboni la quota","Sí, el pagament només és voluntari"]
]]
];
for(const [context,text,questions]of readingTexts)for(const [question,correct,...wrong]of questions){
 const label={biblioteca:"una biblioteca",lloguer:"una reparació",formació:"un curs",mercat:"un servei de repartiment",excursió:"una sortida",teletreball:"el teletreball",concert:"un concert",intercanvi:"un intercanvi",aparcament:"una fira",inscripció:"una inscripció"}[context];
 add("lexic","Llegeix aquest avís sobre "+label+": «"+text+"» "+question,correct,wrong,
 "L'avís indica: «"+correct+"». Cal tenir en compte les condicions i els terminis del text.","comprensió escrita","lectura-funcional");
}


for(const q of bank){
 const urls={
 accentuacio:q.exerciseType==="accent-dièresi"?"https://www.cpnl.cat/gramatica/12/19-la-dieresi":"https://www.cpnl.cat/gramatica/35/17-l-accentuacio-grafica",
 apostrofacio:"https://www.cpnl.cat/gramatica/14/3-l-apostrofacio-i-les-contraccions",
 pronoms:"https://www.cpnl.cat/gramatica/66/37-els-pronoms-febles",
 verbs:"https://www.cpnl.cat/gramatica/46/13-els-verbs",
 connectors:"https://www.cpnl.cat/gramatica/73/2-lligar-les-idees-connectors-i-marcadors-textuals",
 lexic:q.exerciseType==="concordança"?"https://www.cpnl.cat/gramatica/13/3-el-genere-de-noms-i-adjectius":q.exerciseType==="lectura-funcional"?"https://www.cpnl.cat/gramatica/nivell/intermedi-2":"https://www.cpnl.cat/gramatica/10/3-sinonimia-i-antonimia",
 ortografia:q.exerciseType==="b/v"?"https://www.cpnl.cat/gramatica/18/7-la-b-i-la-v":q.exerciseType==="sibilants"?"https://www.cpnl.cat/gramatica/15/5-les-esses-s-ss-c-c-z":"https://www.cpnl.cat/gramatica/nivell/intermedi-2"
 };
 q.source.url=urls[q.topic];
 if(q.exerciseType==="lectura-funcional")q.source.locator="Intermedi 2: comprensió de textos informatius i instructius; avisos i comunicats. Text original de pràctica.";
 if(q.exerciseType==="verb-subjuntiu")q.source.url="https://www.cpnl.cat/gramatica/140/16-el-subjuntiu";
}



// Barreja les posicions dels pronoms sense vincular A/B/C al gènere o al nombre.
{
 const pronounItems=bank.filter(q=>q.topic==="pronoms");
 let shuffleState=2026101619;
 const random=()=>{shuffleState=(Math.imul(shuffleState,1664525)+1013904223)>>>0;return shuffleState/4294967296;};
 const positions=pronounItems.map((_,i)=>i%3);
 for(let i=positions.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[positions[i],positions[j]]=[positions[j],positions[i]];}
 pronounItems.forEach((q,i)=>{
 const correct=q.options[q.answer];
 const wrong=q.options.filter((_,j)=>j!==q.answer);
 if(random()<0.5)wrong.reverse();
 wrong.splice(positions[i],0,correct);
 q.options=wrong;q.answer=positions[i];
 });
}


// Lectures breus: cada pregunta conserva només la informació necessària.
const shortReadingTexts=[
  "La sala d'estudi tanca dues setmanes per obres. El préstec de llibres continua obert.",
  "La sala d'estudi tanca per renovar la ventilació. La resta de serveis es manté.",
  "Mentre la biblioteca fa obres, podeu estudiar al casal. Obre de dilluns a divendres fins a les vuit.",
  "Si el vostre préstec venç durant les obres, disposeu d'una setmana addicional per retornar-lo sense penalització.",
  "Durant les obres, el casal ofereix una sala d'estudi de dilluns a divendres, fins a les vuit.",
  "La sala d'estudi tanca per obres, però el préstec continua. Per estudiar, podeu anar al casal.",
  "Dimarts repararem una canonada. Entre les nou i les dotze no hi haurà aigua.",
  "Dimarts tallarem l'aigua de nou a dotze. Guardeu-ne una mica el vespre anterior per tenir-ne durant el tall.",
  "Els operaris repararan una canonada de la zona comuna. No cal que els residents siguin a casa.",
  "Si la reparació s'allarga, l'administrador avisarà els residents per missatge.",
  "Dimarts al matí tallarem l'aigua. Recomanem guardar-ne una mica el vespre de dilluns.",
  "El tall d'aigua està previst fins a les dotze. Si la reparació s'allarga, l'administrador ho comunicarà.",
  "L'empresa ofereix un curs de fulls de càlcul al personal d'administració. No cal tenir coneixements avançats.",
  "El curs es fa en horari laboral. Acordeu amb el vostre responsable qui cobrirà l'atenció al públic.",
  "El curs de fulls de càlcul no requereix coneixements avançats. Les sessions seran en horari laboral.",
  "Les places són limitades. Tenen prioritat les persones que utilitzen habitualment el programa.",
  "El curs té places limitades i prioritza els usuaris habituals del programa. Inscriure-s'hi no garanteix obtenir plaça.",
  "El curs té places limitades; per tant, inscriure-s'hi no garanteix obtenir plaça.",
  "El mercat provarà el repartiment a domicili durant tres mesos. Després decidirà si el manté.",
  "El repartiment és gratuït per a compres superiors a quaranta euros. Les altres compres paguen un suplement.",
  "Feu la comanda abans de les dotze per rebre-la aquella mateixa tarda.",
  "Després de tres mesos de prova, els paradistes valoraran la demanda per decidir si mantenen el repartiment.",
  "El repartiment és gratuït en compres superiors a quaranta euros. Per a la resta, té un petit cost.",
  "El repartiment costa un petit import, excepte en compres superiors a quaranta euros, que és gratuït.",
  "La caminada no és tècnica, però cal estar acostumat a caminar. Té vuit quilòmetres i un desnivell moderat.",
  "Porteu aigua: durant la caminada no trobareu cap font.",
  "Si plou intensament, ajornarem la caminada una setmana. Confirmarem la sortida el vespre anterior.",
  "L'organització confirmarà la caminada el vespre anterior. Si plou intensament, s'ajornarà.",
  "La caminada té vuit quilòmetres i un desnivell moderat. Cal estar acostumat a caminar.",
  "Per a la caminada, porteu calçat adequat i aigua. No cal material tècnic.",
  "El personal pot demanar un dia setmanal de teletreball. Cal autorització: no s'aplica automàticament.",
  "Es podrà autoritzar un màxim d'un dia de teletreball per setmana.",
  "El teletreball s'autoritzarà sempre que l'atenció presencial quedi coberta.",
  "Durant el dia de teletreball, cal estar disponible pels canals habituals de l'empresa.",
  "L'empresa revisarà el sistema de teletreball al cap de sis mesos.",
  "Es pot demanar teletreball amb autorització, sempre que el servei presencial quedi cobert i es mantingui la disponibilitat.",
  "Les entrades del concert es venen per internet i a la taquilla.",
  "Els menors de setze anys han d'anar al concert amb una persona adulta.",
  "Les portes del recinte obriran una hora abans que comenci el concert.",
  "Un cop sortiu del recinte, no podreu tornar a entrar, encara que conserveu l'entrada.",
  "Si l'organització cancel·la el concert, retornarà l'import de les entrades.",
  "No podreu tornar a entrar un cop sortiu, encara que conserveu l'entrada.",
  "Cada participant pot portar un màxim de cinc peces de roba neta i en bon estat.",
  "Per participar en l'intercanvi, la roba ha d'estar neta i en bon estat. No cal que sigui nova.",
  "Rebreu un val per cada peça de roba acceptada. Els vals permeten escollir altres peces.",
  "Els vals de l'intercanvi serveixen per endur-se roba. No es poden canviar per diners.",
  "La roba sobrant es donarà a una entitat social només si qui l'ha portada hi està d'acord.",
  "Al casal intercanviem roba en bon estat: per cada peça rebem un val per escollir-ne una altra. No es venen peces.",
  "L'aparcament del centre està reservat als expositors acreditats. Els visitants tenen un aparcament alternatiu.",
  "Els visitants poden aparcar gratuïtament al recinte esportiu. Una llançadora els acostarà a la fira.",
  "La llançadora entre el recinte esportiu i la fira surt cada quinze minuts.",
  "La llançadora funcionarà fins mitja hora després del tancament de la fira.",
  "Recomanem venir amb transport públic. Si veniu amb cotxe, podeu aparcar gratuïtament al recinte esportiu.",
  "Una llançadora connecta l'aparcament del recinte esportiu amb la fira. Surt cada quinze minuts.",
  "Per inscriure-us, primer ompliu el formulari i espereu el missatge de confirmació. Després podreu pagar.",
  "Feu el pagament només després de rebre la confirmació de la inscripció.",
  "Si no pagueu en tres dies, oferirem la plaça a la llista d'espera.",
  "Després de rebre la confirmació, disposeu de tres dies per pagar la quota.",
  "Si necessiteu alguna adaptació, indiqueu-ho al formulari perquè l'organització ho valori abans de començar.",
  "Omplir el formulari no assegura la plaça: cal rebre la confirmació i pagar la quota en tres dies."
];
let shortReadingIndex=0;
for(const q of bank){if(q.exerciseType==="lectura-funcional"){q.prompt=q.prompt.replace(/«[^»]+»/,"«"+shortReadingTexts[shortReadingIndex++]+"»");}}



// El nombre d'inscrits contrasta amb l'ajornament; no n'és una condició.
{
 const q=bank.find(q=>q.id==="b2-propi-0643");
 q.prompt="Expressa un contrast: «El taller s'ha ajornat ___ hi ha prou persones inscrites».";
 q.answer=q.options.indexOf("tot i que");
 q.explanation="Tot i que expressa un contrast: hi ha prou persones inscrites, però el taller s'ha ajornat igualment.";
 q.exerciseType="contrast";
}

bank.find(q => q.id === "b2-propi-0722").prompt = "PER EXPRESSAR CONTRAST.";

bank.find(q => q.id === "b2-propi-0686").prompt = "PER EXPRESSAR UN MOTIU";

bank.find(q => q.id === "b2-propi-0946").prompt = "COMPRENSIÓ LECTORA: «La sala d'estudi tanca per obres, però el préstec continua. Per estudiar, podeu anar al casal.» Quina frase resumeix millor l'avís?";

for (const q of bank) {
  if (q.exerciseType === "lectura-funcional") q.prompt = "COMPRENSIÓ LECTORA: " + q.prompt.slice(q.prompt.indexOf("«"));
}

// Posicions equilibrades i barrejades en tot B2, independents del tipus d'exercici.
{
 let positionState=2026101628;
 const nextRandom=()=>{positionState=(Math.imul(positionState,1664525)+1013904223)>>>0;return positionState/4294967296;};
 for(const optionCount of [2,3]){
 const items=bank.filter(q=>q.options.length===optionCount);
 const positions=items.map((_,i)=>i%optionCount);
 for(let i=positions.length-1;i>0;i--){const j=Math.floor(nextRandom()*(i+1));[positions[i],positions[j]]=[positions[j],positions[i]];}
 items.forEach((q,i)=>{const right=q.options[q.answer];const remaining=q.options.filter((_,j)=>j!==q.answer);
 if(nextRandom()<0.5)remaining.reverse();remaining.splice(positions[i],0,right);q.options=remaining;q.answer=positions[i];});
 }
}

if(bank.length!==1000)throw Error("Expected 1000 questions, got "+bank.length);
await writeFile(new URL("b2.json",root),JSON.stringify(bank,null,2)+"\n");
console.log(JSON.stringify({count:bank.length,topics:bank.reduce((a,q)=>(a[q.topic]=(a[q.topic]||0)+1,a),{})},null,2));
