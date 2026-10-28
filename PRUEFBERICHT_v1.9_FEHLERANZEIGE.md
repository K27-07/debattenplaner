# Prüfbericht: Debattenplaner 1.9 – korrekte Fehlermeldungen nach Rücknahme

**Prüfgegenstand:** Korrigierte Fassung der lokalen ZIP `debattenplaner_v1.9_transaktionsfix.zip` vom 28.10.2026. Kein Zugriff auf und keine Änderung an GitHub. Version bleibt 1.9.

## Ausgangsfehler

Bei einem OPD-Raum mit sieben Mitgliedern und vollständiger Erstverteilung wurde der Juror gelöscht. Beim erneuten Klick auf **„Auf Teams verteilen“** konnte die Verteilung erwartungsgemäß nicht vervollständigt werden. Die bisherigen sechs Teamsitze blieben zwar bestehen, die Meldung behauptete jedoch `Regierung (3), Opposition (3), Jury (1)` seien offen.

**Ursache:** `distributeCore()` erstellte Defizitangaben, während `distributeAttempt()` zuvor automatisch zugewiesene Teamplätze für eine Neuplanung vorübergehend freigegeben hatte. `distribute()` nahm die Sitzänderungen zurück, übernahm aber die Defizite dieses Zwischenzustands.

## Korrektur

- Neue Funktion `restoredPlanNotice()` berechnet nach `restorePool(original)` die pro Raum tatsächlich noch offenen Pflichtplätze anhand des erhaltenen Zustands.
- Bereits belegte Teamplätze werden nicht erneut als Defizit aufgeführt.
- Wo durch die aktuelle Belegung und den noch verfügbaren Pool die Mindestkapazität unterschritten ist, wird die fehlende Personenzahl genannt; andernfalls gibt die Meldung Hinweise auf Raum-, Gruppen- oder Platzvorgaben.
- Die Berechnung der Fehlermeldung liest Belegungslisten ohne sie zu erzeugen oder zu verändern. Manuell belegte Plätze, Teams, Juroren und Gruppen bleiben bei abgewiesenen Neuverteilungen unverändert.
- Vorab erkannte manuelle Überbelegungen bleiben detailliert benannt. Besondere Juryprioritäts- und interne Plausibilitätsmeldungen bleiben erhalten.
- **Keine Änderung** an der fachlichen Verteilungslogik, den Suchgrenzen oder der Darstellung.

## Gezielte Tests, neu durchgeführt

| Test | Ergebnis |
|---|---|
| OPD 3+3+1, Juror löschen, erneute Verteilung: nur `Jury (1)` offen | Bestanden |
| Abgelehnte Neuverteilung bewahrt Listen und Platzkennzeichen exakt | Bestanden |
| Leere Ausgangsplanung nennt Regierung, Opposition, Jury korrekt | Bestanden |
| Englische und deutsche Fehlermeldungen | Bestanden |
| Manuell überfülltes Team: Meldung und vollständige Rücknahme | Bestanden |
| Fehler bei einem Raum erwähnt keine offenen Plätze anderer Räume | Bestanden |
| Fehlerdiagnose erzeugt keine neuen internen Listen | Bestanden |
| Erfolgreiche Neuverteilung zeigt weiterhin Erfolg | Bestanden |

**Automatisierte Tests:** `tests/test_restored_messages.js` (7/7), `tests/test_restored_messages_browser.py` (8/8).

## Regressionstests

- `node --check app.js`: ohne Syntaxfehler.
- `tests/test_transaction.js`: **13/13** bestanden; einschließlich Überbelegung, Einzelraumverteilung, Wiederholung, Gruppen und Schutz anderer Räume.
- `tests/test_forced_abort.js`: künstlicher interner Fehler wird vollständig zurückgenommen.
- `tests/regression_1000.js`: **1.000/1.000** simulierte Clubabende bestanden (577 OPD, 300 BPS, 123 gemischt).
- `tests/priority_100.js`: bekannter schwieriger 100-Personen-Fall **11/11 Räume**, **19 freiwillige Juroren**, keine verlorenen Teilnehmer oder verschobenen manuellen Plätze.
- Bestehende Chromium-Browserprüfungen: `test_interface.py` **20/20**, `test_registration_defaults.py` **18/18**, `test_status_notice.py` **22/22**, `test_transaction_browser.py` **11/11**; zusammen **71/71** bestanden.
- Zusätzlicher realer Chromium-Test mit Klicks und simuliertem Smartphone-Bildschirm: **8/8** bestanden, keine JavaScript-Ausnahmen.

## Grenzen

Das erfolgreiche Testen kann mathematische Fehlerfreiheit nicht garantieren. Die begrenzte kombinatorische Suche für ungewöhnliche Gruppenkonstellationen besteht unverändert fort. Echte iOS-/Android-Hardware wurde nicht getestet. Dauerhaftes Speichern bleibt bewusst nicht Teil des Clubabend-Werkzeugs.

**Ergebnis:** Der bestätigte Fehler ist korrigiert und in den neuen sowie bisherigen Tests nicht mehr reproduzierbar. GitHub blieb unangetastet.
