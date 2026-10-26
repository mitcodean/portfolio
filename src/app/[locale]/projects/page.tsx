import { permanentRedirect } from "next/navigation";
import { asLocale, routeHref } from "@/config/site";
export default async function LegacyPage({params}:{params:Promise<{locale:string}>}){permanentRedirect(routeHref("examples",asLocale((await params).locale)));}
