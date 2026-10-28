# Debattenplaner v1.9 – Nachkorrektur der Teilnehmererfassung (28.10.2026)

## Änderung
Nach dem erfolgreichen Hinzufügen eines Teilnehmers werden in `app.js` die Zustandswerte `entryExperienced = true` und `entryVolunteer = false` gesetzt, **bevor** die Erfassungsmaske erneut gerendert wird. Dies verhindert das unbeabsichtigte Übernehmen der zuvor gewählten Optionen „unerfahren“ und „freiwillige Jury“ auf den nächsten Teilnehmer. Die soeben hinzugefügte Person behält ihre ausdrücklich eingestellten Merkmale. Das Namensfeld bleibt fokussiert und erlaubt schnelles Erfassen mit Enter. Bei fehlgeschlagener Anmeldung wird kein zusätzlicher Reset erzwungen.

## Tests
- 18/18 gezielte Chromium-Prüfungen bei 390 px und 1280 px bestanden: Anfangswerte, explizite Sonderoptionen, Reset nach jeder Anmeldung, Fokus, unveränderte Merkmale der zuerst angelegten Personen und keine JavaScript-Ausnahmen.
- 20/20 bestehende Interface-Regressionstests bestanden (die Erwartung für die nächste Anmeldung wurde entsprechend der neuen Anforderung aktualisiert).
- 1000/1000 simulierte Clubabende aus `tests/regression_1000.js` vollständig und regelkonform verteilt.
- Der frühere 100-Personen-Problemfall wurde vollständig gelöst: 11/11 Räume, 19 freiwillige Juroren, keine manuelle Verschiebung, keine verlorenen Personen.
- Die zusätzlichen Chromium-Tests `tests/test_extra.py` mit 200 Teilnehmern auf 320/390/768/1280 px bestanden; Sicherheits- und Namensprüfungen ebenfalls.
- `node --check app.js` bestanden.

## Abgrenzung
Die Funktionen zur Jury-, Raum- und Teamverteilung sind gegenüber der vorherigen ZIP **bytegleich** geblieben; geändert wurde ausschließlich die Verarbeitung einer erfolgreichen Anmeldung sowie Dokumentation und Tests. Es wurde nicht auf GitHub veröffentlicht.
