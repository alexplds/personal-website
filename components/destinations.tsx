"use client";

import { content } from "@/lib/content";
import { LaunchOverlay, PendingNote, useLaunch } from "@/components/overlays";
import { Reveal } from "@/components/reveal";

export function PlaySection() {
  const { mode, href, pendingNote, launch, finish, clearNote } = useLaunch();

  return (
    <section id="play" className="scroll-mt-20 px-5 py-16">
      <Reveal>
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Play</p>
        <h2 className="font-heading mt-2 text-3xl">Where the work lives</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          No write-up that tries to replace the thing itself. Press GoCourt for a rally, then the
          live site. Press a year for a lap, then the Mahara portfolio.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {content.destinations.map((dest, i) => (
          <Reveal key={dest.id} delay={i * 90}>
            <button
              type="button"
              onClick={() => launch(dest)}
              className={`group relative w-full overflow-hidden rounded-2xl border px-5 py-8 text-left transition hover:-translate-y-1 ${
                dest.animation === "tennis"
                  ? "court-card border-[#2f6b3c]/40"
                  : "track-card border-[#e10600]/30"
              }`}
            >
              <p className="text-xs tracking-wide uppercase opacity-70">{dest.kicker}</p>
              <p className="font-heading mt-2 text-2xl">{dest.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{dest.hint}</p>
              <span className="mt-6 inline-block text-sm underline underline-offset-4">
                {dest.href ? "Open" : "Open when the link is in"}
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <LaunchOverlay mode={mode} href={href} onDone={finish} />
      <PendingNote note={pendingNote} onClose={clearNote} />
    </section>
  );
}
