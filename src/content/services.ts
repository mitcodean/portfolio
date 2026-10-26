import de from "@/messages/de.json";
import en from "@/messages/en.json";

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

// The catalogue is localized in the existing next-intl dictionaries.
export const services: Record<SiteLocale, ServiceCategory[]> = {
  de: de.serviceCatalog as ServiceCategory[],
  en: en.serviceCatalog as ServiceCategory[],
};
