# Änderungen – 27. Oktober 2026

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
