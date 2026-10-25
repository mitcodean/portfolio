[
  {
    "testfall": "Test 1 – Laserteile",
    "kategorie": "Standardfall",
    "beschreibung": "Eine relativ vollständige Kundenanfrage.",
    "anfragetext": "Guten Tag, wir benötigen 50 Haltewinkel aus Edelstahl 1.4301, Blechstärke 3 mm. Die Zeichnung ist im Anhang. Die Lieferung sollte innerhalb von drei Wochen erfolgen. Bitte senden Sie uns ein Angebot.",
    "erwartetes_ergebnis": {
      "stueckzahl": 50,
      "bauteil": "Haltewinkel",
      "werkstoff": "Edelstahl 1.4301",
      "blechstaerke": "3 mm",
      "liefertermin": "drei Wochen"
    },
    "hinweis": "Zeichnung wurde erwähnt, muss aber separat geprüft werden."
  },
  {
    "testfall": "Test 2 – Unvollständige Anfrage",
    "kategorie": "Fehlende Daten",
    "beschreibung": "Hallo, wir brauchen ungefähr 120 Blechteile aus Aluminium. Könnten Sie uns einen Preis machen? Genauere Informationen können wir nachreichen.",
    "anfragetext": "Hallo, wir brauchen ungefähr 120 Blechteile aus Aluminium. Könnten Sie uns einen Preis machen? Genauere Informationen können wir nachreichen.",
    "erwartetes_ergebnis": {
      "stueckzahl": 120,
      "bauteil": "Blechteile",
      "werkstoff": "Aluminium",
      "blechstaerke": null,
      "liefertermin": null
    },
    "hinweis": "Blechstärke, Abmessungen, Zeichnung und Liefertermin fehlen."
  },
  {
    "testfall": "Test 3 – Schweißauftrag",
    "kategorie": "Andere Leistung",
    "beschreibung": "Sehr geehrte Damen und Herren, wir möchten ein beschädigtes Stahlbauteil reparieren lassen. Wir könnten es nächste Woche vorbeibringen. Ist eine Reparaturschweißung bei Ihnen möglich?",
    "anfragetext": "Sehr geehrte Damen und Herren, wir möchten ein beschädigtes Stahlbauteil reparieren lassen. Wir könnten es nächste Woche vorbeibringen. Ist eine Reparaturschweißung bei Ihnen möglich?",
    "erwartetes_ergebnis": {
      "stueckzahl": null,
      "bauteil": "Stahlbauteil",
      "werkstoff": "Stahl",
      "leistung": "Reparaturschweißung",
      "liefertermin": "nächste Woche vorbeibringen"
    },
    "hinweis": "Werkstoffdetails, Maße, Schadensbeschreibung und gewünschter Fertigstellungstermin fehlen."
  }
]