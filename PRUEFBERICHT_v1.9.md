# Prüfbericht – Debattenplaner v1.9

**Datum:** 28. Oktober 2026  
**Grundlage:** vom Nutzer hochgeladene ZIP v1.8; lokale Codeänderungen und Chromium/Playwright-Tests.

## Behobene Befunde

| ID | Befund aus 1.8 | Behebung | Ergebnis |
| --- | --- | --- | --- |
| P1 | Globaler Juryvorrang wurde bei null Gruppen übersprungen | Unbedingte Prüfung des Juryvorrangs; in Konfliktfällen vollständiges Zurücksetzen der automatischen Operation | **Bestanden** |
| P2 | Juryvorrang konnte bei teilweisen Ergebnissen übergangen werden bzw. musste nicht sauber auf besetzte Plätze bezogen werden | Vergleich mit tatsächlich zusätzlich besetzten Juryplätzen, nicht mit leer gebliebenen Plätzen | **Zwei Gegenbeispiele bestanden (unzulässige und zulässige Teilverteilung)** |
| U1 | Horizontales Scrollen nach Neurendern zurückgesetzt | Scrollposition je Raum vor und nach `render()` erhalten | **Bestanden** |
| K1 | GitHub-Button verlinkte ursprüngliches Repository | Link auf `K27-07/debattenplaner` geändert | **Bestanden** |

## Reproduktion der Hauptursache

- **Vorher (v1.8):** zwei OPD-Räume mit je sieben lokal zugeordneten Teilnehmern; drei freiwillige Juroren ausschließlich im Pool von Raum 1; keine Gruppen. Ergebnis: Raum 2 bekam einen Nicht-Freiwilligen in die Jury, während noch zwei Freiwillige in Raum 1 als Redner tätig waren. Fälschliche Erfolgsmeldung.
- **Nachher (v1.9):** dieselben Eingaben führen zu einer klaren Konfliktmeldung und **keiner automatischen Veränderung**. 14 Teilnehmer und alle ursprünglichen Raumzuordnungen bleiben erhalten; alle Juryplätze unverändert leer. Auch der UI-Test über die normalen Eingabeelemente bestätigt das.
- Wird derselbe Teilnehmerpool **global** statt auf lokale Räume verteilt, werden beide Juryplätze korrekt mit Freiwilligen besetzt. Ein grundsätzlich erfüllbarer Fall funktioniert also weiterhin.

## Tatsächlich ausgeführte Regressionstests

| Test | Resultat |
| --- | --- |
| `node --check app.js` | Bestanden |
| 17 Bedienprüfungen im Chromium, u. a. Hinzufügen/Löschen, Gruppen, Sprache, Dunkelmodus, Drag-and-drop, Formate, HTML-Escaping | 17/17 bestanden, keine JavaScript-Ausnahmen |
| 150 deterministisch zufällige, vollständig erfüllbare OPD-Verteilungen (1–3 Räume) | 150/150 vollständig, keine Personenverluste, Dubletten oder Prioritätsverletzungen in diesen Fällen |
| 90 weitere Integritätsszenarien mit jeweils 30 zufälligen Bearbeitungsschritten (2.700 Schritte) | Keine Datenintegritätsanomalien oder JavaScript-Ausnahmen |
| 100 Teilnehmer / 10 BPS-Räume | 10/10 Räume vollständig, 100 eindeutige Teilnehmer, 20/20 Juryplätze freiwillig |
| 100 Teilnehmer / 5 BPS + 5 OPD-Räume | 10/10 vollständig, 100 eindeutig, 30/30 Juryplätze freiwillig |
| 100 Teilnehmer / 10 OPD-Räume | 10/10 vollständig, 100 eindeutig, 30 freiwillige und 10 nicht freiwillige Juroren bei nur 30 Freiwilligen |
| 100 Teilnehmer / 12 OPD-Räume mit 25 Zweiergruppen | 12/12 vollständig, 100 eindeutig, 12/12 Juryplätze freiwillig |
| Vier zusätzliche UI-Szenarien inklusive Fehlerfall und GitHub-Link | 4/4 bestanden, ohne JavaScript-Ausnahmen |
| Teilweise Raumbelegung mit nur neun Teilnehmern: Freiwillige nur im unvollständigen Raum | Abgelehnt; keine automatische Änderung |
| Teilweise Raumbelegung mit einem Freiwilligen im vollständigen Raum und weiteren Freiwilligen im unvollständigen Raum | Korrekte Teilverteilung; keine voreilige Sperre |
| Mobile Chromium-Ansicht 390 px, 150 px horizontale Scrollposition, Person hinzufügen | Scrollposition bleibt bei 150 px |

## Bewusstes Verhalten

**Feste Raumvorzuweisungen werden nicht überschrieben.** Kann man dadurch nicht gleichzeitig die maximale Zahl freiwilliger Juroren und vollständige Besetzungen erreichen, verweigert die Anwendung die automatische Verteilung und verlangt eine Anpassung der Raumpools. Ein global frei verfügbarer Teilnehmer kann weiter automatisch einem Raum zugeteilt werden. Bereits manuell auf Juryplätzen sitzende Personen bleiben unangetastet.

## Grenzen

- Der Code und die Browsertests beziehen sich auf die Dateien dieser ZIP. Die öffentliche GitHub-Pages-Webseite und das Repository wurden nicht verändert; ihre Bereitstellung wurde nicht verifiziert.
- Chromium wurde mit unverändertem lokalem HTML/CSS/JS per `set_content` plus Skript-/Stylesheet-Einbindung geprüft. Ein vollständiger End-to-End-Aufruf per `http://127.0.0.1` wurde durch die Browserumgebung blockiert. Das direkte Ausliefern der vier Dateien über einen lokalen HTTP-Server wurde mit HTTP-Status 200 und korrekten Dateiinhalten geprüft.
- Keine Prüfung auf realem iPhone/Android-Gerät oder Safari/Firefox. Die bestehende gemeinsame Rückwärtssuche ist weiterhin zeitlich und hinsichtlich ihrer Arbeitsschritte begrenzt. Vollständige Fehlerfreiheit kann nicht garantiert werden.
