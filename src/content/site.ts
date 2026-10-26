import de from "@/messages/de.json";
import en from "@/messages/en.json";

// Presentation helpers read the same dictionaries as next-intl; no parallel translations.
export const siteCopy = { de: de.site, en: en.site };
export type SiteCopy = typeof de.site;
