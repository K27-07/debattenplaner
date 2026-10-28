# Prüfbericht – Debattenplaner v1.6

**Datum:** 28. Oktober 2026  
**Geprüfte Version:** v1.6, erstellt aus dem vollständigen lokalen v1.5-Quellcode  
**Testumgebung:** Chromium über Playwright, JavaScript-Syntaxprüfung mit Node.js, HTML/CSS/JS lokal in die Browser-Testseite geladen. Keine Änderungen am GitHub-Repository.

## Technische Ursachenanalyse

In v1.5 wurde die Jurybereitschaft in `changeFormat`, `deleteRoom`, `retrieveAll` und `retrieveRoom` aus dem **aktuellen Slot** (`jury` oder `unsortedJury`) abgeleitet. Wer nur automatisch als Juror ausgewählt worden war, wurde beim Zurücksetzen dadurch fälschlich als freiwillig registriert. v1.6 fügt jeder Person ein separates, zunächst falsches Feld `volunteeredJury` hinzu. Nur ausdrücklich manuelle Änderungen der möglichen Jury-Listen verändern die persönliche Präferenz. Automatische Verschiebungen behalten sie unverändert bei. Die beiden Funktionen zur Kandidatenauswahl nutzen nun das gespeicherte Merkmal anstelle der vorherigen Listenposition.

Für zusammengehörige Gruppen bleibt die Einteilung atomar: Eine Gruppe gilt für die Jury-Priorisierung dann als vollständig freiwillig, wenn alle enthaltenen Personen die entsprechende Vormerkung besitzen. Bei gemischter Vormerkung kann die Gruppe nicht auseinandergerissen werden; bei Auflösung in einer unsortierten Liste werden die individuellen Vormerkungen wieder sichtbar.

## Tatsächlich ausgeführte Tests

| Bereich | Ergebnis | Inhalt |
|---|---|---|
| Spezifische Jury-Rücksetzfälle | **12/12 bestanden** | 12 Wiederholungen ohne Freiwillige, 10 Wiederholungen mit freiwilligem unerfahrenem Mitglied, überschüssige Freiwillige, manuelle Jury, Rücknahme einer Meldung, Einsammeln, Formatwechsel, Löschen eines Raums, mehrere Räume und Gruppierungen |
| Bedienung über den Browser | **10/10 bestanden** | Neun Personen per Formular angelegt, freiwillige Anmeldung über Klick, automatische Juryzuweisung, Einsammeln, Abmelden, erneut erfahrene Jury und Teilnehmerintegrität |
| Touch-/Maus-Regressionsprüfungen | **15/15 bestanden** | Mit Finger simuliertes Ziehen, Gruppenbildung, Einzelverschieben, Touchabbruch, Long-Press, Klickzuweisung, Dunkelmodus, Sprache und Maus-Drag-and-drop |
| Belastung: 100 Personen | **4/4 vollständig** | 12 OPD-Räume, 10 BPS-Räume, 12 gemischte Räume mit manuellen Zuweisungen, 8 OPD-Räume mit festen Gruppen; in jedem Fall keine fehlenden/doppelten Personen und keine getrennten Gruppen |
| JavaScript-Syntax | **bestanden** | `node --check app.js` |

### Wichtige Ergebnisse

- **Keine freiwilligen Juroren:** Nach zwölf vollständigen Zyklen aus Einteilen und Einsammeln waren weiterhin **null** Personen unter „Mögliche Jury“ registriert.
- **Ein freiwilliger unerfahrener Juror:** In zehn Zyklen behielt diese Person Vorrang und wurde beim Einsammeln wieder als freiwillig eingestuft.
- **Manuell zugewiesene Juroren ohne Anmeldung:** Die Juryrolle erzeugte keine neue Freiwilligenmeldung.
- **Mehrere Räume:** Nach fünf vollständigen Verteilungen blieben dieselben drei Freiwilligen korrekt vorgemerkt.
- **100-Personen-Test:** Die berechneten Verteilungen benötigten in der Testumgebung ungefähr **0,5–3,5 Sekunden**. Diese Zeiten sind keine Garantie für langsamere Geräte.

## Einschränkungen

- Die Tests beweisen keine absolute Fehlerfreiheit. Extrem komplexe Gruppen können die bereits vorhandenen Rechengrenzen erreichen.
- Maus und Touch wurden in Chromium getestet, bei Touch mit simulierten Fingerbewegungen; kein Test auf realem iOS/Android und kein vollständiger Firefox-/Safari-Test.
- Der direkte Aufruf über `file://` und die öffentliche GitHub-Pages-Auslieferung wurden in diesem Testlauf nicht unabhängig verifiziert. Die Dateien benötigen weiterhin keine externen Ressourcen.
- Bei gemischten Gruppen mit unterschiedlich registrierten Freiwilligen kann eine automatische Verteilung die persönliche Präferenz nicht vollständig erfüllen, ohne die Gruppe zu trennen. Sie bleibt dennoch gespeichert.

## Ergebnis

Der zuvor reproduzierte Fehler beim Einsammeln automatisch ausgewählter Juroren ist in den ausgeführten Testfällen behoben. Die wichtigsten Funktionen der Vorgängerversion haben die Regressionstests bestanden. v1.5 bleibt unverändert als Backup erhalten; v1.6 ist noch nicht auf GitHub veröffentlicht.
