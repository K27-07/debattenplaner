# Änderungen – Debattenplaner v1.2 (27. Oktober 2026)

## Behobene Fehler

1. **Mehrraumverteilung:** Wenn die bisherige nacheinander ausgeführte Zuteilung nicht alle Räume füllen kann, durchsucht eine zusätzliche gemeinsame Rückwärtssuche die verfügbaren Gruppen und freien Plätze aller Räume. Das verhindert die nachgewiesene Fehleinteilung mit vier Dreiergruppen, einer Zweiergruppe und zwei Einzelpersonen. Die Suche ist aus Leistungsgründen begrenzt.
2. **„Im Raum verteilen“ bei einem Raum:** Die Funktion greift jetzt auch auf die global unsortierten Teilnehmenden und vorgemerkten Juroren zu. Mit sieben Personen können 3 Regierungsredner, 3 Oppositionsredner und 1 Juror zugeteilt werden.
3. **Überfüllte Teams/Jury:** Die automatische Zuteilung prüft jetzt ausdrücklich manuell überfüllte Plätze und zeigt die betroffenen Räume, Plätze und Zahlen an. Vor der Korrektur der Überfüllung nimmt sie keine Änderungen an der Belegung vor.

## Unverändert

- Originalgetreue Offline-Oberfläche, Drag-and-drop und Einzelpersonen beim manuellen Verschieben
- Priorität für vorgemerkte Jurymitglieder, Erfahrungsausgleich, OPD/BPS und freie Reden
- Bestehender GitHub-Link auf HalbFettKaese, keine Speicherung und kein Installationsbedarf

## Tests

- 12 gezielte Testkonstellationen erfolgreich, darunter 100 Wiederholungen der problematischen Mehrraumverteilung.
- Vergleich mit v1.1 anhand von 160 reproduzierbaren Testläufen des schwierigen Gruppenfalls: v1.1 konnte keinen Lauf vollständig besetzen, v1.2 alle 160.
- 120 unabhängig auf Lösbarkeit geprüfte Gruppenkonstellationen: 61 lösbare und 59 nicht lösbare, alle korrekt behandelt.
- JavaScript-Syntaxprüfung bestanden.
- Browser-Sichtprüfung in der Testumgebung nicht möglich (Browser sperrt sowohl lokale Dateien als auch den Testserver).

---

## Änderungen der Vorgängerversion v1.1



## Automatische Einteilung

- Mögliche Jurymitglieder haben bei freien Juryplätzen **strikten Vorrang** vor anderen Personen. Sind mehr Kandidaten vorgemerkt, als Plätze existieren, können die nicht benötigten Kandidaten als Redner eingesetzt werden.
- Wenn die Jury-Liste nicht ausreicht, werden die fehlenden Plätze mit anderen verfügbaren Personen gefüllt.
- Bei OPD werden Regierung und Opposition möglichst mit einer ähnlichen Zahl erfahrener und unerfahrener Mitglieder besetzt. Bei BPS gilt dies für die vier Zweierteams.
- Die neue Optimierung berücksichtigt sowohl die Unterschiede zwischen Teams innerhalb einer Debatte als auch die Erfahrungsverteilung zwischen Räumen. Bei Gleichstand werden Personen zufällig ausgewählt.
- Die automatische Verteilung füllt zuerst reguläre Teams und Jury. Nur überzählige Personen gehen bei OPD in freie Reden. Bei BPS bleiben sie unsortiert.
- Bereits manuell gesetzte Personen bleiben auf ihren Plätzen. Gruppen werden nicht auseinandergerissen.
- Bei mehreren Räumen werden mehrere alternative Zuteilungen geprüft; ein absolutes globales Optimum ist bei vielen Gruppen nicht garantiert.

## Sonstige Korrekturen

- Beim Auflösen einer Gruppe werden die Mitglieder wieder an der richtigen Listenposition eingefügt.
- Beim Löschen des Gruppenleiters bleiben dessen bisherige Gruppenmitglieder vollständig erhalten.
- Die bisherigen Korrekturen für Drag-and-drop, Dunkelmodus und die offline startbare Oberfläche bleiben erhalten.

## Start und Veröffentlichung

`index.html` im entpackten Ordner öffnen. `app.js`, `style.css` und `icon.png` müssen im selben Ordner bleiben. Ein Server, Node.js und ein Installationsvorgang sind nicht erforderlich. Alle Projektdateien können ins Stammverzeichnis eines öffentlichen GitHub-Repositories hochgeladen und über GitHub Pages veröffentlicht werden.
