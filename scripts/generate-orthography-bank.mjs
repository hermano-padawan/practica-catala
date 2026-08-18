import { writeFile } from "node:fs/promises";

const reviewedAt = "2026-08-17";
const sources = {
  sib: { url: "https://www.cpnl.cat/gramatica/15/5-les-esses-s-ss-c-c-z", locator: "Regles i casos especials de s, ss, c, ç i z" },
  bv: { url: "https://www.cpnl.cat/gramatica/18/7-la-b-i-la-v", locator: "Regles, pseudoderivats i vocabulari de Suficiència 2, línies 69-191" },
  gj: { url: "https://www.cpnl.cat/gramatica/26/12-la-g-i-la-j", locator: "Regles de g/j i excepcions de Suficiència" },
  ocl: { url: "https://www.cpnl.cat/gramatica/17/6-les-oclusives-p-b-t-d-c-g", locator: "Oclusives a final de mot i excepcions" },
};

const sib = [
 ["supressió","supresió","supreçió","El comitè va demanar la ___ d'aquell apartat.","Supressió s'escriu amb ss entre vocals."],
 ["ciència","siència","ciènçia","La divulgació acosta la ___ a tothom.","Ciència s'escriu amb c tant a l'inici com abans de la terminació -ència."],
 ["confiança","confiansa","confianssa","La mediadora inspira ___.","Confiança acaba amb el sufix -ança, que s'escriu amb ç."],
 ["casa","cassa","caza","Han rehabilitat una ___ antiga.","Casa s'escriu amb una sola s entre vocals perquè el so és sonor."],
 ["zebra","sebra","çebra","Al documental apareix una ___.","Zebra s'escriu amb z inicial."],
 ["caseta","casseta","cazeta","Al jardí hi ha una ___ de fusta.","Caseta conserva la s de la família de casa."],
 ["gossera","gosera","goçera","Han ampliat la ___ municipal.","Gossera conserva la ss de la família de gos."],
 ["llaçada","llasada","llassada","Va embolicar el paquet amb una ___.","Llaçada conserva la ç de la família de llaç."],
 ["nació","nasió","naçió","Cada ___ té la seva història.","Nació s'escriu amb c davant de i."],
 ["força","forsa","forssa","No cal empènyer amb tanta ___.","Força s'escriu amb ç davant de a."],
 ["comissió","comisió","comició","La ___ publicarà l'informe demà.","Comissió s'escriu amb ss entre vocals."],
 ["desembre","dezembre","dessembre","El curs acabarà al ___.","Desembre s'escriu amb s, encara que en alguns parlars es pugui ensordir."],
 ["antisocial","antissocial","antiçocial","L'informe descriu una conducta ___.","Antisocial porta una sola s després del prefix anti-."],
 ["contrasenya","contrassenya","contracenya","Canvia la ___ cada sis mesos.","Contrasenya s'escriu amb una sola s en aquest mot prefixat."],
 ["monosíl·lab","monossíl·lab","monoçíl·lab","Pa és un mot ___.","Monosíl·lab s'escriu amb una sola s després del formant mono-."],
 ["preselecció","presselecció","preçelecció","La prova inclou una fase de ___.","Preselecció porta una sola s després del prefix pre-."],
 ["ressò","resò","reçò","La notícia va tenir molt de ___.","Ressò és una excepció prefixada que s'escriu amb ss."],
 ["ecosistema","ecossistema","ecozistema","Cal protegir aquest ___.","Ecosistema s'escriu amb una sola s en el compost."],
 ["metgessa","metgesa","metgeça","La ___ atendrà les urgències.","Metgessa s'escriu amb ss entre vocals."],
 ["agressió","agresió","agreció","El protocol rebutja qualsevol ___.","Agressió s'escriu amb ss entre vocals."],
 ["nazisme","nasisme","nacisme","El museu documenta l'ascens del ___.","Nazisme s'escriu amb z."],
 ["alcàsser","alcàser","alcàçer","Van visitar l'antic ___.","Alcàsser s'escriu amb ss."],
 ["embarassada","embarasssada","embarazada","La protagonista està ___.","Embarassada s'escriu amb ss."],
 ["alzina","alsina","alçina","L'___ dona ombra a la plaça.","Alzina s'escriu amb z."],
 ["senzill","sensill","sençill","El procediment és ben ___.","Senzill s'escriu amb z."],
];

const bv = [
 ["embenar","envenar","emvenar","La infermera va ___ el turmell.","Embenar s'escriu amb b darrere de m."],
 ["timbal","timval","tinbal","El músic toca el ___.","Timbal s'escriu amb b darrere de m."],
 ["canvi","canbi","cambi","El projecte necessita un ___.","Canvi s'escriu amb v darrere de n."],
 ["invàlid","inbàlid","imbàlid","El tribunal va declarar ___ el document.","Invàlid s'escriu amb v darrere de n."],
 ["tramvia","tranvia","trambia","Anirem al centre amb ___.","Tramvia és una excepció: s'escriu amb v darrere de m."],
 ["saber","saver","zaber","Per respondre cal ___ la norma.","Saber s'escriu amb b; la b alterna amb la p de sap."],
 ["rebre","revre","rever","Esperem ___ una resposta avui.","Rebre s'escriu amb b; la b alterna amb la p de rep."],
 ["blavor","blabor","vlavor","La ___ del cel era intensa.","Blavor s'escriu amb v perquè alterna amb la u de blau."],
 ["haver","haber","aver","Podria ___ arribat abans.","Haver s'escriu amb v, igual que havia i havent."],
 ["visitaves","visitabes","visitàves","Abans ___ sovint els avis.","L'imperfet dels verbs de la primera conjugació s'escriu amb v."],
 ["calvície","calbície","calvíssie","El tractament no evita la ___.","Calvície és un pseudoderivat de calb i s'escriu amb v."],
 ["cerebral","ceravral","cerevral","L'estudi analitza l'activitat ___.","Cerebral és un pseudoderivat de cervell i s'escriu amb b."],
 ["curvatura","corbatura","curvattura","La carretera té molta ___.","Curvatura és un pseudoderivat de corb i s'escriu amb v."],
 ["dèbit","dèvit","débit","El compte presenta un ___.","Dèbit és un pseudoderivat relacionat amb deure i s'escriu amb b."],
 ["escriba","escriva","escribà","L'___ copiava manuscrits.","Escriba és un pseudoderivat d'escriure i s'escriu amb b."],
 ["labial","lavial","llabial","És una consonant ___.","Labial és un pseudoderivat de llavi i s'escriu amb b."],
 ["llibertat","llivertat","libertat","La premsa defensa la ___.","Llibertat és un pseudoderivat de lliure i s'escriu amb b."],
 ["mòbil","mòvil","móbil","He silenciat el telèfon ___.","Mòbil és un pseudoderivat de moure i s'escriu amb b."],
 ["nebulositat","nebulossitat","nevulositat","La previsió anuncia ___.","Nebulositat és un pseudoderivat de núvol i s'escriu amb b."],
 ["probabilitat","provabilitat","probavilitat","Hi ha poca ___ de pluja.","Probabilitat és un pseudoderivat de provar i s'escriu amb b."],
 ["arribar","arrivar","aribar","Esperen ___ abans de les nou.","Arribar figura entre els mots que s'escriuen amb b."],
 ["gavardina","gabardina","gavadina","S'ha posat la ___ perquè plou.","Gavardina s'escriu amb v."],
 ["pavelló","pabelló","pavel·ló","El partit es juga al ___.","Pavelló s'escriu amb v i amb el dígraf ll."],
 ["sivella","sibella","civella","S'ha trencat la ___ del cinturó.","Sivella s'escriu amb v."],
 ["trèvol","trébol","trèbol","Va trobar un ___ de quatre fulles.","Trèvol s'escriu amb v i accent obert."],
];

const gj = [
 ["geniva","jeniva","geniba","El dentista li ha revisat la ___.","Geniva s'escriu amb g davant de e."],
 ["fageda","fajeda","fagueda","A la tardor passejarem per la ___.","Fageda s'escriu amb g davant de e."],
 ["ginesta","jinesta","guinesta","La ___ floreix a la primavera.","Ginesta s'escriu amb g davant de i."],
 ["afegir","afejir","afeguir","Cal ___ una nota al final.","Afegir s'escriu amb g davant de i."],
 ["jardí","gardí","jardín","Els infants juguen al ___.","Jardí s'escriu amb j davant de a."],
 ["pujar","pugar","putjar","Haurem de ___ per l'escala.","Pujar s'escriu amb j davant de a."],
 ["joventut","goventut","jobentut","La biblioteca promou activitats per a la ___.","Joventut s'escriu amb j davant de o."],
 ["rajola","ragola","ratjola","Han substituït una ___ del terra.","Rajola s'escriu amb j davant de o."],
 ["juliol","guliol","julliol","El festival se celebrarà al ___.","Juliol s'escriu amb j davant de u."],
 ["ajut","agut","atjut","L'entitat ha rebut un ___.","Ajut s'escriu amb j davant de u."],
 ["platja","plaja","platga","La ___ és gairebé buida.","Platja s'escriu amb el grup tj."],
 ["fetge","fege","fetja","El ___ compleix funcions essencials.","Fetge s'escriu amb el grup tg."],
 ["heretgia","heretjia","eretgia","El tribunal el va acusar d'___.","Heretgia s'escriu amb el grup tg."],
 ["empitjorar","empijorar","empitxorar","La situació podria ___.","Empitjorar s'escriu amb tj."],
 ["adjuntar","atjuntar","adguntar","Cal ___ el comprovant.","Adjuntar s'escriu amb el grup dj."],
 ["injecció","ingecció","injeccióo","Li han administrat una ___.","Injecció manté la j davant de e en el grup -jecc-."],
 ["injectar","ingectar","injeptar","El tècnic va ___ el producte.","Injectar manté la j en el formant -ject-."],
 ["adjectiu","adgetiu","adjectíu","Cal triar un ___ precís.","Adjectiu manté la j en el formant -ject-."],
 ["objecte","obgecte","objecta","Han trobat un ___ antic.","Objecte manté la j en el formant -ject-."],
 ["jeure","geure","jèure","El gos es va ___ a l'ombra.","Jeure és una excepció que s'escriu amb j davant de e."],
 ["Jerusalem","Gerusalem","Jerussalem","El reportatge parla de ___.","Jerusalem s'escriu amb j inicial."],
 ["Jeroni","Geroni","Jerroni","El protagonista es diu ___.","Jeroni s'escriu amb j inicial."],
 ["majestat","magestat","majestad","El paisatge impressionava per la seva ___.","Majestat s'escriu amb j davant de e."],
 ["jersei","gersei","jerssei","S'ha posat un ___ de llana.","Jersei s'escriu amb j inicial."],
 ["jerarquia","gerarquia","jerarquía","L'organigrama representa la ___.","Jerarquia s'escriu amb j inicial."],
];

const ocl = [
 ["rep","reb","repp","Cada setmana ___ una carta.","Rep acaba en p, com mostra l'alternança amb rebre."],
 ["sap","sab","sapp","Ella ja ___ la resposta.","Sap acaba en p, tot i que alterna amb la b de saber."],
 ["llop","llob","llopp","El conte parla d'un ___.","Llop acaba en p, tot i que el femení és lloba."],
 ["salut","salud","salutt","L'activitat física millora la ___.","Salut acaba en t, tot i que el derivat saludable porta d."],
 ["buit","buid","buït","El dipòsit és ___.","Buit acaba en t, tot i que el derivat buidor porta d."],
 ["menut","menud","menutt","El detall és molt ___.","Menut acaba en t, tot i que menudesa porta d."],
 ["amic","amig","amiq","És un vell ___.","Amic acaba en c, tot i que el femení és amiga."],
 ["plec","pleg","pleck","Guarda el document dins del ___.","Plec acaba en c, tot i que el verb plegar porta g."],
 ["abric","abrig","abrit","Agafa l'___ abans de sortir.","Abric acaba en c, tot i que abrigar porta g."],
 ["club","clup","cluv","S'ha inscrit al ___ de lectura.","Club és una excepció que acaba en b."],
 ["tub","tup","tuv","El líquid passa per un ___.","Tub és una excepció que acaba en b."],
 ["fred","fret","fredd","Avui fa molt de ___.","Fred és una excepció que acaba en d."],
 ["sud","sut","sudd","El vent bufa del ___.","Sud és una excepció que acaba en d."],
 ["mag","mac","magg","El conte té un ___ savi.","Mag és una excepció que acaba en g."],
 ["pedagog","pedagoc","pedàgog","El centre ha contractat un ___.","Pedagog és una excepció que acaba en g."],
 ["camp","camb","cam","Han travessat el ___.","Camp conserva la p que apareix en camperol."],
 ["corb","corp","corv","Un ___ s'ha aturat a la branca.","Corb conserva la b que apareix en corba."],
 ["profund","profunt","profún","Han excavat un pou ___.","Profund conserva la d que apareix en profunditat."],
 ["banc","bang","bank","Seieu en aquell ___.","Banc conserva la c que apareix en banca."],
 ["fang","fanc","fan","Les botes són plenes de ___.","Fang conserva la g que apareix en fangueig."],
 ["ànec","àneg","ánec","Un ___ neda a l'estany.","Ànec acaba en c, encara que el diminutiu és aneguet."],
 ["càrrec","càrreg","càrrech","Ha renunciat al ___.","Càrrec acaba en c, encara que carregar porta g."],
 ["fàstic","fàstig","fástic","Aquella olor em fa ___.","Fàstic acaba en c, encara que fastigós porta g."],
 ["mànec","màneg","mánec","El ___ de la paella crema.","Mànec acaba en c, encara que manegar porta g."],
 ["préssec","présseg","prèsec","Ha menjat un ___.","Préssec acaba en c, encara que presseguer porta g."],
];

const groups = [["sib",51,sib],["bv",76,bv],["gj",101,gj],["ocl",126,ocl]];
const questions = groups.flatMap(([key,start,items]) => items.map(([correct,wrong1,wrong2,context,explanation], index) => {
  const answer = (index + start) % 3;
  const options = [wrong1, wrong2];
  options.splice(answer, 0, correct);
  return {
    id: `c1-${key}-${String(start + index).padStart(3,"0")}`,
    level: "C1", topic: "ortografia", status: "published",
    prompt: `Completa amb la forma correcta: «${context}»`, options, answer, explanation,
    source: sources[key], reviewedAt, reviewedBy: "Codex; doble contrast CPNL",
  };
}));

await writeFile(new URL("../content/questions/c1-ortografia.json", import.meta.url), `${JSON.stringify(questions, null, 2)}\n`);
console.log(`Generades ${questions.length} preguntes.`);
