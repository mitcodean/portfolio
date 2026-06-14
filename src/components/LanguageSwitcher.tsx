"use client";

import {usePathname, useRouter} from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

type Locale = "de" | "en";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (locale: Locale) => {
    const segments = pathname.split("/");

    // replace locale segment ("/de/..." -> "/en/...")
    segments[1] = locale;

    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 border rounded-md text-sm">
        🌍 Language
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("de")}>
          🇩🇪 Deutsch
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => switchLanguage("en")}>
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}