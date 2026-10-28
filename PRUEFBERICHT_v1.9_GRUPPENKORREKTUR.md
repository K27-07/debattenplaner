# Prüfbericht – Debattenplaner 1.9, Gruppenkorrektur

**Datum:** 28. Oktober 2026  
**Prüfgegenstand:** Korrigierter lokaler Quellcode, basierend auf `debattenplaner_v1.9_korrigiert.zip`. **Keine** Aktualisierung von GitHub vorgenommen.  
**Versionsnummer:** unverändert 1.9

## Ursache und Korrektur

Eine manuell gebildete Gruppe übernahm bislang nur bei der Gruppenleitung die manuellen Zuordnungskennzeichen. Bei zuvor automatisch eingeteilten Gruppenmitgliedern konnte `autoSeat: true` beziehungsweise `autoRoom: true` erhalten bleiben. Nach dem Löschen der Leitung wurden sie zu eigenständigen Teilnehmern, ohne ihre Reservierung/Automatikkennzeichen dem tatsächlichen manuellen Platz anzupassen. `releaseAutomaticSeats()` gab diese Plätze bei einer erneuten Teamverteilung daraufhin unbeabsichtigt frei.

**Codekorrekturen in `app.js`:**

1. Neue Funktion `protectManualParty()`: Setzt `reservedRoom` auf den Raum der Gruppenleitung und setzt `autoSeat`/`autoRoom` für die vollständige Gruppe zurück; wird nach `addChild()` aufgerufen.
2. `deleteMember()`: Setzt die drei Zuweisungskennzeichen für jedes nach dem Löschen freigesetzte Kind auf dessen aktuellen, damit geschützten Raum-/Teamplatz.
3. `moveMember()`: Synchronisiert bei manuellen Umsetzungen *ganzer Gruppen* auch die Reservierung der Kinder (z. B. „Alle einsammeln“ und Formatwechsel), damit keine veralteten Kennzeichen verbleiben.

## Reproduzierbare Tests in headless Chromium

| Nr. | Szenario | Ergebnis |
|---|---|---|
| 1 | Acht erfahrene Teilnehmer automatisch verteilen, zwei Sprecher desselben Teams über die **Oberfläche** gruppieren, Gruppenleitung über die **Oberfläche** löschen, erneut verteilen | Bestanden: Übriger Sprecher behält den manuell beeinflussten Teamplatz |
| 2 | Zwei zuvor automatisch besetzte unterschiedliche Teams gruppieren; Leitung löschen; erneut verteilen | Bestanden: Überlebender behält den Zielplatz |
| 3 | Zwei Zweiergruppen verbinden, gemeinsame Leitung löschen | Bestanden: Alle drei verbleibenden Personen erhalten gültige manuelle Flags |
| 4 | Per „Auf Räume verteilen“ lokal eingeteilte Personen gruppieren, Leitung löschen und Räume erneut verteilen | Bestanden: Manuelle Raumreservierung erhalten |
| 5 | Juryfreiwillige gruppieren, Leitung löschen | Bestanden: Individuelle Juryregistrierung und korrekte Kandidatenliste erhalten |
| 6 | Gruppe explizit auflösen und anschließend automatisch neu verteilen | Bestanden: Bereits manuell beeinflusste Plätze geschützt |
| 7 | Freiwilliger Juror kommt nach der ersten Verteilung hinzu | Bestanden: Er erhält beim Neuverteilen Vorrang |
| 8 | Sechs Personen ohne vollständige Debattenbesetzung auf zwei Räume aufteilen | Bestanden: Aufteilung 3+3 |
| 9 | Vier Teilnehmende nacheinander per Enter hinzufügen | Bestanden: Fokus bleibt im Namensfeld |
| 10 | 220 deterministisch zufällige Änderungen (u. a. Gruppieren, Löschen, Auflösen, Sammeln, Umsetzen, Raum-/Teamverteilung) mit Integritätsprüfung nach jedem Schritt | Bestanden: Keine doppelten oder verlorenen Mitglieder, keine widersprüchlichen Gruppenzuordnungen |

**Zusätzlicher Regressionstest:** 60 zufallsgenerierte gemischte OPD-/BPS-Konstellationen mit 1–3 Räumen, variablen Jurygrößen, Freiwilligen und erfahrenen Teilnehmern. Ergebnis: **60/60** vollständige Pflichtplatzbesetzungen und korrekte globale Jurypriorität in den geprüften Fällen. Gemessene Laufzeit pro Verteilung in dieser Testumgebung: Median 66 ms, Maximum 797 ms.

**JavaScript-Syntax:** `node --check app.js` erfolgreich. **Browserfehler:** Keine in den gezielten Tests.

## Grenzen

Die Prüfungen liefen in lokalem Chromium mit den unveränderten CSS-Dateien und der JavaScript-Anwendung; ausschließlich für die automatisierten Zustandsprüfungen wurden lesende Testzugriffe außerhalb der ausgelieferten App freigelegt. Die GitHub-Pages-Seite wurde nicht getestet und nicht geändert. Keine realen iOS-/Android-Tests und keine vollständige formale Verifikation. Andere bekannte Risiken wie fehlende dauerhafte Speicherung und mögliche Rechenlimits bei sehr komplexen Raumplänen bleiben bestehen.
