# Prüfbericht – Debattenplaner v1.8

**Datum:** 28. Oktober 2026  
**Prüfobjekt:** lokale Offline-Version `debattenplaner_v1.8`, auf Basis von v1.7.  
**Prüfmethode:** Analyse der tatsächlichen `app.js`; Playwright Chromium mit lokal injiziertem HTML/CSS/JS; unabhängige Kontrollen der Teilnehmeranzahl, Platzbelegung, Jurypriorität und Gruppenintegrität.

## Funktionsänderungen

- Bei der Jury gilt: freiwillig vor erfahrenen Nicht-Freiwilligen vor unerfahrenen Nicht-Freiwilligen. Die Planung versucht zuerst intakte Gruppen, danach bei Bedarf Alternativen mit Gruppentrennung. Vorhandene feste manuelle Plätze bleiben bestehen.
- Bei unvermeidlichem Vorrangkonflikt durch lokale Vorbelegungen wird die automatische Verteilung vollständig zurückgenommen und eine erklärende Meldung ausgegeben; keine irreführende Erfolgsmeldung.
- Die raumbezogene Verteilung kann global unsortierte Personen auch bei mehreren Räumen heranziehen und lässt übrige globale Teilnehmer für andere Räume verfügbar.
- Die bisherige zweistufige Verteilung bleibt möglich. Tastaturkürzel Umschalt+Eingabe löst Gruppen auf.

## Ausgeführte Tests

| Test | Ergebnis |
|---|---|
| 50 deterministische, zufällig erzeugte Konstellationen mit 19–22 Teilnehmern, zwei Räumen, wechselnder Jurygröße, Erfahrung und drei Zweiergruppen | **50/50 erfolgreich**, Jurypriorität einschließlich erfahrener Nicht-Freiwilliger, vollständige Räume, eindeutige Personen |
| Wiederholung des gemischten Freiwilligen-Gruppenfehlers aus v1.7 | **10/10 erfolgreich**, freiwillige Person tatsächlich in der Jury, beide Teams und Jury vollständig |
| Freiwillige Zweiergruppe, aber nur ein Juryplatz | **Erfolgreich**, ein freiwilliges Gruppenmitglied für Jury gewählt |
| Gemischte Gruppe, aber genug andere Freiwillige | **Erfolgreich**, Gruppe bleibt intakt |
| Erfahrene Person in gemischter Gruppe ohne Freiwillige | **Erfolgreich**, Erfahrungsvorrang bei Jury berücksichtigt |
| 100 Teilnehmer / 25 gemischte Zweiergruppen / 12 OPD-Räume | **12/12 vollständig**, 100/100 eindeutig, 12 freiwillige Juroren, 13 der 25 Gruppen blieben intakt |
| 100 Teilnehmer / 12 OPD-Räume | **12/12 vollständig**, ca. 1,24 s |
| 100 Teilnehmer / 10 BPS-Räume | **10/10 vollständig**, ca. 3,50 s |
| 100 Teilnehmer / 12 gemischte Räume mit manuellen Vorgaben | **12/12 vollständig**, ca. 1,69 s |
| 100 Teilnehmer / 8 OPD-Räume mit Gruppen | **8/8 vollständig**, ca. 0,72 s |
| „Im Raum verteilen“ bei 16 global Unsortierten und 2 Räumen | **Erfolgreich**, erster Raum 7 Pflichtplätze, 9 Personen bleiben global; danach beide Räume vollständig |
| „Auf Räume verteilen“ und danach „Auf Teams verteilen“ | **Erfolgreich**, korrekte lokale Restpools und zwei vollständig besetzte Räume |
| Tastatur: Umschalt+Eingabe bei gruppiertem Teilnehmer | **Erfolgreich**, Gruppe aufgelöst, beide Personen erhalten |
| 15 praktische Touch-/Maus-/Darstellungstests in Chromium | **15/15 erfolgreich**, keine JS-Ausnahmen |
| Absichtlich blockierte Jurypriorität durch feste Raumvorbelegung | **Erfolgreich abgefangen**, verständliche Meldung, bestehende Personen/Positionen unverändert |
| `node --check app.js` | **Erfolgreich** |

Die Zeitangaben sind Messungen einzelner Durchläufe auf dem Testsystem, keine garantierten Laufzeiten auf anderen Geräten. In anspruchsvollen Fällen kann die begrenzte Mehrraum-Suche eine mögliche Lösung weiterhin übersehen.

## Ergebnis und Grenzen

Alle oben genannten abgeschlossenen Prüfungen bestanden. Die Prioritätsauswahl ist auch bei gemischten Gruppen im getesteten Umfang korrekt. Die Gruppentrennung wird aber nur bei einer tatsächlichen Verbesserung übernommen; bei besonderen manuell fixierten oder nicht vollständig lösbaren Konstellationen kann ein expliziter Abbruch erforderlich sein. Die heuristische Suche ersetzt keinen mathematischen Vollständigkeitsbeweis.

**Nicht vollständig geprüft:** ein End-to-End-Test der veröffentlichten GitHub-Pages-URL, direktes Öffnen via `file://` (in der Testumgebung `ERR_BLOCKED_BY_ADMINISTRATOR`), echtes iPhone/Android-Gerät und Safari/Firefox. Die Prüfung mit Playwright nutzte dieselben lokalen HTML-, CSS- und JavaScript-Dateien ohne Änderungen an der ausgelieferten Anwendung. GitHub wurde nicht verändert.
