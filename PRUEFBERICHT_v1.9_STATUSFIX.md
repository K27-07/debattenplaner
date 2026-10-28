# Prüfbericht – Statuskorrektur, Debattenplaner v1.9

Datum: 28. Oktober 2026. Grundlage: zuletzt ausgelieferte `debattenplaner_v1.9_eingabe_korrigiert.zip`; GitHub nicht verändert. Ziel: Einmalige Organisation einer Clubdebatte mit Anwesenheitserfassung, festen Positionen, freiwilligen Juroren und automatischer, regelkonformer Zuteilung.

## Bestätigter Ausgangsfehler

Nach sieben Teilnehmern und erfolgreicher OPD-Verteilung zeigte die Anwendung „Automatisch eingeteilt: 1 Raum/Räume.“. Das manuelle Löschen des Jurors reduzierte die Belegung auf 6 von 7 Pflichtplätzen, während die vorherige Erfolgsmeldung bestehen blieb.

**Ursache:** Die Bedienereignisse für Löschen, Gruppieren, Entgruppieren und manuelles Verschieben zeichneten die Oberfläche neu, ohne `state.notice` zurückzusetzen. Die Anzeige wiederholte daher den Status einer früheren Berechnung.

## Gezielte Korrektur

In `app.js` wird die überholte Meldung jetzt nach tatsächlichen manuellen Bedienaktionen zurückgesetzt: Teilnehmer löschen, Platz zuweisen, Gruppen bilden oder lösen (Maus/Klick/Tastatur), Drag-and-drop (Maus/Touch/Stift), Räume hinzufügen/löschen/verschieben sowie Einsammeln. Bei neuer automatischer Verteilung wird ein aktueller Status erzeugt. Das Hinzufügen neuer Teilnehmer und das Ändern der Räumeinstellungen haben die Meldung bereits zuvor zurückgesetzt. Reine Auswahl bzw. Wechsel des Farbschemas belässt den Hinweis. Die spezifische Meldung nach einer Teilnehmerbearbeitung bleibt bestehen.

**Nicht verändert:** Such- und Verteilungsalgorithmen, Jurypriorität, Fairness, feste Raum-/Redeplätze, freiwilliger Status durch Aufnahme/Verknüpfung in „Mögliche Jury“. Insbesondere bleibt die Vorgabe erhalten, dass eine dort gebildete Gruppe freiwillig für die Jury gemeldet ist.

## Praxistests und Regression

| Prüfserie | Ergebnis |
|---|---|
| Neuer Chromium-Browsertest `tests/test_status_notice.py` | 22/22 bestanden |
| Bestehender Chromium-Interface-Test | 20/20 bestanden |
| Eingabestandard-Test (PC/Mobil) | 18/18 bestanden |
| `node --check app.js` | Bestanden |
| `tests/regression_1000.js` | 1.000/1.000 vollständige Clubabende; 577 OPD, 300 BPS, 123 gemischt |
| `tests/priority_100.js` | 11/11 Räume vollständig, 19 Freiwillige korrekt in Jury, 0 manuelle Plätze verändert |
| `tests/test_extra.py` | Layout und Text-Escaping mit 200 Teilnehmern auf 4 Breiten bestanden |

Unter anderem geprüft: Löschen des Jurors nach vollständiger Verteilung, Teilnehmer hinzufügen, Raum ergänzen und entfernen, Raumreihenfolge, OPD/BPS-Wechsel, Jurygröße, manuelle Platzvergabe, Gruppieren, Entgruppieren, Drag-and-drop, Teilnehmerbearbeitung, Farbschema, erneute Verteilung. Keine JavaScript-Ausnahmen in diesen Browserfällen. Die Oberfläche wurde hierfür in einer Chromium-Testumgebung mit dem unveränderten produktiven Skript ausgeführt; die einzige Änderung im Programm betrifft den beschriebenen Status-Rücksetzmechanismus.

## Grenzen

Die Regressionstests sind stichprobenbasiert und beweisen keine absolute Fehlerfreiheit. Echte iOS-/Android-Endgeräte wurden nicht verwendet. Die begrenzte Suche bei extremen Gruppenkonstellationen bleibt eine bekannte Eigenschaft der Verteilungsalgorithmen und ist nicht Teil dieses Patches.
