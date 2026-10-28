# Version 1.9 – korrigierte Behandlung komplexer Gruppen und Rückgabewerte (28.10.2026)

- **Fehlerbegründung präzisiert:** Bei nicht erfolgreich besetzbaren Team- und Juryplätzen mit bestehenden Gruppen wird nicht länger pauschal ein Juryprioritätskonflikt als alleinige Ursache ausgegeben. Die neue Meldung verweist auf die Kombination aus Gruppengrößen und festen Plätzen, ohne mathematische Unlösbarkeit zu behaupten. Wenn die Teilnehmerzahl insgesamt nicht ausreicht, wird dieser Engpass vorrangig gemeldet. Deutsch und Englisch sind berücksichtigt.
- **Fehlerhafte interne Erfolgsmeldung korrigiert:** Jeder verworfene Verteilungsversuch liefert `accepted: false`; `accepted: true` wird nur für eine tatsächlich übernommene Verteilung ausgegeben. Die endgültige Juryprüfung läuft stets gegen die wirklich zur Übernahme vorgesehene Planung, nicht gegen ein zwischenzeitliches Testergebnis oder einen zurückgesetzten Zustand.
- **Keine Folgeschäden bei Ablehnung:** Automatische Plätze, manuelle Festlegungen, Gruppen, Statuskennzeichen und sogar die vorhandenen internen Belegungslisten bleiben beim verworfenen Versuch exakt erhalten. Auch wiederholte Ablehnungen erzeugen keine leeren Listen.
- **Verteilungsregeln unverändert:** Freiwillige Juroren haben weiterhin Vorrang, manuelle Plätze bleiben geschützt. Die bestehenden OPD/BPS-Suchalgorithmen wurden nicht erweitert oder neu gestaltet; Version bleibt **1.9**. Keine Änderungen an GitHub.
- **Neue Tests:** 6/6 Logik- und Regressionstests sowie 7/7 Chromium-Browserchecks bestanden. **Bestehende Tests:** 1.000/1.000 Clubabend-Simulationen, 140/140 Gruppenszenarien, 13/13 Transaktionstests, 7/7 bestehende Meldungstests, erzwungener Rücknahmefehler und der 100-Personen-Fall mit 11 Räumen und 19 freiwilligen Juroren bestanden. Bestehende Browserprüfungen wurden erneut erfolgreich ausgeführt.

Siehe `PRUEFBERICHT_v1.9_GRUPPEN_FEHLERBEHANDLUNG.md`.

---

# Version 1.9 – Fehlermeldungen nach zurückgenommener Verteilung (28.10.2026)

- **Behoben:** Nach einer fehlgeschlagenen Neuverteilung nannte die Meldung teils sämtliche Pflichtplätze als offen, obwohl die vorher automatisch besetzten Teams beim Rücksetzen erhalten blieben.
- Die Meldung über **wirklich noch offene Team- und Juryplätze** wird nun **erst nach der Rücknahme** des Berechnungsversuchs anhand der sichtbar erhaltenen Belegungen erzeugt. Ein bereits vollständiges Team wird nicht mehr als leer gemeldet.
- Sind tatsächlich Personen zu wenig verfügbar, wird der noch erforderliche Mindestbedarf angegeben. Ansonsten wird auf Raum-/Gruppen-/Platzvorgaben hingewiesen. Einzelraum-Aktionen beschreiben nur den betreffenden Raum. Deutsch und Englisch sind berücksichtigt.
- **Folgefehler vermieden:** Die Diagnose liest vorhandene Listen ohne beim Anzeigen neue leere Listen anzulegen; abgelehnte Verteilungen behalten somit auch intern exakt denselben Zuweisungs-/Gruppenzustand. Überbelegungswarnungen und besondere Jury-/Plausibilitätsmeldungen bleiben erhalten.
- Keine Änderung an Jurypriorität, Teambesetzung, Zufallsverteilung, Gruppenbehandlung, manuellen Zuweisungen, Mobile-Interface oder Versionsnummer **1.9**. GitHub wurde nicht verändert.
- **Nachtests:** 7 neue isolierte Fehlermeldungsfälle, 8 neue reale Chromium-Browserprüfungen, 13/13 Transaktionstests, ein erzwungener Berechnungsfehler, 71/71 bestehende Chromium-Tests, 1.000/1.000 simulierte Clubabende und der bekannte schwierige 100-Personen-Fall bestanden.

Siehe `PRUEFBERICHT_v1.9_FEHLERANZEIGE.md`.

---

# Version 1.9 – fehlgeschlagene Neuverteilung ohne Datenänderung (28.10.2026)

- **Bestätigten Fehler behoben:** Wenn ein manuell überfülltes Team eine Neuverteilung verhinderte, waren zuvor automatisch vergebene Plätze in anderen Räumen bereits freigegeben.
- Vorabprüfung zählt ausschließlich **manuell fixierte** Teilnehmer beziehungsweise Gruppen gegen die Kapazität. Alte automatisch vergebene Plätze dürfen bei erfolgreicher Neuverteilung weiterhin ersetzt werden.
- **Transaktionale Sicherung:** Vor der Berechnung wird der vollständige Platz-/Gruppierungszustand gesichert. Bei abgelehnter Verteilung, Fehler der Plausibilitätsprüfung, verlorenem bereits vollständigem Raum oder unerwarteter Ausnahme wird der Zustand vollständig zurückgesetzt. Nur die zutreffende Fehlermeldung wird angezeigt.
- **Folgefehler abgefangen:** Auch neu angelegte leere interne Listen werden beim Abbruch zurückgenommen; ein manuell vollständiger Raum zählt nicht als Fortschritt, wenn in einem anderen Raum nur bisherige automatische Plätze freigeräumt wurden; klare Meldung bei unverändertem Plan.
- **Weiterhin zulässig:** Eine echte Teilverteilung, die zusätzliche Räume erstmals vollständig besetzt, sowie erneutes Zufallsverteilen bereits vollständig besetzter Räume. Manuelle Vorgaben und die Jurypriorität bleiben verbindlich.
- Geprüft: 13 gezielte Logiktests; 11 Chromium-Tests; 1000/1000 simulierte Clubabende; 140/140 Gruppenfälle; 22 Status-, 20 Interface-, 18 Eingabetests sowie der komplexe 100-Personen-Fall. Ein künstlich ausgelöster interner Fehler wurde ebenfalls zurückgerollt.
- Keine Änderung der Versionsnummer **1.9**, keine Änderung auf GitHub, keine neue externe Bibliothek und keine dauerhafte Speicherung.

---

# Version 1.9 – Statusmeldungen nach manuellen Änderungen (28.10.2026)

- **Behoben:** Nach einer erfolgreich automatisch verteilten Debatte blieb die alte Erfolgsmeldung sichtbar, obwohl zwischenzeitlich beispielsweise ein Juror gelöscht wurde.
- Nach manuellem Hinzufügen/Löschen, Platzieren, Gruppieren/Entgruppieren, Drag-and-drop, Raumänderungen und Einsammeln wird ein überholter Verteilungshinweis ausgeblendet. Eine anschließende automatische Verteilung zeigt wieder eine aktuelle Meldung.
- Reine Auswahl eines Namens oder Wechsel des Farbschemas entfernt eine ansonsten gültige Meldung nicht. Nach dem Bearbeiten eines Teilnehmers erscheint weiterhin die spezifische Bearbeitungsbestätigung.
- **Unverändert:** gesamte Jury- und Teamverteilung, Freiwilligenpriorität, Gruppierung in „Mögliche Jury“ (bewusste freiwillige Meldung), manuelle Festlegungen, Touch-Bedienung und alle Eingabestandards. Versionsnummer bleibt **1.9**.
- Tests: 22/22 gezielte Browserprüfungen; 20/20 Interfaceprüfungen; 18/18 Eingabestandardprüfungen; 1000/1000 simulierte Clubabende; komplexer 100-Personen-Juryfall erfolgreich.

Siehe `PRUEFBERICHT_v1.9_STATUSFIX.md`.

---

# Version 1.9 – Standardwerte bei jeder neuen Anmeldung (28.10.2026)

- Nach jedem **erfolgreichen** Hinzufügen eines Teilnehmers wird die Erfassungsmaske wieder auf **erfahren** und **nicht freiwillig jurierend** gesetzt. Ein zuvor ausgewählter Status wird nicht unbemerkt auf die nächste Person übertragen.
- Der gerade hinzugefügte Teilnehmer behält die bewusst gewählten Merkmale; bestehende Teilnehmer bleiben unberührt.
- Der Eingabefokus bleibt im Namensfeld, sodass mehrere Personen weiterhin schnell nacheinander eingetragen werden können.
- Keine Änderung an der Verteilungslogik; Versionsnummer bleibt **1.9**.

---

# Version 1.9 – Interface-Verbesserungen (28.10.2026)

- Bestehende Teilnehmende über Stiftsymbol bearbeiten: Name, Erfahrung und Jurybereitschaft. Namensänderungen erhalten Gruppen-/Platzverknüpfungen, doppelte Namen werden abgelehnt.
- Erfassung (früherer v1.9-Stand): Fokus nach Enter bleibt erhalten, Erfahrung/Jury-Schalter blieben beim nächsten Namen gesetzt. **Mit der aktuellen v1.9-Nachkorrektur werden sie stattdessen zurückgesetzt.** Freiwillige Juroren kommen direkt in die Kandidatenliste.
- Räume erhalten kompakte Übersichten mit Format, Personenanzahl und Pflichtplatzstand.
- Meldungen zu unvollständigen Verteilungen nennen die offenen Pflichtplätze und enthalten konkrete Prüfhinweise.
- Die zuletzt korrigierte Zuteilungslogik bleibt unverändert. Versionsnummer weiterhin 1.9.
- Prüfungen: 20/20 Chromium-Interaktionen, 4/4 Layoutbreiten à 200 Personen, 1.000/1.000 Clubabende, kritischer 100-Personen-Fall bestanden.

# v1.9 – Jurypriorität bei komplexen Mehrraum-Verteilungen (28.10.2026)

Diese Korrektur bleibt **Version 1.9**.

- Die globale Jurypriorität wird bei einem nicht regelkonformen, aber ansonsten vollständigen Raumplan schon **vor** der Teamzuweisung als zusätzliche Planungsstrategie berücksichtigt. Im neuen Rückfallweg werden zunächst verfügbare freiwillige Jurygruppen und danach (sofern erforderlich) erfahrene Nicht-Freiwillige auf noch offene Juryplätze verteilt. Erst danach werden die verbleibenden Teamplätze mit dem bisherigen Algorithmus ausgefüllt.
- Anders als beim früheren reinen Tausch gleich großer Gruppen können zwei einzelne Freiwillige somit auch statt einer nicht freiwilligen Zweiergruppe in die Jury gelangen.
- Manuell belegte Plätze und Raumbindungen bleiben geschützt. Das Ergebnis wird ausschließlich übernommen, wenn die Juryregeln eingehalten werden und gegenüber der ursprünglichen Lösung keine bereits vollständig besetzten Räume verloren gehen.
- Mehrere begrenzte randomisierte Neuplanungen verhindern, dass genau eine ungünstige Kandidatenreihenfolge eine gültige Zuordnung verhindert. Die bisherigen Suchgrenzen und die vorhandene explizite Konfliktmeldung bleiben bestehen, wenn keine Lösung gefunden wird.
- Oberfläche, mobile Bedienung und übrige Regeln wurden nicht verändert.

**Nachtests:** Vorher reproduzierbarer deterministischer Fall mit 100 Personen (Seed 67, 6 OPD + 5 BPS, 22 Juryplätze) jetzt 11/11 Räume vollständig, 19 Freiwillige automatisch in der Jury; keine manuelle Vorgabe verändert und keine Personen verloren. 40/40 komplexe 100-Personen-Varianten, 140/140 zufällige Gruppenkonstellationen und 1000/1000 simulierte Clubabende mit OPD, BPS, festen Positionen und freiwilligen Juroren bestanden. Der Problemfall wurde auch per Klick in Chromium erfolgreich durchgespielt. Bericht: `PRUEFBERICHT_v1.9_JURYFIX.md`.

**Grenze:** Dies ist ein gezielter zuverlässigerer Rückfallweg, keine mathematisch vollständige Suche über alle möglichen Gruppenkonstellationen. Bei widersprüchlichen festen Positionen oder bei Erreichen des Rechenbudgets kann weiterhin eine automatische Verteilung abgelehnt werden.

---

# Nachkorrektur v1.9 – Mobile Darstellung und Touch-Bedienung (28. Oktober 2026)

Diese Nachkorrektur bleibt **Version 1.9**. Die fachliche Zuteilungslogik wurde nicht verändert.

1. **Teilnehmerliste:** Die globale Liste von „Unsortiert“ und „Mögliche Jury“ ist nun auf die verfügbare Breite begrenzt. Namen umbrechen innerhalb des Boards. Auf Smartphone-Breite stehen die Bereiche untereinander; reguläre Debattenbretter bleiben weiterhin horizontal scrollbar.
2. **Wischen und Ziehen:** Eine normale Wischbewegung über Teilnehmer-Chips scrollt nun die Seite bzw. ein Debattenbrett. Eine Berührung von mindestens 350 ms ohne vorherige Bewegung aktiviert weiterhin Drag-and-drop. Nur während des tatsächlichen Ziehens wird das Standardscrollen unterdrückt. Maus-Drag-and-drop bleibt unverändert.

**Nachtests:** 16 Kombinationen aus Bildschirmbreite (320, 390, 768, 1280 px) und Teilnehmerzahl (5, 20, 70, 200) ohne horizontales Überlaufen des globalen Boards; Touch-Wischen vertikal auf einem Namen, horizontal im Debattenraum, Tap-Auswahl und Long-press-DnD bestanden. Sechs Kernfälle der Verteilungslogik und 1.000 simulierte Clubabende bestanden. Kein Test auf realen iOS-/Android-Geräten; Safari und Firefox nicht geprüft. Details: `PRUEFBERICHT_v1.9_MOBILKORREKTUR.md`.

---

# Debattenplaner – Änderungsprotokoll

## Version 1.9 – zusätzliche Gruppenkorrektur (28.10.2026)

Die Versionsnummer **1.9** bleibt erhalten; dies ist eine überarbeitete Ausgabe derselben Version.

- **Behoben:** Eine per Hand zusammengestellte Gruppe konnte beim Löschen ihrer Leitung ein bisher automatisch zugewiesenes Mitglied zurücklassen (`autoSeat: true`). Ein erneutes automatisches Verteilen verschob dieses Mitglied unbeabsichtigt aus dem bisherigen Team oder sogar in die Jury.
- **Behebung in `addChild()`:** Die manuelle Platzbindung (`autoSeat: false`, `autoRoom: false`, `reservedRoom`) wird nun auf *sämtliche* Mitglieder der neu gebildeten Gruppe angewendet, auch wenn eine ganze bestehende Gruppe hinzugefügt wird.
- **Behebung in `deleteMember()`:** Beim Löschen einer Gruppenleitung übernehmen alle freigesetzten Mitglieder explizit die manuelle Platz-/Raumbindung ihres bisherigen Gruppenplatzes.
- **Zusätzliche Absicherung in `moveMember()`:** Wird eine gesamte Gruppe manuell verschoben, insbesondere durch Einsammeln oder Formatwechsel, werden die Reservierungen ihrer Kinder konsistent aktualisiert.
- **Unverändert:** Strenge Jurypriorität, freiwillige Juryregistrierung, erneute automatische Verteilung, Raumaufteilung, Scroll-/Fokuskorrekturen sowie die Versionsnummer.

**Eigene Nachtests:** Zehn gezielte Browser-Testbereiche bestanden; 220 zufällige Bearbeitungsschritte ohne Integritätsfehler; 60 gemischte OPD-/BPS-Raumverteilungen mit korrekter Pflichtplatzbesetzung und Jurypriorität. Details siehe `PRUEFBERICHT_v1.9_GRUPPENKORREKTUR.md`.

---

# Nachkorrektur v1.9 (Version bleibt 1.9) – 28. Oktober 2026

- **Jury bei erneuter Verteilung:** Der Planer unterscheidet automatisch gesetzte Team-, Jury- und freie Rednerplätze von ausdrücklichen manuellen Zuweisungen. Bei einer neuen Automatikplanung werden nur automatische Plätze vor der Neuberechnung freigegeben, und zwar unter Beibehaltung manuell reservierter Räume. Fehlgeschlagene Prioritätsprüfungen rollen die Änderung auf den Zustand vor der Aktion zurück.
- **Turnierweite Jurypriorität auch bei Einzelräumen:** Nach jedem Teamplan werden automatisch belegte Juroren gegen bislang nicht als Juroren eingesetzte, höher priorisierte Personen in **allen** Räumen geprüft. Bei einem Widerspruch wird die Aktion zurückgewiesen, ohne andere Räume heimlich zu ändern. Die Priorität lautet: freiwillig, dann erfahren, dann unerfahren; fest manuell belegte Plätze bleiben ausgenommen.
- **Unabhängige Zufalls-Raumaufteilung:** „Auf Räume verteilen“ weist jetzt sämtliche global unsortierten Personen auch bei Unterbelegung einem Raum zu, ohne bereits Team- oder Juryplätze zu besetzen. Bestehende manuelle Raumzuordnungen werden nicht verändert. Bei wiederholtem Aufruf dürfen vorherige automatisch erzeugte reine Raumzuweisungen neu gemischt werden. Gruppen bleiben zusammen.
- **Namensformular:** Nach erfolgreicher Eingabe über Enter oder Klick bleibt der Namenseingabefokus erhalten.
- Die bestehende Darstellung, die Scroll-Korrektur und der GitHub-Link der v1.9 bleiben unverändert.

**Eigene Nachtests:** `PRUEFBERICHT_v1.9_NACHKORREKTUR.md`. Die GitHub-Pages-Version wurde nicht automatisch geändert.

---

# Änderungen – Debattenplaner v1.9 (28. Oktober 2026)

## Behebung: Freiwillige Jury hat verbindlichen Vorrang – auch ohne Gruppen

- Die globale Jurypriorität wird jetzt **bei jeder automatischen Verteilung geprüft**. Zuvor wurde die Kontrolllogik übersprungen, wenn keine Teilnehmergruppen vorhanden waren.
- Selbst bei teilweise gefüllten Veranstaltungen darf kein automatisch eingesetzter nicht freiwilliger Juror Vorrang vor einem verfügbaren freiwilligen Juror erhalten. Für die Beurteilung zählen nur **tatsächlich neu besetzte Juryplätze**: unbesetzte Räume alleine lösen keinen Fehlalarm aus.
- Individuell vorab einem Raum zugeordnete Personen behalten ihre Raumzuweisung. Wenn die Kombination der festen Raumzuordnungen und globalen Jurypriorität nicht erfüllbar ist, wird die **gesamte automatische Aktion rückgängig gemacht**, mit verständlicher Meldung. Bestehende Positionen und Teilnehmer bleiben unverändert.
- Vorhandene manuelle Jurybesetzungen sind ausgenommen; sie werden nicht eigenmächtig umgestellt.

## Behebung: Scrollposition auf schmalen Bildschirmen

- Vor dem Neurendern werden horizontale und vertikale Scrollpositionen der einzelnen Debattenfelder anhand ihrer Raum-IDs gespeichert und danach wiederhergestellt. Das verhindert das Springen zum linken Rand auf Smartphones.

## Kleinere Anpassung

- Das GitHub-Symbol führt nun zum tatsächlich verwendeten Repository `K27-07/debattenplaner`. Die ursprüngliche Vorlage bleibt im README genannt.

## Tests

Siehe `PRUEFBERICHT_v1.9.md`. Die ZIP wurde lokal geprüft; kein automatischer Upload nach GitHub und kein direkter Zugriff auf das öffentliche Deployment erfolgten.

---

# Änderungen – Debattenplaner v1.8 (28. Oktober 2026)

## Verbindliche Jurypriorität auch bei gemischten Gruppen

1. **Freiwillige Juroren haben vor allen Nicht-Freiwilligen Vorrang**, unabhängig von ihrer Erfahrung.
2. Fehlen Freiwillige, werden erfahrene Nicht-Freiwillige berücksichtigt; erst danach unerfahrene.
3. Der Planer versucht zuerst, Teilnehmergruppen zusammenzulassen. Nur wenn damit eine verfügbare Person höherer Jurypriorität übergangen würde, prüft er alternative Planungen mit gezielter Gruppentrennung.
4. Eine Trennung wird nur bei einer tatsächlichen Verbesserung der Jurybesetzung und ohne Verlust vollständig eingeteilter Räume übernommen. Bereits manuell besetzte Plätze werden respektiert.
5. Wenn feste Raumzuweisungen eine Einteilung nach dieser Priorität verhindern, wird kein scheinbar korrektes Gesamtergebnis übernommen. Es erscheint eine Erklärung, dass Gruppen oder Vorbelegungen angepasst werden müssen.

## Mehrraumverteilung

- „Auf Teams verteilen“ verteilt global unsortierte Personen weiterhin automatisch über mehrere Räume und berücksichtigt dabei freiwillige Juroren, Erfahrungsbalance und manuelle Raumzuordnungen.
- „Auf Räume verteilen“ bleibt als optionaler erster Schritt für die zweistufige Planung erhalten.
- **„Im Raum verteilen“ funktioniert jetzt auch bei mehreren Räumen direkt mit global unsortierten Personen.** Die übrigen Personen bleiben für weitere Räume in der globalen Liste; sie werden bei einer lokalen Einteilung nicht ungefragt als freie Redner in den ausgewählten Raum verschoben.

## Barrierefreiheit

- Gruppen lassen sich neben dem bisherigen Maus-Doppelklick nun per **Umschalt+Eingabe** bei fokussiertem Teilnehmerchip auflösen; die Tastaturhilfe wird im Tooltip genannt.

## Unverändert

- Teamvollständigkeit, Erfahrungsausgleich zwischen Regierung und Opposition/BPS-Teams sowie zwischen Räumen, freie Reden, bereits manuell gesetzte Plätze.
- Die vollständige v1.7-Touch-/Maussteuerung, das Originaldesign, die Farben und der Dunkelmodus.
- Offline-Nutzung ohne Installation, ohne Datenbank, ohne externe Bibliotheken oder dauerhafte Speicherung; bisheriger Verweis auf das ursprüngliche GitHub-Projekt.

## Prüfungen

Siehe `PRUEFBERICHT_v1.8.md`: 50 Zufallsszenarien, zehn Wiederholungen des früheren Juryfehlers, ein 100-Personen-Mischgruppen-Stresstest, vier weitere 100-Personen-Konstellationen, direkte/ein- und zweistufige Raumverteilung, Tastaturtest, 15 Touch-/Mausprüfungen sowie Konfliktabbruch. Einschränkungen werden im Bericht erklärt.

---

# Änderungen – Debattenplaner v1.7 (28. Oktober 2026)

## Behobener Fehler: Jurybereitschaft nach Löschen eines Gruppenleiters

Wenn in einer gemischten Gruppe die Gruppenleitung gelöscht wird, werden die verbliebenen Personen wieder einzeln geführt. Bis einschließlich v1.6 konnte dabei eine freiwillig für die Jury gemeldete Person fälschlich unter „Unsortiert“ sichtbar bleiben, obwohl ihre persönliche Vormerkung intern erhalten war.

**Korrektur:** `deleteMember()` berücksichtigt beim Freigeben der Gruppenmitglieder jetzt deren individuelles Merkmal `volunteeredJury`. Freiwillige Personen werden innerhalb ihres bisherigen Bereichs in „Mögliche Jury“ und andere in „Unsortiert“ eingeordnet. Befand sich die Gruppe auf einem Team- oder Juryplatz, bleiben die freigegebenen Mitglieder dort.

## Unverändert

- Jurypriorität (Freiwillige → erfahrene Nicht-Freiwillige → unerfahrene Nicht-Freiwillige), Erfahrungsausgleich und Mehrraumverteilung.
- OPD/BPS, manuelle Einzelzuweisung, Gruppenbedienung, Touch-/Maus-Drag-and-drop, Dark Mode und Sprachauswahl.
- Originaldesign, Offline-Nutzung ohne Installation, keine dauerhafte Speicherung und Verweis auf das Originalrepository.

## Prüfung

- 9/9 gezielte Logiktests einschließlich 250 zufälliger Gruppenänderungen mit Integritätskontrolle bestanden.
- 9/9 praktische Chromium-UI-Tests bestanden, darunter Löschen einer gemischten Gruppe und anschließende bevorzugte Juryzuweisung.
- 12/12 bestehende v1.6-Jury- und Rücksetzregressionstests bestanden.
- 15/15 bestehende Maus-/Touchprüfungen bestanden (Touch in Chromium simuliert).
- Vier komplexe 100-Personen-Szenarien wurden vollständig eingeteilt; der zusätzliche Überfüllungstest wurde korrekt abgelehnt.
- `node --check app.js` erfolgreich. Einschränkungen und Testmethodik: `PRUEFBERICHT_v1.7.md`.

---

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
