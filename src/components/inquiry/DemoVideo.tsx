"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Play } from "lucide-react";
import { INQUIRY_VIDEO_POSTER, INQUIRY_VIDEO_URL } from "@/config/diovis";

export default function DemoVideo() {
  const t = useTranslations("inquiryShowcase");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  async function play() {
    setFailed(false);
    setStarted(true);
    try {
      // User-initiated playback; no autoplay and no media request before this action.
      await videoRef.current?.play();
    } catch {
      setFailed(true);
      setStarted(false);
    }
  }

  return (
    <div>
      <div className="relative isolate aspect-video overflow-hidden bg-background">
        <video
          ref={videoRef}
          controls={started}
          tabIndex={started ? 0 : -1}
          playsInline
          preload="none"
          poster={INQUIRY_VIDEO_POSTER}
          width={1920}
          height={1080}
          aria-label={t("videoTitle")}
          aria-describedby="inquiry-video-description"
          onPlay={() => setStarted(true)}
          onError={() => { setFailed(true); setStarted(false); }}
          className="h-full w-full object-contain"
        >
          <source src={INQUIRY_VIDEO_URL} type="video/mp4" />
          {t("videoUnsupported")}
        </video>
        {!started && !failed && (
          <button
            type="button"
            onClick={play}
            aria-label={t("playVideo")}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/35 px-5 text-foreground transition-colors hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-300 sm:gap-5"
          >
            <span className="flex size-16 items-center justify-center rounded-full border border-red-300/40 bg-primary shadow-xl shadow-black/25 transition-transform motion-safe:group-hover:scale-105 sm:size-20">
              <Play size={27} fill="currentColor" aria-hidden="true" className="ml-1" />
            </span>
            <span className="rounded-full border border-white/15 bg-background/95 px-4 py-2 text-xs font-medium leading-5 shadow-lg sm:text-sm">{t("playLabel")} <span className="px-1 text-support">·</span> 1:16</span>
          </button>
        )}
        {failed && (
          <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/95 px-5 text-center">
            <p className="max-w-md text-sm leading-6 text-neutral">{t("videoError")}</p>
            <a href={INQUIRY_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-red-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
              {t("openVideo")}<ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
      <p id="inquiry-video-description" className="border-t border-border bg-background/50 px-5 py-3 text-xs leading-6 text-support sm:px-7">{t("videoDescription")}</p>
    </div>
  );
}
