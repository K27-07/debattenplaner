# Prüfbericht – Debattenplaner 1.9, Gruppen- und Rückgabefix

**Prüfgrundlage:** Die zuvor bereitgestellte ZIP `debattenplaner_v1.9_fehleranzeige_korrigiert.zip` (SHA-256 `537f10a56a319c820b6e1c1e444837c10609cf418c5a7178bc9c9a6c5bfec12d`). GitHub wurde nicht geändert oder als Quellcodebasis verwendet.

## Behobener reproduzierbarer Sonderfall

Neun Teilnehmer in einem OPD-Raum, zwei freiwillige Juroren, zwei Juryplätze, ein manuell reservierter Regierungsplatz und drei Zweiergruppen. Vorher gab `distributeAttempt('teams')` `{accepted: true}` mit einer Juryprioritätswarnung zurück, obwohl keine Verteilung übernommen wurde. Anschließend entstanden neue leere interne Listen. Jetzt wird derselbe Fall mit `{accepted: false}` abgewiesen; die Meldung verweist auf Gruppengrößen und mögliche Platzkonflikte. Die Teilnehmer-/Listen-Snapshots vor und nach dem Versuch sind identisch.

## Technische Korrektur

- `distributeAttempt()` hat einen zentralen Ablehnungsweg `rejectAttempt()`: Snapshot wiederherstellen und `accepted:false` zurückgeben.
- Weder im früheren `!candidates.length`-Zweig noch nach den alternativen Gruppenversuchen wird die Jurypriorität gegen einen bereits wiederhergestellten Ausgangszustand geprüft.
- Nach alternativen Suchversuchen wird die als beste geplante Belegung wiederhergestellt, bevor ihre Jurypriorität überprüft wird.
- Bei Teilnehmermangel wird die fehlende Anzahl vorrangig genannt; bei gruppierten, nicht erfolgreich zugeteilten Teilnehmern eine sachgerechte Gruppen-/Platzwarnung. Die Formulierung behauptet **nicht**, dass mathematisch gar keine Lösung existiert.
- Die Rücknahme stellt auch alle temporär angelegten leeren Listen und etwaige Gruppentrennungen wieder her.

## Tatsächlich ausgeführte Tests

| Test | Ergebnis |
|---|---|
| Neue `tests/test_group_rejection_fix.js` | 6/6 bestanden |
| Neue `tests/test_group_rejection_browser.py` | 7/7 bestanden, über Chromium-Bedienoberfläche |
| `tests/test_transaction.js` | 13/13 bestanden |
| `tests/test_restored_messages.js` | 7/7 bestanden |
| `tests/test_forced_abort.js` | Bestanden |
| `tests/test_group_random.js` | 140/140 vollständig |
| `tests/regression_1000.js` | 1.000/1.000 vollständig |
| `tests/priority_100.js` | 11/11 Räume, 19 freiwillige Juroren, keine manuell verschobenen Plätze |
| Bestehende Chromium-Tests: `test_restored_messages_browser.py`, `test_transaction_browser.py`, `test_registration_defaults.py`, `test_interface.py`, `test_status_notice.py` | Alle ohne Testfehler |
| `node --check app.js` | Bestanden |

Neue Browser-Testkonstellation: Anwesende über das Eingabefeld angelegt, zwei Freiwillige markiert, Regierungssprecher manuell gesetzt, drei Zweiergruppen per Klick gebildet; nach „Auf Teams verteilen“ richtige Ablehnung und exakte Snapshot-Gleichheit. Der englische Text wurde ebenfalls geprüft. Die Prüfung erfolgte mit lokal geladenem Code in Chromium, nicht auf einem echten Telefon.

## Grenzen und Einordnung

Die algorithmische Suche hat aus Performancegründen weiterhin feste Grenzen. Bei seltenen Gruppenkombinationen kann eine prinzipiell mögliche Verteilung unentdeckt bleiben. Die neue Fehlermeldung ist bewusst vorsichtig formuliert. Eine mathematische Korrektheitsgarantie oder ein Test auf echten iPhones/Android-Geräten wurde nicht erreicht. Es besteht keine Notwendigkeit zur dauerhaften Speicherung für den beschriebenen einmaligen Clubabend.

**Fazit:** Beide gemeldeten Fehler sind im reproduzierten Fall behoben. Die bisherigen Kernfunktions- und Regressionstests blieben erfolgreich. Eine Veröffentlichung ist nach einem kurzen Check auf dem Zielgerät vertretbar; ein vollständiger Fehlerfreiheitsnachweis ist das nicht.
