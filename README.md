# Debattenplaner – Offline-Version im Originaldesign

Diese Version orientiert sich bei **Aufbau und Aussehen an der ursprünglich bereitgestellten Vue-/Vuetify-Anwendung**: einfache obere Leiste, die unzugeordneten Teilnehmenden und mögliche Jury am Anfang, Raum-Einstellungen links, weiße runde Debattenfelder, Material-Symbole und kleine graue bzw. grüne Teilnehmer-Chips. Die Oberfläche wurde ohne Vue-Bibliotheken für die lokale Nutzung nachgebildet. Kleine Unterschiede zu Vuetify, beispielsweise bei den Schriftarten oder Icons, sind möglich.

## Start

1. Alle Dateien der ZIP-Datei in **denselben Ordner** entpacken.
2. **`index.html` doppelt anklicken** (öffnet im Standardbrowser).
3. Das Projekt läuft lokal, ohne Installation, Node.js, Internet oder Server. Ein aktueller JavaScript-fähiger Browser wird vorausgesetzt.

`index.html`, `app.js`, `style.css` und `icon.png` gehören zusammen. `index.html` alleine reicht nicht aus. Die HTML-Datei darf nach dem Entpacken direkt über das Dateisystem geöffnet werden.

## Bedienung

- In **Unsortiert** einen Namen eintragen und auf **+** drücken oder die Eingabetaste benutzen.
- Das **Schul-Symbol** neben dem Eingabefeld markiert einen neuen Teilnehmenden als unerfahren (grün); standardmäßig ist er erfahren.
- Teilnehmer **mit der Maus ziehen** und in einem Raum oder Platz ablegen; auf einen anderen Teilnehmer ziehen, um beide zu gruppieren.
- Gruppen per **Doppelklick** auf einen Teilnehmer in der Gruppe auflösen.
- Auf Touchgeräten bzw. alternativ ohne Ziehen: Teilnehmer antippen, anschließend im gewünschten Feld **„Hier zuweisen“** wählen. Zwei Teilnehmer nacheinander antippen, um sie zu gruppieren.
- Die grünen Symbole in „Unsortiert“ dienen zum Einsammeln und automatischen Verteilen. Sobald mehrere Räume existieren, kann auch auf Räume verteilt werden.
- **OPD:** Automatisch werden Regierung und Opposition vollständig mit jeweils mindestens 3 Personen besetzt. Über **Gruppengröße** können 3–6 Personen pro Team eingestellt werden. Die Jury erhält genau die gewünschte Anzahl (1–4), bevorzugt aus **Mögliche Jury**; fehlen dort Personen, werden andere Teilnehmende genommen. Erst danach werden die übrigen Personen in **Freie Sprecher** einsortiert.
- **BPS:** Vier Zweierteams und die eingestellte Jury müssen vollständig besetzt werden. BPS besitzt keine freien Reden; überzählige Personen bleiben unsortiert.
- Eine automatische Einteilung erfolgt pro Raum **nur, wenn alle vorgesehenen Teams und die Jury vollständig besetzt werden können**. Bei zu wenigen Personen oder nicht passend aufteilbaren Gruppen erscheint eine Hinweismeldung. Gruppen werden nicht auseinandergerissen.
- Sind mehrere Räume vorhanden und einer davon noch nicht vollständig besetzbar, bleiben übrige, global unsortierte Personen zunächst als Reserve übrig. So können sie nach dem Hinzufügen weiterer Personen für diesen Raum verwendet werden.
- **Auf Räume verteilen** weist Personen zunächst Räumen und Juryplätzen zu. **Im Raum verteilen** erzeugt anschließend daraus die konkreten Teams.
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

Automatisierte Browser-Funktionstests mit eingebundenem JavaScript und CSS wurden für OPD, BPS, Team-/Jurygröße, mögliche Jurymitglieder, mehrere Räume, Raumverteilung, Gruppen und Dunkelmodus durchgeführt. Ein direkter Test über `file://` war in der Testumgebung durch die Browserrichtlinien gesperrt. Die Anwendung verwendet weiterhin ausschließlich relative lokale Ressourcen.
