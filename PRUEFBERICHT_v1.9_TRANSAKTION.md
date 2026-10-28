# Prüfbericht – Debattenplaner v1.9, transaktionaler Verteilungsfix

**Stand:** 28.10.2026  
**Grundlage:** `debattenplaner_v1.9_status_korrigiert.zip`, lokal verändert; GitHub nicht aktualisiert.  
**Anwendungszweck:** Einmalige Organisation einer Clubdebatte mit mehreren OPD-/BPS-Räumen, festen Positionen und Freiwilligenpriorität.

## Fehler und Ursache

**Vorher:** Beim Klicken auf „Auf Teams verteilen“ rief `distribute()` zunächst `releaseAutomaticSeats()` auf. Erst später prüfte `distributeCore()`, ob eine manuell fixierte Regierung, Opposition oder Jury überfüllt ist. Bei anschließender Ablehnung blieben automatisch vergebene Plätze auch in unbeteiligten Räumen leer. Es gingen keine Personen verloren, aber ihre Zuweisungen.

**Jetzt:** Die Vorabprüfung `manualCapacityConflict()` erkennt unzulässige manuelle Kapazitäten, bevor automatische Plätze freigegeben werden. Ein vollständiger `poolSnapshot()` wird vor der Berechnung gesichert. `distribute()` akzeptiert nur konsistente Ergebnisse; die Ergebnisprüfung `allocationStateValid()` kontrolliert Teilnehmeridentität, Gruppenlinks, Listenführung, manuelle Fixierungen und Kapazitäten. Beim Abbruch wird `restorePool()` aufgerufen und ausschließlich eine informative Fehlermeldung übernommen.

## Geprüfte Folgewirkungen

1. **Manuelle OPD-/BPS-Teamüberbelegung, Juryüberbelegung:** Abweisung, vollständige Übereinstimmung aller Zuweisungen vor/nach dem Versuch.
2. **Gesamt- und Einzelraumverteilung:** Ein Fehler in Raum 1 verändert Raum 2 nicht.
3. **Manuelle + automatische vorübergehende Überfüllung:** Nicht irrtümlich abgewiesen; automatisch belegte Plätze dürfen bei gültiger Neuplanung freigemacht werden.
4. **Wiederholte Fehlversuche:** 25-maliger Abbruch ohne schleichende Änderungen.
5. **Gruppierte Teilnehmer:** Ein fehlgeschlagener Versuch verändert Gruppenbindungen und manuelle Positionen nicht.
6. **Manuell vollständig besetzter Raum:** Kann ein Scheitern der Replanung eines anderen Raums nicht als Erfolg kaschieren; die bisherige Teilzuordnung wird wiederhergestellt.
7. **Leere interne Listen:** Auch nur beim Nachsehen entstandene Listen werden nach einem Abbruch zurückgenommen.
8. **Unerwartete Solver-Ausnahme (Testinjektion):** Vollständiger Rollback und verständliche Fehlermeldung.
9. **Fehlermeldungen:** Bei tatsächlichem Teilnehmermangel bleiben Angaben zu den offenen Pflichtplätzen sichtbar; beim Bewahren einer alten Belegung wird keine irreführende neue Erfolgsmeldung ausgegeben.

## Tatsächlich ausgeführte Tests

| Test | Ergebnis |
|---|---|
| JavaScript-Syntax (`node --check`) | Bestanden |
| `tests/test_transaction.js` | 13/13 bestanden |
| `tests/test_transaction_browser.py` | 11/11 bestanden (Chromium) |
| `tests/test_forced_abort.js` | Bestanden – absichtlich erzeugte interne Ausnahme |
| `tests/regression_1000.js` | 1.000/1.000 vollständig besetzte Clubabende; OPD 577, BPS 300, gemischt 123 |
| `tests/test_group_random.js` | 140/140 Gruppenszenarien vollständig; keine Integritätsfehler |
| `tests/priority_100.js` | 11/11 Räume, 19 Freiwillige in Jurys, keine manuell fixierte Person bewegt |
| `tests/test_status_notice.py` | 22/22 bestanden (Chromium) |
| `tests/test_interface.py` | 20/20 bestanden (Chromium) |
| `tests/test_registration_defaults.py` | 18/18 bestanden (Chromium) |

## Grenzen

Die begrenzte Suche kann weiterhin bei extrem schwierigen Gruppenkonstellationen eine existierende Lösung übersehen. Die Tests beweisen keine absolute Fehlerfreiheit. Die mobilen Prüfungen wurden in Chromium, nicht auf physischen Smartphones, durchgeführt. Die Anwendung speichert absichtlich keine Clubabenddaten über einen Neustart hinaus.

**Ergebnis:** Der bestätigte Fehler ist behoben und die geprüften Abbruch- und Folgefehler werden ohne Veränderung der bestehenden Zuweisungen behandelt. Die Versionsnummer bleibt 1.9.
