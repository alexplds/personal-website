"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowDownIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export function Hero() {
  const links = [
    site.social.linkedin
      ? { href: site.social.linkedin, label: "LinkedIn", icon: LinkedInIcon }
      : null,
    site.social.github
      ? { href: site.social.github, label: "GitHub", icon: GitHubIcon }
      : null,
    { href: site.social.email, label: "Email", icon: MailIcon },
  ].filter(Boolean) as { href: string; label: string; icon: typeof MailIcon }[];

  return (
    <section className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #0f1116 0%, #14171f 35%, #1a1f2e 70%, #1f2a3f 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-b from-transparent via-background/40 to-background/80"
      />

      <nav className="absolute top-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className="text-white/40 transition hover:-translate-y-0.5 hover:text-tech"
          >
            <link.icon className="size-[18px]" />
          </a>
        ))}
      </nav>

      <Link
        href="/cv"
        className="absolute top-8 right-6 z-10 rounded border border-white/20 bg-gradient-to-br from-tech/15 to-gold/15 px-5 py-2.5 text-sm font-medium tracking-wide text-foreground backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/50 hover:shadow-[0_4px_12px_rgb(168_201_209/0.2)] md:right-8"
      >
        Download CV
      </Link>

      <div className="hero-enter relative z-10 text-center">
        <h1 className="font-heading text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white">
          {site.firstName}
        </h1>
        <p className="font-heading mt-2 text-[clamp(1rem,3vw,2rem)] font-light tracking-[0.15em] text-[#999]">
          {site.lastName}
        </p>
        <p className="mt-6 text-[clamp(0.75rem,1.5vw,0.95rem)] font-medium tracking-[0.28em] text-[#666] uppercase">
          {site.tagline}
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-10 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[0.8rem] font-medium tracking-[0.2em] text-teal/70 uppercase">
          Scroll to explore
        </span>
        <span className="scroll-bounce flex size-14 items-center justify-center rounded-full border-2 border-teal/30 bg-teal/10 text-teal/80 shadow-[0_0_20px_rgb(129_230_217/0.12)]">
          <ArrowDownIcon className="size-7" />
        </span>
      </button>
    </section>
  );
}
