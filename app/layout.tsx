import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { content } from "@/lib/content";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const heading = Source_Serif_4({
  variable: "--font-heading-loaded",
  subsets: ["latin"],
  weight: ["600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${heading.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
