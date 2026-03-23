"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";



export default function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/");

  const switchTo = (locale: string) => {
    segments[1] = locale;
    return segments.join("/");
  };

  return (

    <div className="flex gap-2 text-xs text-neutral">
      <Link href={switchTo("de")} className="hover:text-accent-rose">
        DE
      </Link>
      <span>|</span>
      <Link href={switchTo("en")} className="hover:text-accent-rose">
        EN
      </Link>
    </div>
  );
}