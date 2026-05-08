"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type Locale = "de" | "en"

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const segments = pathname.split("/")
  const locale = (segments[1] as Locale) || "en"

  const switchLanguage = (lang: Locale) => {
  const newSegments = [...segments]   // new array to avoid mutating original
  newSegments[1] = lang

  router.push(newSegments.join("/"))
}

  return (
    <div className="flex overflow-hidden rounded-md border border-brand-steel">
      
      <Button
        variant={locale === "de" ? "default" : "ghost"}
        className="rounded-none px-3"
        onClick={() => switchLanguage("de")}
      >
        DE
      </Button>

      <Button
        variant={locale === "en" ? "default" : "ghost"}
        className="rounded-none px-3"
        onClick={() => switchLanguage("en")}
      >
        EN
      </Button>

    </div>
  )
}