# Banc B2 independent

El banc B2 conté 1.000 activitats originals. No es construeix a partir de C1.
Els continguts i els fitxers C1 queden fora d'aquesta revisió.

## Distribució
- Verbs en context: 240.
- Pronoms febles: 150 (directes, indirectes, en, hi i ho).
- Apostrofació i contraccions: 120.
- Connectors: 100.
- Accentuació i dièresi: 100.
- Ortografia: 100.
- Lèxic contextual: 100; concordança: 30; comprensió escrita funcional: 60.

El banc combina consolidació gramatical amb tasques intermèdies de cohesió, precisió
lèxica i comprensió de condicions, excepcions i terminis en situacions socials i laborals.
No és una prova oficial completa ni avalua comprensió oral o expressió lliure.

## Fonts i criteri
Referència de nivell: https://www.cpnl.cat/gramatica/nivell/intermedi-2
Cada activitat inclou una font CPNL i la regla o habilitat que es treballa.
Els avisos i els contextos són de redacció pròpia; no es copien models d'examen.

Les explicacions s'escriuen en català planer, amb els termes necessaris explicats.
Una variant territorial normativa no s'utilitza com a resposta incorrecta.
Els enunciats que permetrien diverses interpretacions indiquen expressament la
relació o el temps verbal que es vol treballar.

## Edició i comprovacions
El fitxer publicat és content/questions/b2.json. Les correccions manuals es fan aquí.
El generador conserva un banc independent existent per evitar esborrar aquestes correccions.
La reconstrucció explícita amb node scripts/generate-b2-bank.mjs --rebuild recupera
la base editorial d'aquesta versió i sobreescriu les correccions posteriors; no s'utilitza
com a pas rutinari de validació.

Comprovacions sense modificar cap dada C1:
- node scripts/validate-b2-bank.mjs
- node --test tests/b2-bank.test.mjs

El validador comprova identificadors, respostes, metadades, opcions diferents,
enunciats duplicats i coincidències contextuals amb els fitxers C1 presents.
La independència també es garanteix en la construcció: el generador no llegeix C1.
