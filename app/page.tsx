"use client";
/* eslint-disable react/no-unescaped-entities */

import { useMemo, useState } from "react";
import questionBank from "../content/questions/c1.json";

type Question = { id:string|number; topic:string; text:string; options:string[]; answer:number; why:string };
const topicMeta = [
  {slug:"accentuacio",icon:"À",title:"Accentuació",description:"Accents, dièresi i paraules conflictives"},
  {slug:"apostrofacio",icon:"L’",title:"Apostrofació",description:"Articles i preposicions davant de vocal"},
  {slug:"pronoms",icon:"EN",title:"Pronoms febles",description:"Substitució i combinacions pronominals"},
  {slug:"verbs",icon:"V",title:"Verbs",description:"Formes verbals i concordança"},
  {slug:"connectors",icon:"+",title:"Connectors",description:"Relació i cohesió entre idees"},
  {slug:"lexic",icon:"ABC",title:"Lèxic",description:"Precisió, barbarismes i vocabulari"},
];
const quarantinedQuestions: Question[] = [
  {id:1,topic:"accentuacio",text:"Quina paraula està ben escrita?",options:["exàmen","examen","examèn"],answer:1,why:"Examen és plana acabada en -en i no porta accent."},
  {id:2,topic:"accentuacio",text:"Completa: «No sé ___ vindrà demà.»",options:["si","sí","s'hi"],answer:0,why:"Si introdueix una interrogativa indirecta i no porta accent."},
  {id:3,topic:"accentuacio",text:"Quina opció és correcta?",options:["Això depén de tu.","Això depèn de tu.","Aixo depèn de tu."],answer:1,why:"En català central, depèn porta accent obert i això també s'accentua."},
  {id:4,topic:"accentuacio",text:"Tria la forma normativa.",options:["conseqüència","consequència","conseqüéncia"],answer:0,why:"Conseqüència porta dièresi a la u i accent obert a la e."},
  {id:5,topic:"apostrofacio",text:"Tria l'opció correcta.",options:["la universitat","l'universitat","l’ universitat"],answer:1,why:"L'article femení s'apostrofa davant d'una vocal àtona."},
  {id:6,topic:"apostrofacio",text:"Com s'escriu correctament?",options:["la història","l'història","l’historia"],answer:1,why:"L'article femení s'apostrofa davant d'h muda; història porta accent."},
  {id:7,topic:"apostrofacio",text:"Completa: «És professora ___ UAB.»",options:["de la","de l'","d'"],answer:1,why:"La sigla UAB es llegeix començant per vocal: de l'UAB."},
  {id:8,topic:"apostrofacio",text:"Quina forma és correcta?",options:["la una del migdia","l'una del migdia","la 1 del migdia"],answer:1,why:"Quan indica l'hora, una duu article apostrofat: l'una."},
  {id:9,topic:"pronoms",text:"Completa: «Tens pa? Sí, ___ tinc.»",options:["en","hi","ho"],answer:0,why:"En substitueix un complement directe indeterminat: pa."},
  {id:10,topic:"pronoms",text:"Completa: «Vas al mercat? Sí, ara ___.»",options:["en vaig","hi vaig","ho vaig"],answer:1,why:"Hi substitueix un complement de lloc introduït per a."},
  {id:11,topic:"pronoms",text:"«Aquest informe, demà ___ enviaré a la directora.»",options:["li","l'","el"],answer:1,why:"L' substitueix el complement directe masculí singular davant de vocal."},
  {id:12,topic:"pronoms",text:"Substitueix els complements: «Dona les claus a la Marta.»",options:["Dona-li-les.","Dona-les-li.","Li les dona."],answer:0,why:"La combinació normativa és li + les: dona-li-les."},
  {id:13,topic:"verbs",text:"Tria la forma correcta: «Demà ___ una reunió.»",options:["hi haurà","hi hauran","haurà"],answer:0,why:"Haver-hi és impersonal i es manté en singular."},
  {id:14,topic:"verbs",text:"Completa: «Si ho ___, t'ho diria.»",options:["sabria","sabés","sàpigues"],answer:1,why:"La condició hipotètica demana imperfet de subjuntiu: sabés."},
  {id:15,topic:"verbs",text:"Quina frase és normativa?",options:["No cal que vinguis.","No fa falta que vinguis.","No és precís que vinguis."],answer:0,why:"No cal que és la construcció genuïna i normativa."},
  {id:16,topic:"verbs",text:"Completa: «Quan ___, avisa'm.»",options:["arribaràs","arribis","arribaries"],answer:1,why:"Després de quan amb valor futur usem el present de subjuntiu."},
  {id:17,topic:"connectors",text:"«Va ploure molt; ___, vam sortir.»",options:["per tant","tanmateix","perquè"],answer:1,why:"Tanmateix expressa contrast entre les dues idees."},
  {id:18,topic:"connectors",text:"«No hi havia places; ___, vam tornar a casa.»",options:["en canvi","per tant","a més"],answer:1,why:"Per tant introdueix una conseqüència."},
  {id:19,topic:"connectors",text:"Quin connector introdueix un exemple?",options:["per exemple","tot i això","és a dir"],answer:0,why:"Per exemple presenta un cas concret que il·lustra la idea."},
  {id:20,topic:"connectors",text:"«És una proposta cara; ___, és la més completa.»",options:["a causa de","malgrat això","de manera que"],answer:1,why:"Malgrat això introdueix una objecció que no anul·la l'afirmació següent."},
  {id:21,topic:"lexic",text:"Tria la forma genuïna: «Hem de ___ la data.»",options:["aclarar","aclarir","clarificar-la"],answer:1,why:"En aquest sentit, el verb adequat és aclarir."},
  {id:22,topic:"lexic",text:"Quina opció és correcta?",options:["adonar-se'n","donar-se compte","donar-se'n compte"],answer:0,why:"La construcció normativa és adonar-se d'una cosa: adonar-se'n."},
  {id:23,topic:"lexic",text:"Completa: «El tren ha arribat amb ___ d'una hora.»",options:["retràs","retard","demora"],answer:1,why:"Retard és la forma habitual i normativa en aquest context."},
  {id:24,topic:"lexic",text:"Quina frase expressa obligació correctament?",options:["Hi ha que estudiar.","S'ha d'estudiar.","És precís estudiar."],answer:1,why:"S'ha de és una perífrasi normativa d'obligació."},
];
void quarantinedQuestions;
const questions: Question[] = questionBank
  .filter((question) => question.status === "published")
  .map((question) => ({
    id: question.id,
    topic: question.topic === "dieresi" ? "accentuacio" : question.topic,
    text: question.prompt,
    options: question.options,
    answer: question.answer,
    why: question.explanation,
  }));
function sample(pool: Question[], count=10){ return [...pool].sort(()=>Math.random()-.5).slice(0,Math.min(count,pool.length)); }

export default function Home(){
  const [activeTopic,setActiveTopic]=useState("tots");
  const [session,setSession]=useState<Question[]>(()=>sample(questions));
  const [index,setIndex]=useState(0),[selected,setSelected]=useState<number|null>(null);
  const [answers,setAnswers]=useState<{id:string|number;correct:boolean}[]>([]),[finished,setFinished]=useState(false);
  const current=session[index],score=answers.filter(a=>a.correct).length;
  const progress=useMemo(()=>((index+(selected!==null?1:0))/session.length)*100,[index,selected,session.length]);
  function start(topic:string){const pool=topic==="tots"?questions:questions.filter(q=>q.topic===topic);if(!pool.length)return;setActiveTopic(topic);setSession(sample(pool));setIndex(0);setSelected(null);setAnswers([]);setFinished(false);setTimeout(()=>document.querySelector("#practica")?.scrollIntoView({behavior:"smooth"}),0)}
  function choose(option:number){if(selected!==null)return;setSelected(option);setAnswers([...answers,{id:current.id,correct:option===current.answer}])}
  function next(){if(index===session.length-1)setFinished(true);else{setIndex(index+1);setSelected(null)}}
  function retryErrors(){const ids=new Set(answers.filter(a=>!a.correct).map(a=>a.id));const errors=session.filter(q=>ids.has(q.id));if(!errors.length){start(activeTopic);return}setSession(errors);setIndex(0);setSelected(null);setAnswers([]);setFinished(false)}
  return <main>
    <header className="header"><a href="#inici" className="logo"><span>ç</span> Practica Català</a><nav><a href="#nivells">Nivells</a><a href="#temes">Temes</a><a href="#practica">Exercicis</a></nav><a href="#temes" className="small-cta">Comença ara</a></header>
    <section className="hero" id="inici"><div className="hero-copy"><div className="tag">SENSE TEORIA. DIRECTE A LA PRÀCTICA.</div><h1>El català<br/>s'aprèn <em>fent.</em></h1><p>Exercicis autocorrectius per practicar al teu ritme. Respon, entén l'error en una línia i torna-ho a intentar.</p><div className="hero-actions"><button onClick={()=>start("tots")} className="main-cta">Comença una sessió <b>→</b></button><a href="#temes" className="text-link">Practicar un tema concret</a></div><div className="quick-facts"><span>✓ Sense registre</span><span>✓ Correcció immediata</span><span>✓ Gratuït</span></div></div><div className="hero-demo"><div className="demo-top"><span>EXERCICI DE MOSTRA</span><b>C1</b></div><p>Tria l'opció correcta:</p><h3>«Tens pa? Sí, en tinc.»</h3><button className="demo-correct">en <span>✓</span></button><button>hi</button><button>ho</button><small><strong>En</strong> substitueix un complement directe indeterminat.</small></div></section>
    <section className="levels section" id="nivells"><div className="section-heading"><div><span className="kicker">PRIMER OBJECTIU</span><h2>Comencem pel nivell C1</h2></div><p>Una base enfocada a adults que volen consolidar el nivell de suficiència. B2 i C2 arribaran després.</p></div><div className="level-grid"><article className="level-card muted-card"><div className="level-badge">B2</div><div><h3>Intermedi</h3><p>Properament</p></div></article><article className="level-card blue featured"><div className="level-badge">C1</div><div><h3>Nivell de suficiència</h3><p>{questions.length} preguntes inicials en sis blocs pràctics.</p><button onClick={()=>start("tots")}>Practicar C1 <span>→</span></button></div></article><article className="level-card muted-card"><div className="level-badge">C2</div><div><h3>Superior</h3><p>Properament</p></div></article></div></section>
    <section className="topics section" id="temes"><div className="section-heading"><div><span className="kicker">TRIA QUÈ VOLS REFORÇAR</span><h2>Exercicis per tema</h2></div><p>Sessions breus. Pots practicar un bloc concret o barrejar-los tots.</p></div><div className="topic-grid">{topicMeta.map(topic=>{const count=questions.filter(q=>q.topic===topic.slug).length;return <button disabled={!count} onClick={()=>start(topic.slug)} className="topic-card" key={topic.slug}><span>{topic.icon}</span><div><h3>{topic.title}</h3><p>{count?`${count} exercicis · ${topic.description}`:"En preparació"}</p></div><b>{count?"→":"·"}</b></button>})}</div></section>
    <section className="practice" id="practica"><div className="practice-intro"><span className="kicker">PRÀCTICA C1</span><h2>{activeTopic==="tots"?"Sessió variada":topicMeta.find(t=>t.slug===activeTopic)?.title}</h2><p>{session.length} preguntes amb correcció immediata i una explicació curta.</p><ul><li>Sense registre ni dades personals</li><li>Resultat final immediat</li><li>Opció de repetir només els errors</li></ul></div><div className="quiz-card">{!finished?<><div className="quiz-meta"><span>Pregunta {index+1} de {session.length}</span><b>Nivell C1</b></div><div className="progress"><i style={{width:progress+"%"}}/></div><h3>{current.text}</h3><div className="options">{current.options.map((option,i)=><button key={option} onClick={()=>choose(i)} className={selected===null?"":i===current.answer?"correct":i===selected?"wrong":"muted"}><span>{String.fromCharCode(65+i)}</span>{option}{selected!==null&&i===current.answer&&<b>✓</b>}</button>)}</div>{selected!==null&&<div className={"feedback "+(selected===current.answer?"good":"bad")}><strong>{selected===current.answer?"Molt bé!":"La resposta no és correcta."}</strong><p>{current.why}</p><button onClick={next}>{index===session.length-1?"Veure el resultat":"Pregunta següent"} →</button></div>}</>:<div className="result"><div className="result-ring">{score}<small>/ {session.length}</small></div><span>SESSIÓ COMPLETADA</span><h3>{score===session.length?"Perfecte!":score/session.length>=.7?"Molt bona feina!":"Cada error és pràctica"}</h3><p>Has encertat {score} de {session.length} preguntes.</p><div className="result-actions">{score<session.length&&<button onClick={retryErrors}>Repetir els errors</button>}<button className="secondary" onClick={()=>start(activeTopic)}>Nova sessió</button></div></div>}</div></section>
    <section className="promise"><span>ç</span><div><h2>Aquí no vens a llegir teoria.</h2><p>Vens a practicar, equivocar-te, entendre l'error i tornar-ho a intentar.</p></div><a href="#temes">Tria un tema →</a></section>
    <footer><a href="#inici" className="logo"><span>ç</span> Practica Català</a><p>Exercicis de català, sense complicacions.</p><small>Projecte independent · 2026</small></footer>
  </main>
}
