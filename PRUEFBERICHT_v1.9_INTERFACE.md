> **Hinweis zum aktuellen v1.9-Stand:** Die ursprüngliche Aussage, dass beim Hinzufügen Erfahrung und Jurybereitschaft für die nächste Person beibehalten werden, beschreibt nur den damaligen Interface-Zwischenstand. Die aktuelle Nachkorrektur setzt beide Sonderoptionen nach jeder erfolgreichen Anmeldung zurück (neuer Teilnehmer: erfahren, nicht freiwillig jurierend). Siehe `PRUEFBERICHT_v1.9_EINGABESTANDARD.md`.

# Debattenplaner v1.9 – Interface-Überarbeitung und Prüfung

Stand: 28.10.2026. Grundlage: `debattenplaner_v1.9_juryfix.zip` (letzter lokal korrigierter Planer); GitHub/Live-Seite blieb unverändert.

## Zweck und Änderungen

Das Werkzeug plant **einen Clubabend**, keine mehrstufige Turnierhistorie. Anwesenheit und Erfahrung erfassen, Räume einstellen, freiwillige Juroren und feste Redeplätze vormerken, danach alle übrigen Personen zufällig und regelkonform aufteilen.

1. **Teilnehmende bearbeiten:** Stiftsymbol direkt am Chip. Name, Erfahrung und individuelle Jurybereitschaft nachträglich ändern. Namensänderungen aktualisieren Referenzen in Raumlisten, Gruppen und Auswahlzustand. Doppelte Namen werden abgelehnt, statt unbemerkt mit anderen Personen zusammengeführt zu werden. Freiwilligenstatus von bereits platzierten Personen wird geändert, aber ihr fester Platz dadurch **nicht** automatisch verschoben. Die nächste automatische Teamverteilung berücksichtigt den neuen Status.
2. **Schneller erfassen:** Eingabefokus bleibt nach Enter erhalten; Einstellung „Erfahren“ und der neue freiwillige Jury-Schalter bleiben für weitere Anmeldungen erhalten. Freiwillige erscheinen direkt im Wartebereich „Mögliche Jury“. Auf falsche Einstellungen für den nächsten Namen achten, da sie bewusst weiterverwendet werden.
3. **Räume überblicken:** Zähler für Anwesende und noch nicht raumverteilte Personen, für jeden Raum ein Name, Format, Personenzahl und Stand der Pflichtplätze.
4. **Hilfreichere Fehlermeldung:** Unvollständige Debatten benennen zusätzlich offene Pflichtpositionen. Bei Gruppenkonflikten wird ein Hinweis zum Prüfen fester Plätze/Gruppen/Raumzahlen ausgegeben. Meldungen über die Jurypriorität oder Suchgrenzen bleiben erhalten.

Die Planungsfunktionen `findCompleteRoomAllocation`, `findJointRoomAllocation`, `improveJointJuryPriority`, `findPriorityFirstPlan` und deren Auswahl-/Validierungsregeln wurden nicht geändert. HTML und CSS bleiben ohne externe Abhängigkeiten offline lauffähig. Keine Speicherung oder Datenübermittlung hinzugefügt.

## Automatisierte Prüfungen

- **20/20** neue Chromium-Bedientests bestanden: Teilnehmererfassung und Eingabefokus, Freiwilligen-/Erfahrungsstatus, Namensänderung, doppelte Namen, Gruppenführer/Kind umbenennen und auflösen, geschützter freier Redeplatz, Priorität nach aktualisierter Jurybereitschaft, detaillierte Warnung, englische Sprache und mobiler Bearbeitungsdialog. Keine erfassten JavaScript-Ausnahmen.
- **4/4** Bildschirmbreiten (320, 390, 768, 1.280 px) mit je 200 Teilnehmern: kein unerwünschtes Überlaufen der globalen Teilnehmerliste; Bearbeitung/Umbenennung auch bei Sonderzeichen und HTML-ähnlichem Text ohne Script-Injektion. Prüfung auf Namenskollision bestanden.
- **1.000/1.000** deterministische, zufällig erzeugte Clubabende (577 OPD, 300 BPS, 123 gemischt). Bei diesen Szenarien: vollständige Pflichtplätze, manuelle Vorgaben, Jurypriorität und Teilnehmerlisten-Integrität bestanden; keine Testfälle fehlgeschlagen. Median der reinen Berechnungszeit lokal ~1,6 ms, 95. Perzentil ~79 ms, Maximum ~223 ms (keine garantierten Werte für andere Geräte).
- **1/1** zuvor schwieriger deterministischer 100-Personen-Regressionstest mit 11 Räumen, 19 freiwilligen Juroren und manuellen Vorbelegungen bestanden: alle 11 Räume vollständig, 19 Freiwillige in Jury, keine verlorenen Personen, keine veränderten Festlegungen.
- JavaScript-Syntaxprüfung (`node --check app.js`) bestanden.

## Einschränkungen

Diese Tests sind Stichproben und beweisen keine vollständige Fehlerfreiheit. Automatische Platzsuche ist weiterhin rechnerisch begrenzt; reale Safari-/iOS-Geräte und das noch nicht aktualisierte GitHub Pages wurden **nicht** geprüft. Keine Cloud-Speicherung, weil der Clubabend unmittelbar nach der Verteilung beginnt.

## Wiedergabe

Die Benutzeroberfläche lässt sich mit `index.html` im Browser prüfen. Die optionalen Entwicklerprüfungen befinden sich unter `tests/` (Chromium + Python Playwright beziehungsweise Node.js erforderlich). `tests/priority_100.js` prüft den früheren schwierigen Planungsfall.
