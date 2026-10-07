"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { content } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function close() {
      setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    function onResize() {
      if (window.matchMedia("(min-width: 900px)").matches) close();
    }
    window.addEventListener("hashchange", close);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={`no-print sticky top-0 z-40 backdrop-blur-md ${open ? "bg-background" : "bg-background/85"}`}
    >
      <div className="page-wrap relative flex h-14 items-center justify-between gap-3">
        <a href="#top" className="header-brand text-sm font-medium tracking-tight">
          {content.shortName}
        </a>
        <nav className="header-nav" aria-label="Sections">
          {content.nav.map((item, index) => (
            <a key={item.href} href={item.href} className="header-nav-link">
              <span className="header-nav-index">{String(index + 1).padStart(2, "0")} /</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-socials">
          <a
            className="header-social"
            href={content.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInMark />
          </a>
          <a className="header-social" href={`mailto:${content.email}`} aria-label="Email">
            <Mail />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="header-social mobile-nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-section-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <>
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav id="mobile-section-nav" className="mobile-nav-panel" aria-label="Sections">
            {content.nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                <span className="header-nav-index">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </>
      ) : null}
    </header>
  );
}
