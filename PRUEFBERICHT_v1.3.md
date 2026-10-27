# Prüfbericht – Debattenplaner v1.3

**Datum:** 27. Oktober 2026  
**Prüfgegenstand:** unveröffentlichte Offline-Version v1.3, unabhängig vom GitHub-Repository

## Quellcodeanalyse

- Ein gewöhnlicher Klick löst keinen vollständigen DOM-Neuaufbau mehr aus. Die Teilnehmerchips behalten ihre Position auch dann, wenn ein Teilnehmer ausgewählt wird.
- Gruppendoppelklick löst die Gruppe vollständig auf. Bei manuellem Verschieben einer Gruppe wird nur die gewählte Person bewegt; die automatische Verteilung bleibt gruppenorientiert.
- Die gemeinsame Mehrraum-Suche wählt besonders knappe Plätze zuerst, verwirft erkannte aussichtslose Zustände und begrenzt Berechnungsaufwand durch eine Arbeits- und Zeitgrenze. Reicht die Suche nicht aus, meldet die Anwendung ausdrücklich eine nicht abgeschlossene Suche.
- Ein berechneter Plan wird vor dem Verschieben auf Kapazitäten, Eindeutigkeit, erlaubte Quellplätze und gültige Mitglieder geprüft.

## Automatisierte und praktische Tests

| Kategorie | Ergebnis |
|---|---|
| 12 reale Chromium-Bedienungsszenarien einschließlich 16 wiederholter Doppelklick-Gruppenauflösungen | 12/12 bestanden |
| 7 weitere Chromium-Smoke-Tests | 7/7 bestanden |
| 12 bestehende Regressionstests mit 100 wiederholten Zweiraumfällen | 12/12 bestanden, 321 Integritätsprüfungen |
| Zufällige Gruppenfälle mit unabhängiger Lösbarkeitsprüfung (ausreichende Teilnehmerzahl) | 47/47 bestanden |
| Zusätzliche Einzelverschiebeprüfungen (Gruppenleitung und Gruppenmitglied) | 2/2 bestanden |
| JavaScript-Syntax (Node --check) | bestanden |

Bei den 47 zufälligen Mehrraumfällen wurde keine Abweichung zwischen der unabhängigen Machbarkeitsprüfung und der erzeugten Verteilung festgestellt; die maximale Laufzeit dieser kleinen Testfälle betrug 69 ms. Größere Konstellationen sind nicht damit gleichzusetzen.

## Einschränkungen

- 100 Prozent Zuverlässigkeit lassen sich aus endlichen Tests nicht beweisen.
- Durch die begrenzte Suche können bei sehr schwierigen Gruppenkonstellationen vollständige Einteilungen übersehen werden. Dies wird kenntlich gemacht.
- Lokale `file://`-Navigation ist im verwendeten Chromium durch Administratorregeln blockiert. Stattdessen wurden dieselben lokalen Dateien programmatisch in Chromium geladen und dort durch echte Klicks und Drag-and-drop bedient.
- Kein abschließender browserübergreifender Test in Firefox, Safari oder auf physischen Touchgeräten.
- Veröffentlichung auf GitHub Pages wird erst durch einen Commit des Nutzers ausgelöst; dieses Paket verändert das bestehende Repository nicht.

## Ergebnis

Die untersuchten Standardvorgänge und reproduzierten früheren Bedienungsfehler haben die Prüfungen bestanden. v1.3 ist für die Erprobung im regulären Betrieb geeignet; bei komplexen Gruppen sollte das Resultat weiterhin visuell kontrolliert werden.
