import "./globals.css";
import { Allerta, Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const allerta = Allerta({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allerta",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={cn("font-sans", inter.variable)}>
      <body className={allerta.variable}>{children}</body>
    </html>
  );
}