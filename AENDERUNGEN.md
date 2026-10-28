# Änderungen – Debattenplaner v1.6 (28. Oktober 2026)

## Behebung: Juryfreiwilligkeit bleibt eine eigene Information

**Fehler aus v1.5:** Personen, die der Algorithmus nur wegen eines freien Juryplatzes als Juror eingeteilt hatte, gelangten bei „Alle einsammeln“, „Raum einsammeln“, Raumlöschen oder Debattenformatwechsel fälschlich in „Mögliche Jury“. Beim nächsten Verteilen erhielten sie dadurch einen unverdienten Vorrang.

**Korrektur in v1.6:**

1. Jede Person besitzt während der Sitzung ein separates Kennzeichen für die **ausdrücklich freiwillige** Jurybereitschaft. Die aktuelle Position im Debattenraum ändert dieses Kennzeichen nicht.
2. Nur ein bewusster manueller Wechsel in die Liste „Mögliche Jury“ setzt die Vormerkung; ein bewusster manueller Wechsel nach „Unsortiert“ entfernt sie.
3. „Alle einsammeln“, „Raum einsammeln“, Formatwechsel und Raumlöschen stellen die Zuordnung anhand der ursprünglichen Vormerkung wieder her, nicht anhand des zuletzt besetzten Juryplatzes.
4. Der Verteilungsalgorithmus erkennt freiwillige Gruppen anhand der tatsächlich vorgemerkten Mitglieder. Freiwillige Anfänger behalten Vorrang vor erfahrenen Nicht-Freiwilligen; ohne freiwillige Juroren kommen erfahrene Personen zuerst.
5. Beim Auflösen gemischter Gruppen in einer unsortierten Liste werden die einzelnen Teilnehmer entsprechend ihrer persönlichen Juryvormerkung auf beide Listen verteilt.

## Bewusst unverändert

- Die automatische Verteilung und die Gewichtung der Jurypriorität (freiwillig → erfahren → unerfahren) sowie der Team-Erfahrungsausgleich.
- OPD/BPS, freie Reden, vollständige Besetzung, manuell festgelegte Plätze, Gruppenregeln und Suchgrenzen.
- Drag-and-drop mit Maus und Touch, Originaldesign, Hell-/Dunkelmodus, Sprachwechsel und der Verweis auf HalbFettKaese.
- Keine dauerhafte Datenspeicherung, keine externe Bibliothek, kein Installationsbedarf.

## Prüfungen für v1.6

- 12 gezielte automatisierte Szenarien: alle bestanden. Darunter wiederholtes Einteilen/Einsammeln, erfahrene und unerfahrene Freiwillige, manuell eingesetzte Juroren, ausdrückliches Abmelden, Formatwechsel, Raumlöschen, mehrere Räume und Gruppen.
- 10 praktische UI-Prüfungen (Klickzuweisung, Rücknahme der Vormerkung, erneutes Verteilen): alle bestanden.
- 15 praktische Maus-/Touchprüfungen unter Chromium: alle bestanden.
- 4 aufwendige Verteilungen mit jeweils 100 Personen (OPD, BPS und gemischte Räume mit manuellen Plätzen): vollständig, ohne Teilnehmerverlust oder geteilte Gruppen.
- JavaScript-Syntaxprüfung bestanden. Prüfdetails und Grenzen: `PRUEFBERICHT_v1.6.md`.

---

# Änderungen – Debattenplaner v1.5 (28. Oktober 2026)

## Wichtigste Änderung: Verbindliche Jurypriorität

Bei jeder automatischen Einteilung gelten für noch zu besetzende Juryplätze diese Prioritäten, in dieser Reihenfolge:

1. **Vorgemerkte Personen aus „Mögliche Jury“**, unabhängig von deren Erfahrung.
2. **Erfahrene Teilnehmer**, die sich nicht freiwillig für die Jury gemeldet haben.
3. **Unerfahrene Teilnehmer ohne Juryvormerkung**, nur soweit andernfalls Juryplätze frei bleiben würden.

Der Erfahrungsausgleich bei Regierung, Opposition und BPS-Teams folgt **erst danach**. Er darf nicht bewirken, dass ein Anfänger ohne Juryvormerkung anstelle eines verfügbaren erfahrenen Teilnehmers als Juror eingesetzt wird.

Die Priorität ist in der dynamischen Ein-Raum-Verteilung, beim Vergleich alternativer Verteilungen, in der gemeinsamen Mehrraum-Suche und in einem zusätzlichen **raumübergreifenden Abgleich** berücksichtigt. Der Abgleich tauscht nur gleich große, erlaubte Teilnehmergruppen aus. Dadurch kann er zum Beispiel einen erfahrenen Redner aus Raum A mit einem unfreiwilligen Anfängerjuror aus Raum B tauschen, sofern beide Zuweisungen zulässig bleiben.

## Unverändert

- Bereits manuell besetzte Plätze bleiben fest; eine manuell gesetzte unerfahrene Jurorin oder ein unerfahrener Juror wird nicht automatisch ersetzt.
- Vorhandene Teilnehmergruppen bleiben bei der automatischen Einteilung zusammen. Sind Gruppen oder bereits manuelle Plätze bindend, kann der ideale Jury-Ausgleich unmöglich sein.
- OPD/BPS, Team-Erfahrungsausgleich, Juryplatzanzahl, freie Reden, Maus- und Touch-Drag-and-drop, das Originaldesign, Dunkelmodus, GitHub-Pages- und Offline-Unterstützung.
- Keine Speicherung, kein Server, keine zusätzliche Bibliothek. Der Verweis auf das ursprüngliche GitHub-Projekt bleibt erhalten.

## Prüfung

- **17 von 17 gezielten Jury- und Grenzfalltests** bestanden, einschließlich knapper erfahrener Juroren, Anfänger-Freiwilliger, manuell gesetzter Juryplätze und mehrerer Räume. Gegenüber v1.4 zeigte insbesondere der raumübergreifende Fall ein zuvor falsches Verhalten.
- **35 von 35 zufälligen Fällen** mit OPD und BPS und ein bis drei Räumen bestanden: Pflichtplätze, korrekte Jurypriorität und Teilnehmerintegrität.
- **16 von 16 Browser-Bedienungstests** bestanden: Finger- und Maus-Drag-and-drop, Gruppen, Klickzuweisung, Sprache und Dunkelmodus.
- **4 von 4 100-Personen-Szenarien** bestanden, darunter OPD, BPS, Gruppen und manuelle Belegungen. Keine vermissten oder doppelten Teilnehmer.
- Überfüllte manuelle Regierung wird weiterhin abgefangen. JavaScript-Syntaxprüfung erfolgreich.

**Grenzen:** Der Testbrowser verwendete Chromium und den identischen lokal geladenen Code; ein echter `file://`-Doppelklick und reale Android-/iOS-Geräte wurden nicht getestet. Bei schwierigen Teilnehmergruppen kann die auf Rechenzeit begrenzte Suche weiterhin unvollständige Ergebnisse liefern. Die lexikografische Juryregel ist daher als Prioritätsziel unter machbaren und zulässigen Belegungen zu verstehen, nicht als Übersteuerung manuell gesetzter Plätze oder unteilbarer Gruppen.

---

# Änderungen – Debattenplaner v1.4 (28. Oktober 2026)

## Ziel

Fingerbedienung für Drag-and-drop ergänzen, ohne das ursprüngliche Design, Mausbedienung oder die automatische Verteilungslogik zu verändern.

## Neu und verbessert

1. **Touch-Drag-and-drop:** Nach ungefähr 350 ms gedrückthalten lässt sich ein Teilnehmer mit dem Finger oder unterstützten Stift verschieben; ein gewöhnlicher kurzer Tipp behält seine bisherige Funktion.
2. **Zuweisen und Gruppieren:** Auf eine Team-/Juryspalte ziehen weist genau die gewählte Person zu. Auf einen anderen Teilnehmer ziehen bildet wie am Desktop eine Gruppe.
3. **Sichtbare Rückmeldung:** Der gezogene Name erscheint als schwebender Chip; die Zielspalte bzw. die Zielgruppe wird markiert.
4. **Automatisches Scrollen:** Am Rand einer breiten Teamtabelle scrollt sie seitlich; am oberen oder unteren Bildschirmrand scrollt die Seite vertikal. Dies erleichtert die Arbeit mit mehreren Räumen am Smartphone.
5. **Sicherer Abbruch:** Loslassen außerhalb eines gültigen Ziels, Touch-Abbruch oder Verlassen des Browserfensters verschiebt niemanden. Langes Drücken ohne Bewegung ebenso nicht.
6. **Schnelle Fingertipps:** Ein versehentlicher Klick unmittelbar nach dem Ziehen wird gezielt unterdrückt, ohne das sofortige Antippen anderer Teilnehmer zu blockieren.

## Unverändert

- Design und bestehende Dateistruktur, direkter Offline-Start, GitHub-Pages-Eignung und ursprünglicher GitHub-Verweis.
- OPD-/BPS-Verteilung, Jurypriorität, Erfahrungsausgleich, manuelle Einzelverschiebung, Gruppenverwaltung, Dunkelmodus.
- Keine Datenbank, kein Server, keine zusätzliche Bibliothek und keine Datenspeicherung.

## Prüfung

- 15 gezielte Touch-/Maus-Browsertests in Chromium bestanden.
- Horizontales Scrollen innerhalb der Raumtabelle und vertikales Scrollen zwischen Räumen erfolgreich simuliert.
- Drei bestehende komplexe Tests mit jeweils 100 Teilnehmern bestanden; alle Teilnehmer genau einmal zugeordnet, keine Gruppenteilung.
- JavaScript-Syntaxprüfung erfolgreich.

**Grenzen:** Die Tests erfolgten mit simuliertem Touch in Chromium. Reale Android-/iOS-Geräte, Firefox und Safari sowie der direkte `file://`-Aufruf konnten in dieser Umgebung nicht vollständig geprüft werden. Das automatische Scrollen startet beim Ziehen am Rand; zum normalen Scrollen auf Touchgeräten möglichst außerhalb der Teilnehmerchips wischen.

---

# Änderungen – Debattenplaner v1.3 (27. Oktober 2026)

## Ziel

Stabilitätsupdate für die bestehende Offline-Anwendung. Keine Datenbank, keine Installation, keine Neugestaltung.

## Korrekturen

1. **Doppelklick zur Gruppenauflösung:** Ein gewöhnlicher Klick zeichnet nicht mehr die gesamte Teilnehmerliste neu. Die Auswahlhinweise und Zuweisungsschaltflächen sind nun so platziert, dass sie beim ersten Klick keine Elemente verschieben. Dadurch kann der Browser den Doppelklick zuverlässig erkennen.
2. **Einzelperson beim manuellen Verschieben:** Auch wenn die bewegte Person eine Gruppe anführt, wird beim Verschieben per Drag-and-drop oder „Hier zuweisen“ nur diese Person bewegt. Die anderen Gruppenmitglieder bleiben an ihrem bisherigen Ort. **Die automatische Einteilung behandelt Gruppen weiterhin als Einheit.**
3. **Mehrraum-Suche:** Schwierige Rollen werden bevorzugt geprüft; nachweislich erfolglose Suchzustände werden wiedererkannt. Zusätzlich zu der Anzahl der Suchschritte gilt eine Zeitgrenze für die Rückwärtssuche. Eine abgebrochene Suche wird ausdrücklich als solche gemeldet und nicht mehr mit einer unmöglichen Einteilung verwechselt.
4. **Prüfung vor Übernahme:** Die automatisch berechnete Verteilung wird auf vollständige Sitzplatzzahlen, passende Gruppen, erlaubte Quellen und doppelte Verwendungen geprüft, bevor auch nur ein Teilnehmer verschoben wird. Ist der Plan inkonsistent, wird er verworfen und die bisherige Einteilung bleibt bestehen.

## Tests

- 12 von 12 praktischen Chromium-Bedienungstests bestanden: Eingaben, Auswahl, Doppelklick, 16 Gruppen-Auflösen-Zyklen, Drag-and-drop, Klick-Zuweisung, Dunkelmodus, Sprache, OPD, Warnung bei Überfüllung, mobile Ansicht und mehrere Räume/Formatwechsel.
- 7 zusätzliche Browser-Smoke-Tests bestanden.
- 12 bestehende v1.2-Regressionstests bestanden, darunter 100 wiederholte schwierige Zweiraumkonstellationen (insgesamt 321 erfolgreich geprüfte Integritätsbedingungen).
- 47 zufällig erzeugte, ausreichend große Gruppen-Konstellationen mit unabhängiger Lösbarkeitsprüfung verglichen; keine Abweichung. Zwei zusätzliche Einzelverschiebe-Prüfungen erfolgreich.
- JavaScript-Syntaxprüfung erfolgreich.

**Grenzen:** Diese Tests beweisen keine 100-prozentige Fehlerfreiheit. Besonders komplexe Gruppenaufteilungen können die begrenzte Suche weiterhin überfordern. Ein echter `file://`-Start ist in der Testumgebung administrativ gesperrt; die Seite wurde jedoch mit demselben lokalen HTML-/CSS-/JS-Code in Chromium getestet. Firefox, Safari und reale Touchgeräte wurden nicht durchgängig geprüft.

## Unverändert

- OPD/BPS, Vorrang vorgemerkter Jurorinnen und Juroren, Erfahrungsausgleich und freie Reden.
- Ursprünglicher GitHub-Link auf HalbFettKaese.
- Oberfläche im ursprünglichen Stil, Offline-Betrieb ohne Zusatzprogramme und **keine Datenspeicherung**.

---

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
