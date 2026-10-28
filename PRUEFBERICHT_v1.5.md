# Prüfbericht – Debattenplaner v1.5

**Datum:** 28. Oktober 2026  
**Geprüfte Grundlage:** vollständige Offline-Version v1.4, ausschließlich die Prioritätssteuerung für die Jury in `app.js` geändert.  
**Testumgebung:** Chromium (headless), lokale HTML-/CSS-/JS-Quellen direkt in die Testseite geladen, automatisierte Interaktion mit Playwright; JavaScript-Syntaxprüfung mit Node.js. Keine Änderungen am GitHub-Repository.

## Codeanalyse

- Der 0/1-DP-Algorithmus für einzelne Räume betrachtet jetzt zwei getrennte, lexikografische Jurykriterien: **(1) Jury-Freiwillige**, **(2) erfahrene Nicht-Freiwillige**. Erst danach werden Anfänger ohne Juryvormerkung und der Erfahrungsausgleich der Rednerteams bewertet.
- Dieselbe Reihenfolge ist im Mehrraum-Fallback und bei der Auswahl zwischen alternativen vollständigen Einteilungen berücksichtigt.
- Zusätzlicher raumübergreifender Abgleich kann erlaubte, gleich große Gruppen tauschen oder einen noch verfügbaren Kandidaten einsetzen. Er wird vor der bestehenden transaktionalen Integritätsprüfung ausgeführt, und manuell gesetzte Plätze bleiben unverändert.
- Gruppen werden nicht geteilt. Wenn Gruppenbindungen nicht zulassen, dass erfahrene Kandidaten einen bestimmten Juryplatz belegen, bleibt eine ansonsten gültige Besetzung möglich.

## Ausgeführte Tests

| Testblock | Ergebnis | Einzelheiten |
|---|---|---|
| 17 gezielte Jury-Fälle | 17/17 bestanden | Freiwillige mit/ohne Erfahrung, fehlende Freiwillige, Jura mit 1–4 Plätzen, knappe Erfahrung bei 1–3 Räumen, OPD/BPS, feste manuelle Juryplätze, Gruppen |
| 35 Zufallskonstellationen | 35/35 bestanden | 1–3 Räume, zufällige Team- und Jurygrößen, unterschiedlich viele Anfänger/Erfahrene und Freiwillige; alle Pflichtplätze, Jurypriorität und Teilnehmerintegrität überprüft |
| Touch-/Maus-Interaktion | 16/16 bestanden | Touchziehen, Gruppieren, Einzelverschieben, Klickzuweisung, Abbruch, Dunkelmodus, Sprachwechsel und Mausziehen; keine JavaScript-Laufzeitfehler |
| 100-Personen-Konstellationen | 4/4 bestanden | 12 OPD-Räume; 6 BPS-Räume mit Gruppen; 12 gemischte Räume mit 8 manuell gesetzten Personen; 11 BPS-Räume mit 99 Pflichtplätzen |
| Fehlerbehandlung | bestanden | Manuell überfüllte Regierung wird zurückgewiesen, ohne Personenverlust |
| JavaScript-Syntax | bestanden | `node --check app.js` |

### Ausgewählte Laufzeiten bei 100 Teilnehmern

| Fall | Rechenzeit (ungefähr) |
|---|---:|
| 12 OPD-Räume | 1,1 s |
| 6 BPS-Räume mit Gruppen | 3,8 s |
| 12 gemischte Räume mit festen Plätzen | 1,6 s |
| 11 BPS-Räume | 3,2 s |

Laufzeiten sind Momentaufnahmen dieser Testumgebung, keine Garantien für andere Computer. In allen vier Fällen gab es 100 eindeutig erfasste Personen, keine doppelten oder verlorenen Teilnehmer und keine aufgeteilten Gruppen.

## Noch offene Grenzen

- **Keine 100-prozentige Fehlerfreiheitsgarantie.** Die Tests decken nicht jede denkbare Kombination ab.
- **Mehrraum-Suche:** Die bestehende Rechenzeit-/Suchschrittbegrenzung kann in sehr ungewöhnlichen Gruppenfällen eine vorhandene Lösung übersehen. Die Anwendung zeigt dafür eine Warnung.
- **Unteilbare Gruppen:** Die höchste mögliche Jurypriorität kann durch Gruppenbindung und manuelle Plätze begrenzt sein.
- **Browsergeräte:** Geprüft wurde Chromium. Reale Android-/iOS-Geräte, Firefox, Safari und ein direkter Start über `file://` wurden in dieser Sitzung nicht verifiziert.

## Ergebnis

Die gezielte v1.5-Änderung ist in allen ausgeführten Prüfungen funktionsfähig. Die übrige Bedienung und die automatische Verteilung haben die relevanten Regressionstests bestanden. Das GitHub-Repository wurde nicht verändert. Die vorherige Version v1.4 bleibt als separater Rückfallstand bestehen.
