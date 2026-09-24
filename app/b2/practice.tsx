"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import bank from "../../content/questions/b2.json";

type Question = {
  id: string;
  topic: string;
  status: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};
type Progress = { sessions: number; answered: number; correct: number };

const emptyProgress: Progress = { sessions: 0, answered: 0, correct: 0 };
const topics = [
  { slug: "accentuacio", icon: "À", title: "Accentuació", description: "Accents i dièresi" },
  { slug: "apostrofacio", icon: "L’", title: "Apostrofació", description: "Articles i contraccions" },
  { slug: "pronoms", icon: "EN", title: "Pronoms febles", description: "Substitució pronominal" },
  { slug: "verbs", icon: "V", title: "Verbs", description: "Temps, modes i concordança" },
  { slug: "connectors", icon: "+", title: "Connectors", description: "Cohesió entre idees" },
  { slug: "lexic", icon: "ABC", title: "Lèxic", description: "Precisió i formes genuïnes" },
];
const questions: Question[] = (bank as Question[]).filter((question) =>
  ["reviewed", "published"].includes(question.status),
);

function sample(pool: Question[], count = 10) {
  const shuffled = [...pool];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function B2Practice() {
  const [activeTopic, setActiveTopic] = useState("tots");
  const [session, setSession] = useState<Question[]>(() => questions.slice(0, 10));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ id: string; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const [savedProgress, setSavedProgress] = useState<Progress>(emptyProgress);
  const current = session[index];
  const score = answers.filter((answer) => answer.correct).length;
  const progress = useMemo(
    () => ((index + (selected !== null ? 1 : 0)) / session.length) * 100,
    [index, selected, session.length],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem("practica-catala-b2-progress");
        if (saved) setSavedProgress(JSON.parse(saved));
      } catch {}
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function start(topic: string) {
    const pool = topic === "tots" ? questions : questions.filter((question) => question.topic === topic);
    if (!pool.length) return;
    setActiveTopic(topic);
    setSession(sample(pool));
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    window.setTimeout(() => document.querySelector("#practica")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function choose(option: number) {
    if (selected !== null) return;
    setSelected(option);
    setAnswers([...answers, { id: current.id, correct: option === current.answer }]);
  }

  function next() {
    if (index === session.length - 1) {
      const updated = {
        sessions: savedProgress.sessions + 1,
        answered: savedProgress.answered + answers.length,
        correct: savedProgress.correct + score,
      };
      setSavedProgress(updated);
      try { localStorage.setItem("practica-catala-b2-progress", JSON.stringify(updated)); } catch {}
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setSelected(null);
  }

  function retryErrors() {
    const ids = new Set(answers.filter((answer) => !answer.correct).map((answer) => answer.id));
    const errors = session.filter((question) => ids.has(question.id));
    if (!errors.length) return start(activeTopic);
    setSession(errors);
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  }

  if (!current) return null;

  return <main className="b2-page">
    <header className="header">
      <Link href="/" className="logo"><span>ç</span> Practica Català</Link>
      <nav><Link href="/">C1</Link><a href="#temes">Temes B2</a><a href="#practica">Exercicis</a></nav>
      <a href="#practica" className="small-cta">Practica B2</a>
    </header>
    <section className="b2-hero" id="inici">
      <div>
        <span className="tag">NIVELL INTERMEDI B2</span>
        <h1>Practica català <em>B2</em></h1>
        <p>Sessions breus amb correcció immediata. Tria un tema o combina’ls tots i consolida el nivell al teu ritme.</p>
        <button className="main-cta" onClick={() => start("tots")}>Comença una sessió <b>→</b></button>
      </div>
      <div className="b2-summary"><strong>{questions.length}</strong><span>exercicis B2 revisats</span><small>Sense registre · Progrés local · Gratuït</small></div>
    </section>
    <section className="topics section" id="temes">
      <div className="section-heading"><div><span className="kicker">TRIA QUÈ VOLS REFORÇAR</span><h2>Temes de català B2</h2></div><p>Pots practicar un bloc concret o fer una sessió variada.</p></div>
      <div className="topic-grid">{topics.map((topic) => {
        const count = questions.filter((question) => question.topic === topic.slug).length;
        return <button key={topic.slug} className="topic-card" onClick={() => start(topic.slug)}><span>{topic.icon}</span><div><h3>{topic.title}</h3><p>{count} exercicis · {topic.description}</p></div><b>→</b></button>;
      })}</div>
    </section>
    <section className="practice" id="practica">
      <div className="practice-intro"><span className="kicker">PRÀCTICA B2</span><h2>{activeTopic === "tots" ? "Sessió variada" : topics.find((topic) => topic.slug === activeTopic)?.title}</h2><p>{session.length} preguntes amb correcció immediata i una explicació breu.</p><ul><li>Respostes plausibles, sense opcions de farciment</li><li>Resultat final immediat</li><li>Opció de repetir només els errors</li></ul>{savedProgress.sessions > 0 && <p className="saved-progress">Progrés desat: <strong>{savedProgress.sessions}</strong> sessions · <strong>{savedProgress.correct}/{savedProgress.answered}</strong> encerts</p>}</div>
      <div className="quiz-card">{!finished ? <><div className="quiz-meta"><span>Pregunta {index + 1} de {session.length}</span><b>Nivell B2</b></div><div className="progress" role="progressbar" aria-label="Progrés de la sessió" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><i style={{ width: `${progress}%` }} /></div><h3>{current.prompt}</h3><div className="options">{current.options.map((option, optionIndex) => <button key={option} onClick={() => choose(optionIndex)} disabled={selected !== null} className={selected === null ? "" : optionIndex === current.answer ? "correct" : optionIndex === selected ? "wrong" : "muted"}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{selected !== null && optionIndex === current.answer && <b>✓</b>}</button>)}</div>{selected !== null && <div aria-live="polite" className={`feedback ${selected === current.answer ? "good" : "bad"}`}><strong>{selected === current.answer ? "Molt bé!" : "La resposta no és correcta."}</strong><p>{current.explanation}</p><button onClick={next}>{index === session.length - 1 ? "Veure el resultat" : "Pregunta següent"} →</button></div>}</> : <div className="result"><div className="result-ring">{score}<small>/ {session.length}</small></div><span>SESSIÓ B2 COMPLETADA</span><h3>{score === session.length ? "Perfecte!" : score / session.length >= .7 ? "Molt bona feina!" : "Cada error és pràctica"}</h3><p>Has encertat {score} de {session.length} preguntes.</p><div className="result-actions">{score < session.length && <button onClick={retryErrors}>Repetir els errors</button>}<button className="secondary" onClick={() => start(activeTopic)}>Fer 10 preguntes més</button></div></div>}</div>
    </section>
    <footer><Link href="/" className="logo"><span>ç</span> Practica Català</Link><div className="footer-center"><p>Exercicis de català, sense complicacions.</p><nav aria-label="Informació legal"><a href="/avis-legal/">Avís legal</a><a href="/privacitat/">Privacitat</a><a href="/cookies/">Cookies</a></nav></div><small>Projecte independent · 2026</small></footer>
  </main>;
}
