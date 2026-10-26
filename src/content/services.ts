export type SiteLocale = "de" | "en";
export type ServiceCategory = {
  id: "automatisierung" | "it-netzwerke" | "websites";
  title: string;
  shortTitle: string;
  description: string;
  benefit: string;
  preview: string[];
  groups: { title: string; items: string[] }[];
  examples: { title: string; description: string }[];
};

export const services: Record<SiteLocale, ServiceCategory[]> = {
  de: [
    {
      id: "automatisierung", title: "Prozessautomatisierung & Softwareentwicklung", shortTitle: "Software & Automatisierung",
      description: "Wenn Informationen mehrfach erfasst werden oder Systeme nicht zusammenspielen, lohnt sich ein genauer Blick auf den Ablauf. Diovis entwickelt Software und Schnittstellen, die zu Ihren Anforderungen passen.",
      benefit: "Das Ziel: weniger manuelle Übertragungen, nachvollziehbare Informationen und Abläufe, die im Alltag verständlich bleiben. Was sich sinnvoll umsetzen lässt, klären wir anhand Ihres konkreten Prozesses.",
      preview: ["Geschäftsprozesse automatisieren", "Systeme über Schnittstellen verbinden", "Individuelle Web- und Desktop-Anwendungen", "KI-Assistenten für Anfragen und Daten"],
      groups: [
        { title: "Wiederkehrende Büroabläufe", items: ["Automatisierung wiederkehrender Geschäftsprozesse", "Online-Terminbuchung & Kalender-Synchronisierung", "Rechnungs- und Dokumentenerstellung automatisieren", "Interne Verwaltungs- und Freigabeprozesse digitalisieren"] },
        { title: "Daten und Systeme verbinden", items: ["Excel-/CSV-Importe, Exporte und Datenaufbereitung", "API-Entwicklung & Schnittstellenintegration", "CRM-/ERP-Systeme verbinden und automatisieren", "Datenmigration zwischen unterschiedlichen Systemen"] },
        { title: "Individuelle Anwendungen und KI", items: ["Individuelle Webanwendungen entwickeln", "Desktop-Anwendungen entwickeln", "Dashboards, Auswertungen & Kennzahlen", "KI-Assistenten und intelligente Datenverarbeitung", "Angebots- und Kundenanfragen automatisiert aufbereiten"] },
      ],
      examples: [
        { title: "Kundenanfragen vorbereiten", description: "Ein Assistent kann Angaben aus Anfragetexten strukturieren und offene Fragen sichtbar machen. Die fachliche Prüfung bleibt beim Menschen – wie in unserer interaktiven Demo." },
        { title: "Excel-Daten weiterverarbeiten", description: "Dateien einlesen, Daten prüfen und für ein anderes System aufbereiten. So kann eine individuelle Lösung wiederkehrende Übertragungen unterstützen." },
        { title: "Dokumente und Freigaben verbinden", description: "Vorhandene Daten für Dokumente nutzen und einen nachvollziehbaren Prüfschritt vorsehen, statt dieselben Informationen mehrfach zu erfassen." },
        { title: "Eine passende Anwendung entwickeln", description: "Eine interne Web- oder Desktop-Anwendung kann spezielle Anforderungen abbilden, die sich mit dem vorhandenen Standardwerkzeug nicht sinnvoll lösen lassen." },
      ],
    },
    {
      id: "it-netzwerke", title: "IT & Netzwerktechnik", shortTitle: "IT & Netzwerke",
      description: "Digitale Abläufe brauchen eine passende technische Grundlage. Diovis unterstützt bei der Planung, Konfiguration und Betreuung Ihrer IT-Infrastruktur.",
      benefit: "Ein übersichtlicher Aufbau und abgestimmte Zugriffe können den Betrieb und die Wartung erleichtern. Bedarf, vorhandene Systeme und Zuständigkeiten werden vor der Umsetzung gemeinsam geklärt.",
      preview: ["Firmennetzwerke, WLAN und VLANs", "VPN und sichere Remote-Zugriffe", "Server, NAS und Backup-Konzepte", "Arbeitsplätze und Microsoft 365"],
      groups: [
        { title: "Netzwerke und Zugriffe", items: ["Planung und Konfiguration von Firmennetzwerken", "Router, Switches und VLANs konfigurieren", "WLAN-Netzwerke planen und einrichten", "VPN und sichere Remote-Zugriffe"] },
        { title: "Systeme und laufender Betrieb", items: ["Server- und NAS-Einrichtung", "Datensicherung und Backup-Konzepte", "Windows-PCs und Arbeitsplätze einrichten", "Microsoft 365 und Cloud-Dienste konfigurieren", "Systemüberwachung und Wartung"] },
      ],
      examples: [
        { title: "Ein Firmennetzwerk aufbauen", description: "Netzwerkbereiche, WLAN und Zugriffswege passend zu Geräten, Arbeitsplätzen und Arbeitsabläufen planen und konfigurieren." },
        { title: "Daten und Arbeitsplätze organisieren", description: "Server oder NAS einrichten, ein Backup-Konzept abstimmen und Arbeitsplätze für den vorgesehenen Einsatz konfigurieren." },
      ],
    },
    {
      id: "websites", title: "Websites & digitale Sichtbarkeit", shortTitle: "Websites & Sichtbarkeit",
      description: "Eine Unternehmenswebsite soll Ihr Angebot verständlich machen und den nächsten Schritt erleichtern. Diovis verbindet technische Umsetzung mit klarer Struktur und einer soliden SEO-Grundlage.",
      benefit: "Besucher sollen schnell erkennen, was Ihr Unternehmen anbietet und wie sie Kontakt aufnehmen können. Sichtbarkeit und Nutzung lassen sich auf einer technischen Grundlage weiterentwickeln – ohne versprochene Rankings.",
      preview: ["Moderne Unternehmenswebsites", "Technische und inhaltliche SEO", "E-Commerce und Online-Shops", "Webanalyse und Conversion-Tracking"],
      groups: [
        { title: "Auftritt, Auffindbarkeit und Auswertung", items: ["Moderne Unternehmenswebsites entwickeln", "Suchmaschinenoptimierung (SEO)", "E-Commerce und Online-Shops entwickeln", "Webanalyse und Conversion-Tracking"] },
      ],
      examples: [
        { title: "Ein Angebot verständlich präsentieren", description: "Eine responsive Unternehmenswebsite mit klarer Navigation, hilfreichen Leistungsseiten und nachvollziehbaren Kontaktwegen entwickeln." },
        { title: "Die digitale Nutzung besser verstehen", description: "Einen Online-Shop aufbauen oder eine passende Webanalyse vorbereiten. Tracking wird nur nach Abstimmung und mit den erforderlichen Einwilligungen eingebunden." },
      ],
    },
  ],
  en: [
    {
      id: "automatisierung", title: "Process automation & software development", shortTitle: "Software & automation",
      description: "When information is entered more than once or systems do not work together, the workflow deserves a closer look. Diovis develops software and integrations around your requirements.",
      benefit: "The aim is less manual transfer, traceable information and workflows people can understand. We assess what is useful and feasible against your actual process.",
      preview: ["Automate recurring business processes", "Connect systems through APIs", "Custom web and desktop applications", "AI assistants for inquiries and data"],
      groups: [
        { title: "Recurring office workflows", items: ["Automate recurring business processes", "Online appointment booking & calendar synchronization", "Automate invoice and document creation", "Digitize internal administration and approval processes"] },
        { title: "Connect data and systems", items: ["Excel/CSV imports, exports and data preparation", "API development & integration", "Connect and automate CRM/ERP systems", "Migrate data between systems"] },
        { title: "Custom applications and AI", items: ["Develop custom web applications", "Develop desktop applications", "Dashboards, reports & business metrics", "AI assistants and intelligent data processing", "Prepare quotation and customer inquiries automatically"] },
      ],
      examples: [
        { title: "Prepare customer inquiries", description: "An assistant can structure details from inquiry text and highlight open questions. A person still reviews the result, as demonstrated in our interactive example." },
        { title: "Process spreadsheet data", description: "Import files, check their contents and prepare data for another system. A custom solution can support recurring transfers." },
        { title: "Connect documents and approvals", description: "Use existing data to create documents and include a traceable review step instead of entering the same information repeatedly." },
        { title: "Develop a suitable application", description: "An internal web or desktop application can address requirements that existing standard tools do not cover well." },
      ],
    },
    {
      id: "it-netzwerke", title: "IT & network engineering", shortTitle: "IT & networks",
      description: "Digital workflows need the right technical foundation. Diovis supports the planning, configuration and maintenance of your IT infrastructure.",
      benefit: "A clear structure and coordinated access can make operation and maintenance easier. We clarify requirements, existing systems and responsibilities before implementation.",
      preview: ["Business networks, Wi-Fi and VLANs", "VPN and secure remote access", "Servers, NAS and backup concepts", "Workstations and Microsoft 365"],
      groups: [
        { title: "Networks and access", items: ["Plan and configure business networks", "Configure routers, switches and VLANs", "Plan and set up Wi-Fi networks", "VPN and secure remote access"] },
        { title: "Systems and ongoing operation", items: ["Server and NAS setup", "Data protection and backup concepts", "Set up Windows PCs and workstations", "Configure Microsoft 365 and cloud services", "System monitoring and maintenance"] },
      ],
      examples: [
        { title: "Set up a business network", description: "Plan and configure network segments, Wi-Fi and access around the devices, workstations and workflows in use." },
        { title: "Organize data and workstations", description: "Set up a server or NAS, agree on a backup concept and configure workstations for their intended use." },
      ],
    },
    {
      id: "websites", title: "Websites & digital visibility", shortTitle: "Websites & visibility",
      description: "A company website should make your offer easy to understand and the next step easy to take. Diovis combines implementation with a clear structure and sound SEO foundations.",
      benefit: "Visitors should quickly understand what you offer and how to contact you. Visibility and usability can develop from a solid technical foundation, without promised rankings.",
      preview: ["Modern company websites", "Technical and content SEO", "E-commerce and online shops", "Web analytics and conversion tracking"],
      groups: [
        { title: "Presence, discoverability and measurement", items: ["Develop modern company websites", "Search engine optimization (SEO)", "Develop e-commerce and online shops", "Web analytics and conversion tracking"] },
      ],
      examples: [
        { title: "Present your offer clearly", description: "Develop a responsive company website with clear navigation, useful service pages and understandable contact options." },
        { title: "Understand digital usage", description: "Build an online shop or prepare suitable web analytics. Tracking is integrated only after agreement and with any required consent." },
      ],
    },
  ],
};
