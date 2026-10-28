# Prüfbericht – Debattenplaner v1.4

**Datum:** 28. Oktober 2026  
**Gegenstand:** eigenständige Offline-Version v1.4 (lokale Dateien, GitHub-Repositorium nicht verändert)

## Implementierung

- Native HTML5-Drag-Events bleiben für Mausbedienung erhalten.
- Pointer-Events ergänzen langes Drücken mit Finger/Stift (350 ms, 12 px Bewegungstoleranz vor Aktivierung), Ziehvorschau und Zielhervorhebung.
- Beim Loslassen wird über das tatsächlich unter dem Finger liegende Element ein Teamplatz oder eine Teilnehmergruppe bestimmt; bei ungültigem Ziel wird der Vorgang verworfen.
- Autoscroll beim Ziehen: vertikal an den Bildschirmrändern, horizontal innerhalb breiter Raumtabellen.
- Bestehende OPD-/BPS- und Jury-/Erfahrungsverteilungslogik wurde nicht verändert.

## Praktische Tests (Chromium 144, mobile Touchsimulation)

| Prüfung | Ergebnis |
|---|---|
| Start und Darstellung der Oberfläche | Bestanden |
| Acht Personen über das Formular anlegen | Bestanden |
| Fingerziehen mit angezeigter Vorschau ins Regierungsteam | Bestanden |
| Alle acht Personen nach dem ersten Ablegen noch vorhanden | Bestanden |
| Zweiten Teilnehmer in dasselbe Team ziehen | Bestanden |
| Fingerziehen auf anderen Teilnehmer zum Gruppieren | Bestanden |
| Alle acht Teilnehmer bleiben nach Gruppenbildung erhalten | Bestanden |
| Einzelnes Gruppenmitglied per Finger in die Opposition ziehen | Bestanden |
| Kurzes Antippen zum Auswählen | Bestanden |
| Zuweisung nach Antippen über „Hier zuweisen“ | Bestanden |
| Dunkelmodus über Touch bedienen | Bestanden |
| Englisch als Sprache wählen | Bestanden |
| Drag-and-drop außerhalb einer gültigen Zielspalte abbrechen | Bestanden |
| Langes Gedrückthalten ohne Bewegung: keine Zuweisung | Bestanden |
| Maus-Drag-and-drop am Desktop unverändert | Bestanden |
| JavaScript-Fehler während der Bedienung | Keine |

15 gezielte Bedienungs- und Zustandschecks bestanden; außerdem traten keine JavaScript-Laufzeitfehler auf. Zusätzlich wurde geprüft: Seitliches Scrollen in der breiten Teamtabelle (bis `scrollLeft=622` px), vertikales Scrollen bei sechs Räumen (bis `scrollY=492` px), Touch-Abbruch ohne Datenverlust.

## 100-Teilnehmer-Regression (Chromium)

| Szenario | Vollständig besetzte Räume | Rechenzeit | Datenintegrität |
|---|---:|---:|---|
| 12 OPD-Räume | 12/12 | 0,45 s | 100 von 100, keine Doppelten |
| 6 BPS-Räume mit Zweiergruppen | 6/6 | 4,05 s | 100 von 100, Gruppen intakt |
| 12 gemischte Räume mit acht manuellen Vorgaben | 12/12 | 1,63 s | 100 von 100, Gruppen intakt |

## Grenzen

Diese Tests sind kein Nachweis absoluter Zuverlässigkeit. Der Browser verwendete simulierte Touch-Eingaben in Chromium, **keine realen iPhones, Android-Geräte oder Safari**. Der lokale Direktstart über `file://` wurde durch administrative Browsereinstellungen blockiert. Die Fingerbedienung sollte auf einem echten Android-Gerät und iPhone überprüft werden, bevor sie bei einer Veranstaltung als einzige Zuweisungsmethode verwendet wird. Normales Antippen plus „Hier zuweisen“ bleibt als Alternative verfügbar.
