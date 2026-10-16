import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const bank=JSON.parse(await readFile(new URL("../content/questions/b2.json",import.meta.url),"utf8"));
const correct=q=>q.options[q.answer];
const find=text=>{const q=bank.find(q=>q.prompt.includes(text));assert.ok(q,"Falta: "+text);return q;};
test("conserva la distinció b/v en paraules que existeixen totes dues",()=>{
 assert.equal(correct(find("La ferida està coberta")),"bena");
 assert.equal(correct(find("podem ___ tota la vall")),"veure");
 assert.equal(correct(find("necessito ___ aigua")),"beure");
});
test("diferencia l'apostrofació segons el gènere i la vocal inicial",()=>{
 assert.equal(correct(find("la + infermera")),"la infermera");
 assert.equal(correct(find("el + informe")),"l'informe");
 assert.equal(correct(find("de + el + ascensor")),"de l'ascensor");
 assert.equal(correct(find("a + el + magatzem")),"al magatzem");
});
test("els pronoms respecten el complement i el nombre del destinatari",()=>{
 assert.equal(correct(find("a la coordinadora")),"La recepcionista li envia una resposta.");
 assert.equal(correct(find("als monitors")),"El dependent els envia una resposta.");
 assert.equal(correct(find("El responsable confirma això")),"El responsable ho confirma.");
});
test("manté la grafia actual de dona sense accent",()=>{
 assert.equal(correct(find("la finestra ___ al pati")),"dona");
});
test("les preguntes de lectura distingeixen recomanacions, requisits i condicions",()=>{
 assert.equal(correct(find("És obligatori arribar amb transport públic?")),"No, és una recomanació");
 assert.equal(correct(find("El formulari tot sol assegura definitivament la plaça?")),"No, també cal confirmació i pagament dins del termini");
});
test("el banc és propi, complet i no depèn d'identificadors C1",()=>{
 assert.equal(bank.length,1000);
 assert.equal(new Set(bank.map(q=>q.id)).size,1000);
 assert.ok(bank.every(q=>!q.derivedFrom&&q.origin==="b2-independent-2026-10"));
});
