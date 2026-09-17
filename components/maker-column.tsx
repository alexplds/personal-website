"use client";

import { site } from "@/lib/site";
import { PortfolioGrid } from "@/components/portfolio-grid";

export function MakerColumn() {
  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col gap-14">
      <header className="section-enter">
        <h2 className="font-heading bg-gradient-to-br from-gold to-gold-light bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-5xl">
          {site.maker.title}
        </h2>
        <p className="mt-3 text-base tracking-wide text-muted-foreground">
          {site.maker.subtitle}
        </p>
        <blockquote className="relative mt-8 overflow-hidden rounded-md border-l-[3px] border-gold bg-[rgb(45_35_20/0.3)] px-5 py-5">
          <p className="text-[1.05rem] leading-relaxed text-muted-foreground italic">
            {site.maker.statement}
          </p>
        </blockquote>
      </header>

      <section className="section-enter" style={{ animationDelay: "0.15s" }}>
        <PortfolioGrid />
      </section>

      <section className="section-enter" style={{ animationDelay: "0.25s" }}>
        <h2 className="font-heading mb-4 text-xl font-medium tracking-wide text-gold">
          How I work
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            I start with the person who has to use the thing. Then I cut scope until the first
            version can be shown, not described. The rest is iteration with a paper trail.
          </p>
          <p>
            On a team I am the person who will write the interface, the data shape, and the
            README — and who will argue for deleting a feature that does not earn its keep.
          </p>
        </div>
      </section>

      <section className="section-enter pb-10" style={{ animationDelay: "0.35s" }}>
        <h2 className="font-heading mb-5 text-xl font-medium tracking-wide text-gold">Now</h2>
        <ul className="space-y-4">
          {site.now.map((item) => (
            <li
              key={item.label}
              className="rounded-md border border-gold/15 bg-white/[0.02] px-4 py-3"
            >
              <p className="text-xs tracking-wide text-gold uppercase">{item.label}</p>
              <p className="mt-1 text-sm text-foreground/90">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
