import type { SiteLocale } from "@/content/services";
import { ConversationCTA } from "@/components/site/Primitives";
export default function ContactCTA({locale}:{locale:SiteLocale}) {return <ConversationCTA locale={locale} />;}
