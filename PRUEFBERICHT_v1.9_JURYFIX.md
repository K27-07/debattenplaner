# Debattenplaner 1.9 – Korrektur und Regressionstest zur globalen Jurypriorität

**Stand:** 28. Oktober 2026. Getestet wurde ausschließlich die lokal erstellte Korrektur der ZIP `debattenplaner_v1.9_mobil_korrigiert.zip`, nicht die GitHub-Version.

## Bestätigter Ausgangsfehler

100 Teilnehmer, 6 OPD- und 5 BPS-Räume, je zwei Juryplätze, 11 Teilnehmergruppen und mehrere manuelle Team-, Jury- und freie Rednerplätze. Bei einem reproduzierbaren Zufallsstart (`67` in der früheren Szenarienerzeugung) war eine vollständige Verteilung möglich, aber die bisherige Routine nahm eine nicht freiwillige Zweiergruppe in die Jury, während zwei freiwillige Einzelpersonen als Redner vorgesehen waren. Die Vorrangkontrolle lehnte anschließend den kompletten Plan ab.

## Technischer Fix

Die frühere Mehrraum-Verbesserung `improveJointJuryPriority()` erlaubt nur Tauschbewegungen gleich großer Gruppen. Der neue, nur bei unzulässigem Juryergebnis aktivierte Rückfallweg `findPriorityFirstPlan()` platziert verfügbare Kandidatengruppen priorisiert in die Jury und füllt erst anschließend die Mannschaften. Er arbeitet mit vollständigen Zustandskopien, respektiert lokale Raumbindungen und übernimmt ein Ergebnis nur, wenn die abschließende Juryprioritätsprüfung bestanden ist und keine bereits vollständigen Räume verloren gehen. Sind Freiwillige in unsortierten Mischgruppen gebunden, kann er nach mehreren erfolglosen Versuchen auch solche noch nicht fest platzierten Gruppen auflösen. Bestehende manuelle Plätze bleiben geschützt.

## Ausgeführte Tests

| Test | Ergebnis |
|---|---|
| Originaler Fehlerfall im Node-JavaScript-Test, deterministischer Zufallszustand | 11/11 vollständige Räume, 19 freiwillige Juroren, 0 manuell verschobene Platzierungen, 0 Teilnehmerverluste |
| Identischer Zustand, reale Schaltfläche im Chromium-Browser | 11/11 Räume vollständig, 100 Namen sichtbar, Juryregel erfüllt, keine JS-Ausnahme |
| Fünf 100-Personen-Szenarien, jeweils acht Zufallsstarts | 40/40 vollständig und ohne Regelverletzung |
| 140 Gruppenkonstellationen in ein/zwei Räumen | 140/140 korrekt, keine Gruppen-/Platz-/Datenverletzung |
| 1.000 simulierte Clubabende (577 OPD, 300 BPS, 123 gemischt) | 1000/1000 vollständig, feste Plätze eingehalten, keine festgestellten Fehler |
| Sechs kleinere gezielte Bedien- und Logikregressionen | 6/6 bestanden |
| JavaScript-Syntaxprüfung | Bestanden |

Laufzeit des vorher fehlgeschlagenen Falls: ~1,0 s in Node/Chromium-Tests. Maximaler Wert in den 40 großen Testvarianten ~710 ms; median ~151 ms. Zeiten variieren je nach Hardware und Zufallsverlauf.

## Einschränkungen

- Der Rückfallweg arbeitet mit begrenzter Anzahl und Zeit von Versuchen. Eine vollständige Lösung ist auch nach diesem Fix nicht für jede theoretisch zulässige Konstellation garantiert.
- Die realen mobilen Browser Safari und Android Chrome wurden nicht erneut geprüft. Die CSS-/Touchdateien wurden unverändert übernommen.
- Es wurden keine GitHub-Dateien geändert oder veröffentlicht.
