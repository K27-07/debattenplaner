# Nachkorrektur-Prüfbericht – Debattenplaner v1.9

**Datum:** 28. Oktober 2026  
**Versionsnummer bleibt 1.9.** Der ursprüngliche v1.9-Stand wurde innerhalb derselben Versionsnummer korrigiert. Grundlage: vom Nutzer bereitgestellte `debattenplaner_v1.9.zip`, Codeänderungen in `app.js`, aktualisierte Dokumentation. Die öffentliche GitHub-Pages-Seite wurde **nicht** geändert oder in einem Live-Browser gegen die aktualisierte ZIP geprüft.

## Korrigierte Befunde

| Nachtest-ID | Problem | Korrektur | Eigener Nachtest |
| --- | --- | --- | --- |
| F1 | Später hinzukommende freiwillige oder erfahrene Juroren kommen bei erneuter Automatikplanung nicht zum Zug | Vermerk `autoSeat` und `reservedRoom` pro Teilnehmergruppe. Vor einer neuen Gesamtplanung werden automatisch belegte Plätze wieder freigegeben; manuelle Platz- und Raumzuweisungen bleiben fest. Konfliktfälle werden auf den ursprünglichen Stand zurückgerollt. | Späterer Freiwilliger ersetzt bisherigen automatischen Nicht-Freiwilligen; nachrangig späterer Erfahrener ersetzt unerfahrenen Automatikjuror; dritter Planungsdurchlauf erhält den Freiwilligen; manuell fixierter Juror bleibt unberührt. |
| F2 | Einzelraumverteilung übersieht Freiwillige in anderen lokalen Raumpools | Globale Nachbedingung für alle automatisch belegten Juryplätze, auch bei Einzelraum-Operationen. Im Konfliktfall keine Änderung der Zuteilungen, statt fälschlicher Erfolgsmeldung. | Zwei Räume, 7 Nicht-Freiwillige in Raum 1, Freiwilliger in Raum 2: keine falsche Jurorenbesetzung in Raum 1. |
| E1 | „Auf Räume verteilen“ erfordert vollständige Debattenbesetzung | Unabhängiger Raum-Zufallsverteiler, der Gruppen ganz lässt, bestehende manuelle Reservierungen bewahrt und keine Team-/Juryplätze vorgibt. Er kann vorherige **automatische reine** Raumzuweisungen erneut durchmischen. | 6, 10, 14 Personen auf 2 Räume: 3+3, 5+5, 7+7; bei 11 Teilnehmern und fester Vorbelegung bleiben alle erhalten und die manuelle Zuordnung geschützt. |
| F3 | Namensfeld verliert bei Enter/Klick den Fokus | Nach erfolgreicher Formularübermittlung wird das neue Namenseingabefeld wieder fokussiert. | Chromium: `document.activeElement.id === 'member-name'` nach Enter. |

## Durchgeführte Tests

- `node --check app.js`: erfolgreich.
- **10/10 gezielte Chromium-Regressionsprüfungen** zu F1, F2, E1, F3 und manuellen Positionen, keine JavaScript-Ausnahmen.
- **17/17 bestehende Chromium-Bedienprüfungen** (u. a. Drag-and-drop, Gruppen, Sprache, Dunkelmodus, Mitglieder löschen, HTML-Escaping), keine JavaScript-Ausnahmen.
- **150/150 zufällige vollständig lösbare OPD-Verteilungen** mit 1–3 Räumen; vollständig, kein Teilnehmerverlust, keine Doppelbelegung, keine erfasste Juryprioritätsverletzung.
- **150/150 weitere zufällige Zweiraum-Verteilungen** mit separater vollständiger Referenzsuche bezüglich Jurypriorität; kein abweichendes Ergebnis.
- **90 zusätzliche Integritätsszenarien mit je 30 Bearbeitungsschritten** (2.700 Schritte), keine Anomalien.
- **100 Teilnehmer, 12 OPD-Räume, 25 Zweiergruppen:** 12 vollständig besetzte Räume, 100 eindeutige Personen, keine Doppelbelegung, 12 freiwillige Juroren.
- **5 zusätzliche isolierte Spezialprüfungen:** wiederholte reine Raumverteilung, manuelle Reservierung mit Gruppe, globale Teamverteilung nach Raum-Zufall, Konfliktrollback bei unpassender lokaler Vorbelegung, und Auftrennung einer gemischten Freiwilligengruppe – alle bestanden.
- Historischer v1.8-/v1.9-Mehrraumfehler wird weiterhin abgefangen. Zulässige unvollständige Pläne sind weiterhin möglich, ebenso 150 px horizontales Scrollen auf 390-px-Viewport ohne Positionsverlust.

## Verhaltensregeln nach der Änderung

1. **„Auf Räume verteilen“** teilt global unsortierte Teilnehmer auf Räume auf, ohne vollständige Teams oder Jury zu verlangen. Manuell zugewiesene Teilnehmer werden nicht umgelegt. Gruppen bleiben zusammen, daher kann die Last bei ungerader/ungünstiger Gruppengröße leicht von exakter Gleichheit abweichen.
2. **„Auf Teams verteilen“** plant vorher automatisch besetzte Plätze neu (unter Beibehaltung manueller Platz- und Raumzuweisungen). Bei Konflikten werden die vorherigen Zuweisungen nicht stillschweigend verworfen.
3. **„Im Raum verteilen“** besetzt ausschließlich den ausgewählten Raum. Wenn die zwingende **turnierweite** Jurypriorität durch bestehende andere Raumreservierungen nicht erfüllbar ist, wird nicht automatisch eine Person aus einem anderen Raum verschoben, sondern eine Konfliktmeldung ausgegeben.
4. Manuell festgelegte Team- und Juryplätze gelten als bewusste Vorgaben und werden nicht überstimmt.

## Einschränkungen und verbleibende Risiken

- Testobjekt war die **lokale ZIP**, getestet mit Node.js und headless Chromium/Playwright. Keine Aussage über eine davon abweichende GitHub-Pages-Bereitstellung.
- Keine Tests auf realen iOS-/Android-Geräten oder in Safari/Firefox; vollständige Fehlerfreiheit ist nicht bewiesen.
- Große/komplexe Planungen laufen weiterhin synchron und können auf langsamen Geräten den Browser kurz blockieren; die begrenzte gemeinsame Suchroutine findet ggf. nicht jede mathematisch mögliche Einteilung.
- Der Planer speichert Sitzungen weiterhin nicht persistent; nach Schließen/Neuladen gehen Eingaben verloren. Das ist dokumentiertes Verhalten und nicht Teil dieser Nachkorrektur.
