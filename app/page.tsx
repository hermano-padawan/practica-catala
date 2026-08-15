"use client";
import { useMemo, useState } from "react";

const levels = [
  { level:"B2", title:"Nivell intermedi", text:"Consolida l'ortografia, els verbs i el vocabulari d'ús habitual.", color:"coral" },
  { level:"C1", title:"Nivell de suficiència", text:"Practica pronoms febles, connectors, lèxic i correcció lingüística.", color:"blue" },
  { level:"C2", title:"Nivell superior", text:"Treballa la precisió, els registres i les formes més exigents.", color:"violet" },
];
const topics = [
  ["À","Accentuació","En preparació"],["L'","Apostrofació","En preparació"],["EN","Pronoms febles","En preparació"],["V","Verbs","En preparació"],
  ["+","Connectors","En preparació"],["ABC","Lèxic","En preparació"],["?","Barbarismes","En preparació"],["TXT","Comprensió lectora","En preparació"],
];
const questions = [
  {text:"Quina opció completa correctament la frase? «No sé ___ arribarà a temps.»",options:["si","sí","s'hi"],answer:0,why:"Si introdueix una pregunta indirecta i no porta accent."},
  {text:"Tria la forma correcta: «Demà ___ una reunió important.»",options:["hi haurà","hi hauran","haurà"],answer:0,why:"El verb haver-hi és impersonal i es manté en singular."},
  {text:"Completa: «Aquest informe, demà ___ enviaré a la directora.»",options:["li","l'","el"],answer:1,why:"L' substitueix el complement directe masculí singular davant d'un verb començat per vocal."},
  {text:"Quina paraula està ben escrita?",options:["exàmen","examen","examèn"],answer:1,why:"Examen és una paraula plana acabada en -en i no porta accent."},
  {text:"Tria el connector adequat: «Va ploure molt; ___, vam sortir.»",options:["per tant","tanmateix","perquè"],answer:1,why:"Tanmateix expressa contrast entre les dues idees."},
];

export default function Home(){
  const [index,setIndex]=useState(0),[selected,setSelected]=useState<number|null>(null),[score,setScore]=useState(0),[finished,setFinished]=useState(false);
  const current=questions[index];
  const progress=useMemo(()=>((index+(selected!==null?1:0))/questions.length)*100,[index,selected]);
  function choose(option:number){if(selected!==null)return;setSelected(option);if(option===current.answer)setScore(score+1)}
  function next(){if(index===questions.length-1){setFinished(true);return}setIndex(index+1);setSelected(null)}
  function restart(){setIndex(0);setSelected(null);setScore(0);setFinished(false)}
  return <main>
    <header className="header"><a href="#inici" className="logo"><span>ç</span> Practica Català</a><nav><a href="#nivells">Nivells</a><a href="#temes">Temes</a><a href="#practica">Pràctica ràpida</a></nav><a href="#practica" className="small-cta">Comença ara</a></header>
    <section className="hero" id="inici"><div className="hero-copy"><div className="tag">SENSE TEORIA. DIRECTE A LA PRÀCTICA.</div><h1>El català<br/>s'aprèn <em>fent.</em></h1><p>Exercicis autocorrectius de català per practicar al teu ritme. Tria un nivell o un tema i comença ara mateix.</p><div className="hero-actions"><a href="#practica" className="main-cta">Fer una prova ràpida <b>→</b></a><a href="#nivells" className="text-link">Veure tots els exercicis</a></div><div className="quick-facts"><span>✓ Sense registre</span><span>✓ Correcció immediata</span><span>✓ Gratuït</span></div></div>
      <div className="hero-demo"><div className="demo-top"><span>EXERCICI DE MOSTRA</span><b>C1</b></div><p>Tria l'opció correcta:</p><h3>«No ___ vaig dir perquè no el volia preocupar.»</h3><button className="demo-correct">li ho <span>✓</span></button><button>l'hi</button><button>ho li</button><small>Resposta correcta. <strong>Li ho</strong> combina el complement indirecte <em>li</em> i el pronom neutre <em>ho</em>.</small></div></section>
    <section className="levels section" id="nivells"><div className="section-heading"><div><span className="kicker">TRIA EL TEU NIVELL</span><h2>Practica allò que necessites</h2></div><p>No cal seguir un curs. Entra directament als exercicis del teu nivell.</p></div><div className="level-grid">{levels.map(item=><article className={"level-card "+item.color} key={item.level}><div className="level-badge">{item.level}</div><div><h3>{item.title}</h3><p>{item.text}</p><a href="#practica">Practicar {item.level} <span>→</span></a></div></article>)}</div></section>
    <section className="topics section" id="temes"><div className="section-heading"><div><span className="kicker">TRIA QUÈ VOLS REFORÇAR</span><h2>Exercicis per tema</h2></div><p>Sessions curtes per practicar una dificultat concreta sense perdre temps.</p></div><div className="topic-grid">{topics.map(([icon,title,count])=><a href="#practica" className="topic-card" key={title}><span>{icon}</span><div><h3>{title}</h3><p>{count}</p></div><b>→</b></a>)}</div></section>
    <section className="practice" id="practica"><div className="practice-intro"><span className="kicker">PROVA-HO ARA</span><h2>Cinc preguntes.<br/>Dos minuts.</h2><p>Una petita sessió de mostra amb exercicis variats de nivell C1.</p><ul><li>Correcció després de cada resposta</li><li>Explicació breu, sense lliçons llargues</li><li>Resultat final immediat</li></ul></div>
      <div className="quiz-card">{!finished?<><div className="quiz-meta"><span>Pregunta {index+1} de {questions.length}</span><b>Nivell C1</b></div><div className="progress"><i style={{width:progress+"%"}}/></div><h3>{current.text}</h3><div className="options">{current.options.map((option,i)=><button key={option} onClick={()=>choose(i)} className={selected===null?"":i===current.answer?"correct":i===selected?"wrong":"muted"}><span>{String.fromCharCode(65+i)}</span>{option}{selected!==null&&i===current.answer&&<b>✓</b>}</button>)}</div>{selected!==null&&<div className={"feedback "+(selected===current.answer?"good":"bad")}><strong>{selected===current.answer?"Molt bé!":"No és aquesta."}</strong><p>{current.why}</p><button onClick={next}>{index===questions.length-1?"Veure el resultat":"Pregunta següent"} →</button></div>}</>:<div className="result"><div className="result-ring">{score}<small>/ {questions.length}</small></div><span>SESSIÓ COMPLETADA</span><h3>{score>=4?"Molt bona feina!":"Continua practicant"}</h3><p>Has encertat {score} de {questions.length} preguntes.</p><button onClick={restart}>Tornar-ho a provar</button></div>}</div></section>
    <section className="promise"><span>ç</span><div><h2>Aquí no vens a llegir teoria.</h2><p>Vens a practicar, equivocar-te, entendre l'error i tornar-ho a intentar.</p></div><a href="#practica">Comença a practicar →</a></section>
    <footer><a href="#inici" className="logo"><span>ç</span> Practica Català</a><p>Exercicis de català, sense complicacions.</p><small>Projecte independent · 2026</small></footer>
  </main>
}
