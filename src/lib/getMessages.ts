import { Locale } from "./i18n";

export async function getMessages(locale: Locale): Promise<Messages> {
  return (await import(`../messages/${locale}.json`)).default;
}

export type Messages = {
  nav: {
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  footer: {
    contact: string;
    phone?: string;
    email?: string;
    rights?: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    phone?: string;
    email_label?: string;
    location?: string;
  };
  about: {
    title: string;
    education?: {
      title: string;
      description: string;
    };
    experience?: {
      title: string;
      description: string;
    };
    focus?: {
      title: string;
      description: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    view: string;
    source: string;
    featured?: string;
    all?: string;
  };
  cta: {
    view_projects: string;
    get_in_touch: string;
    available: string;
    discuss_project?: string;
  };
};