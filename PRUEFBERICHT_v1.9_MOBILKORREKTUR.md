# Prüfbericht – Debattenplaner v1.9, mobile Nachkorrektur

**Datum:** 28. Oktober 2026
**Ausgangsbasis:** `debattenplaner_v1.9_gruppenkorrektur.zip` (letzter bereitgestellter Stand). GitHub wurde nicht verändert.

## Änderungen und Ursachen

### A – globale Teilnehmerliste wächst horizontal

**Ursache:** Unter 960 px setzte `.board .slots { width: max-content; }` eine inhaltsgetriebene Gridbreite. Das global verwendete Grid konnte dadurch über 13.000 px breit werden, obwohl `flex-wrap` für einzelne Chips aktiviert war.

**Korrektur:** Ausschließlich im globalen Board feste verfügbare Breite, `min-width:0`, und bei höchstens 690 px eine statt zwei Spalten. Das Layout regulärer Debattenräume wird nicht eingeschränkt.

**Chromium-Tests:** 5, 20, 70 und 200 Teilnehmer bei jeweils 320, 390, 768 und 1280 px (16 Konstellationen). In allen Fällen blieb `scrollWidth` des globalen Boards auf seiner sichtbaren Breite und die Teilnehmer wurden in mehrere Zeilen umgebrochen. Beispielsweise bei 390 px und 70 Namen: `scrollWidth=370 px`, `clientWidth=370 px`, 24 belegte Zeilen.

### B – Wischen über Namen wird blockiert

**Ursache:** `.member { touch-action: none }` deaktivierte browserseitige Wischgesten. Die bisherige Touch-Pointer-Eingabe verlangte diesen Wert, um das eigene Ziehen zu erzwingen.

**Korrektur:** Normales Touch-Scrolling ist wieder aktiv. Touchstart/Touchmove/Touchend behandeln ein 350-ms-Halten als Drag; erst danach verhindert ein nichtpassiver `touchmove`-Handler die Scrollaktion. Bewegung vor dem Halteintervall verwirft den Dragkandidaten. Für einen Stift bleibt die Pointer-Event-Behandlung erhalten, Maus-HTML-DnD ist unverändert.

**Chromium-Touchsimulation:**

- Vertikales Wischen direkt auf einem Teilnehmer: Scrollposition anschließend 291 px.
- Horizontales Wischen direkt auf einem bereits im OPD-Raum eingetragenen Teilnehmer: Board-Scrollposition anschließend 267 px (Start 0).
- Kurzes Antippen: Auswahlmarker korrekt gesetzt.
- 510 ms Halten mit anschließendem Ziehen: Drag-Vorschau erscheint; Person wird in ein OPD-Team abgelegt; Vorschau verschwindet nach dem Loslassen.
- Namenseingabe per Enter nach Touch-Drag weiterhin möglich.
- Keine vom Browser gemeldeten JavaScript-Ausnahmen in diesen Prüfschritten.

## Regression der fachlichen Verteilung

**6/6 gezielte Fälle bestanden:** OPD mit freiwilligen Juroren und fest besetzten freien Reden, zwei OPD-Räume, BPS mit festem Teamplatz, ungenügende Anzahl von Teilnehmern, zweistufige Raum-/Teamverteilung, manuell fest besetzter Juror.

**1.000/1.000 erzeugte Clubabende bestanden**, darunter 577 reine OPD-, 300 reine BPS- und 123 Mischkonstellationen. Geprüft wurden die vollständige Belegung von Teams/Jury, feste Plätze, doppelte/verlorene Personen und Vorrang freiwilliger Juroren.

Die fachlichen Funktionen wurden nicht modifiziert; Änderungen beschränken sich auf CSS und Eingabeereignisse.

## Einschränkungen

- Automatische Tests in **Chromium** (mobile Simulation), keine Tests auf physischen iPhones/Android-Geräten, nicht in Safari/Firefox.
- Einzelne komplexe Gruppenkonstellationen und die Suchzeitbegrenzungen des ursprünglichen Zuordnungsalgorithmus bleiben unverändert.
- Das Projekt speichert Teilnehmer nicht dauerhaft; ein Neuladen setzt die Planung zurück.
- Die GitHub-Pages-Liveversion war nicht Testgegenstand.

**Bewertung:** Die beiden gemeldeten mobilen Bedienprobleme sind in den getesteten Chromium-Szenarien behoben. Dies garantiert nicht, dass keine weiteren Fehler vorhanden sind.
