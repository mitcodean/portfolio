"use client";

import clsx from "clsx";
import { useSyncExternalStore, useTransition, type ChangeEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { asLocale, routeForPath, routePath } from "@/config/site";

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function LocaleSwitcherSelect({ children, defaultValue, label }: {
  children: ReactNode; defaultValue: string; label: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);

  function change(event: ChangeEvent<HTMLSelectElement>) {
    const locale = asLocale(event.target.value);
    const route = routeForPath(pathname);
    startTransition(() => router.replace(route ? routePath(route, locale) : pathname, { locale }));
  }

  return (
    <label className={clsx("relative text-gray-400", pending && "transition-opacity opacity-30")}>
      <span className="sr-only">{label}</span>
      <select
        className="inline-flex min-h-11 cursor-pointer appearance-none rounded bg-transparent py-3 pl-2 pr-6"
        value={defaultValue}
        disabled={pending || !hydrated}
        onChange={change}
      >
        {children}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
