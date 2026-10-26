import type { Metadata } from "next";
import "./globals.css";
import { readSiteUrl } from "@/config/site";
export const metadata: Metadata = {
  title: "Diovis – Software, Automatisierung & IT",
  applicationName: "Diovis",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  ...(readSiteUrl() ? { metadataBase: readSiteUrl()! } : {}),
};

// The locale segment owns html/body for static HTML and client navigation.
// The root 404 provides its own localized document.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
