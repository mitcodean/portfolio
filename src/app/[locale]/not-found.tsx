import { getLocale } from "next-intl/server";
import { asLocale } from "@/config/site";
import { NotFoundContent } from "../not-found";

export default async function LocalizedNotFound() {
  return <NotFoundContent locale={asLocale(await getLocale())} />;
}
