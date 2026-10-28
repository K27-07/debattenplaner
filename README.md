# Debattenplaner – Offline-Version im Originaldesign

**Version 1.4 – 28. Oktober 2026:** Touch-Update: Teilnehmer lassen sich nun auch mit dem Finger per längerem Gedrückthalten ziehen, auf Team- und Juryplätze setzen und zu Gruppen zusammenführen. Die Stabilitätsverbesserungen aus v1.3 sowie Jurypriorität und Erfahrungsausgleich bleiben erhalten.

Diese Version orientiert sich bei **Aufbau und Aussehen an der ursprünglich bereitgestellten Vue-/Vuetify-Anwendung**: einfache obere Leiste, die unzugeordneten Teilnehmenden und mögliche Jury am Anfang, Raum-Einstellungen links, weiße runde Debattenfelder, Material-Symbole und kleine graue bzw. grüne Teilnehmer-Chips. Die Oberfläche wurde ohne Vue-Bibliotheken für die lokale Nutzung nachgebildet. Kleine Unterschiede zu Vuetify, beispielsweise bei den Schriftarten oder Icons, sind möglich.

## Start

1. Alle Dateien der ZIP-Datei in **denselben Ordner** entpacken.
2. **`index.html` doppelt anklicken** (öffnet im Standardbrowser).
3. Das Projekt läuft lokal, ohne Installation, Node.js, Internet oder Server. Ein aktueller JavaScript-fähiger Browser wird vorausgesetzt.

`index.html`, `app.js`, `style.css` und `icon.png` gehören zusammen. `index.html` alleine reicht nicht aus. Die HTML-Datei darf nach dem Entpacken direkt über das Dateisystem geöffnet werden.

## Bedienung

- In **Unsortiert** einen Namen eintragen und auf **+** drücken oder die Eingabetaste benutzen.
- Das **Schul-Symbol** neben dem Eingabefeld markiert einen neuen Teilnehmenden als unerfahren (grün); standardmäßig ist er erfahren.
- Teilnehmer **mit der Maus ziehen** und in einem Raum oder Platz ablegen; auf einen anderen Teilnehmer ziehen, um beide zu gruppieren. Bei einer manuellen Platzzuweisung wird **nur die gezogene Person** umgesetzt, auch wenn sie die bisherige Gruppenleitung war.
- Gruppen per **Doppelklick** auf einen Teilnehmer in der Gruppe auflösen. Der normale Klick zur Auswahl verändert die Position der Teilnehmerchips nicht mehr. Beim Auflösen bleiben alle bisherigen Gruppenmitglieder in der Liste erhalten.
- **Auf Smartphones/Tablets:** Einen Teilnehmer etwa **0,35 Sekunden gedrückt halten** und anschließend mit dem Finger auf ein Team, einen Juryplatz oder einen anderen Teilnehmer ziehen. Die Position wird markiert und eine schwebende Vorschau angezeigt. Am Rand scrollt die Ansicht bei Bedarf automatisch horizontal zwischen Teamspalten oder vertikal zwischen Räumen. Loslassen weist zu bzw. bildet eine Gruppe. Ein Ziehen ins Leere oder eine abgebrochene Geste ändert nichts.
- **Ohne Ziehen:** Teilnehmer kurz antippen und anschließend im gewünschten Feld **„Hier zuweisen“** wählen. Zwei Teilnehmer nacheinander antippen, um sie zu gruppieren. Normales Antippen bleibt unverändert; ein langes Drücken ohne anschließende Bewegung verschiebt niemanden.
- **Hinweis zum Scrollen:** Auf Touchgeräten zum normalen Scrollen bevorzugt die freien Flächen zwischen bzw. neben den Teilnehmerchips verwenden. Die Chips selbst sind für längeres Gedrückthalten und Ziehen reserviert.
- Die grünen Symbole in „Unsortiert“ dienen zum Einsammeln und automatischen Verteilen. Sobald mehrere Räume existieren, kann auch auf Räume verteilt werden.
- **OPD:** Regierung und Opposition bekommen jeweils die eingestellte Gruppengröße (3–6). Die Jury erhält die eingestellte Anzahl (1–4). **Alle möglichen Jurorinnen und Juroren haben Vorrang** vor nicht vorgemerkten Personen; nur wenn mehr Personen vorgemerkt sind als Plätze vorhanden sind, kommen die übrigen als Redner in Betracht. Sind zu wenige vorgemerkt, werden Juryplätze mit anderen Personen ergänzt. Anschließend werden erfahrene und unerfahrene Redner möglichst gleichmäßig auf die Teams verteilt; übrige Personen kommen in die **Freien Reden**.
- **BPS:** Vier Zweierteams und die eingestellte Jury müssen vollständig besetzt werden. Die Erfahrungen werden möglichst gleichmäßig auf alle vier Teams verteilt. BPS besitzt keine freien Reden; überzählige Personen bleiben unsortiert.
- Eine automatische Einteilung erfolgt pro Raum **nur, wenn alle vorgesehenen Teams und die Jury vollständig besetzt werden können**. Bei zu wenigen Personen oder nicht passend aufteilbaren Gruppen erscheint eine Hinweismeldung. Gruppen werden nicht auseinandergerissen.
- Bei mehreren Räumen werden verschiedene Verteilungen verglichen. Führt die raumweise Suche nicht zu einer vollständigen Einteilung, wird zusätzlich eine **gemeinsame, begrenzte Rückwärtssuche** über die Plätze aller Räume durchgeführt. Dadurch werden Fälle lösbar, in denen eine frühe lokale Entscheidung knappe Gruppen blockiert. Um lange Wartezeiten bei großen Veranstaltungen zu vermeiden, sind Suchschritte und Rechenzeit der gemeinsamen Rückwärtssuche begrenzt. Wenn diese Grenze ohne vollständigen Plan erreicht wird, erscheint eine **gesonderte Meldung**: Das ist nicht gleichbedeutend damit, dass eine Lösung mathematisch unmöglich wäre. Da Gruppen nicht getrennt werden und manuelle Zuweisungen erhalten bleiben, kann eine mathematisch gleichmäßige Einteilung unmöglich sein.
- Sind mehrere Räume vorhanden und einer davon noch nicht vollständig besetzbar, bleiben übrige, global unsortierte Personen zunächst als Reserve übrig. So können sie nach dem Hinzufügen weiterer Personen für diesen Raum verwendet werden.
- **Auf Räume verteilen** weist Personen zunächst Räumen und Juryplätzen zu. **Im Raum verteilen** erzeugt anschließend daraus die konkreten Teams. **Bei nur einem Raum** berücksichtigt „Im Raum verteilen“ auch die globalen Listen „Unsortiert“ und „Mögliche Jury“.
- **Kapazitätsprüfung:** Wenn ein manuell belegtes Team oder eine Jury mehr Mitglieder als eingestellt enthält, zeigt die automatische Verteilung eine Fehlermeldung und verändert zunächst keine Zuweisungen. Überzählige Personen müssen manuell umgesetzt werden.
- Räume können ergänzt, sortiert, gelöscht und zwischen OPD und BPS umgestellt werden. Deutsch/Englisch und helles/dunkles Farbschema sind verfügbar; der Dunkelmodus stellt auch Texte und Eingabefelder hell dar.

**Keine Speicherung:** Beim Aktualisieren oder Schließen des Browsers wird die aktuelle Sitzung verworfen. Es werden keine Teilnehmerdaten nach außen übertragen.

## GitHub und GitHub Pages

Die Dateien direkt ins Stammverzeichnis eines GitHub-Repositories hochladen und bei Bedarf mit `git clone` herunterladen. Danach kann auf jedem Rechner wieder `index.html` geöffnet werden.

Für die Veröffentlichung über GitHub Pages in **Settings → Pages → Build and deployment** die Veröffentlichung aus dem Root-Ordner des gewünschten Branches aktivieren. Alle lokalen Dateipfade sind relativ; es ist kein zusätzlicher Build nötig.

**Hinweis:** Das GitHub-Symbol in der Oberfläche führt wie im ursprünglichen Projekt zum Repository des ursprünglichen Autors (`HalbFettKaese/debate-planner`). Bei einem eigenen Fork/Repository kann der Link in `app.js` geändert werden.

## Dateien

- `index.html` – Startpunkt
- `app.js` – Bedienoberfläche und Planungslogik
- `style.css` – an das ursprüngliche Vuetify-Design angelehntes Layout
- `icon.png` – Symbol der Website

Der ursprüngliche Vue-Quellcode ist in dieser Offline-Version **nicht enthalten**. Die Anwendung wurde zu plain JavaScript umgebaut, damit sie ohne Node.js und ohne einen lokalen Entwicklungsserver direkt startet.

## Prüfungen

Für **v1.3** wurden 12 Chromium-Bedienungstests und 7 zusätzliche Browser-Smoke-Tests erfolgreich abgeschlossen; ferner die bisherigen 12 Logik-Regressionsszenarien mit 100 Wiederholungen des komplexen Zwei-Räume-Falls und 47 neue zufällige Gruppenkonstellationen im Vergleich zu einer unabhängigen Machbarkeitsprüfung. Die JavaScript-Syntaxprüfung war erfolgreich. Die direkte `file://`-Navigation wird in der Testumgebung administrativ blockiert; die Anwendung wurde daher durch Laden derselben lokalen HTML-, CSS- und JavaScript-Dateien in Chromium geprüft. Nicht alle Browser- und Gerätevarianten sind abgedeckt.

### Tests zu v1.4

15 gezielte praktische Chromium-Prüfungen für Touch- und Mausbedienung bestanden, dazu horizontales und vertikales automatisches Scrollen, Abbruch ohne Datenänderung sowie drei 100-Personen-Regressionstests (OPD, BPS und Mischbetrieb). Einzelheiten stehen in `PRUEFBERICHT_v1.4.md`. Eine echte iOS-/Android-Geräteprüfung steht noch aus.
