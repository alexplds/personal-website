"use client";

import { content, type Destination } from "@/lib/content";
import { LaunchOverlay, PendingNote, useLaunch } from "@/components/overlays";
import { Reveal } from "@/components/reveal";

export function DestinationButtons({
  destinations,
  stacked = true,
}: {
  destinations: readonly Destination[];
  stacked?: boolean;
}) {
  const { mode, href, runId, pendingNote, launch, finish, clearNote } = useLaunch();

  return (
    <>
      <div className={`mt-8 grid gap-4 ${stacked ? "grid-cols-1" : "md:grid-cols-3"}`}>
        {destinations.map((dest, i) => (
          <Reveal key={dest.id} delay={i * 90}>
            <button
              type="button"
              onClick={() => launch(dest)}
              aria-label={`Visit ${dest.title} (opens in a new tab)`}
              className={`group relative w-full overflow-hidden rounded-2xl border px-5 py-5 text-left transition [@media(hover:hover)]:hover:-translate-y-1 ${
                dest.animation === "tennis"
                  ? "court-card border-[#2f6b3c]/40"
                  : "track-card border-[rgb(212_168_40)]/30"
              }`}
            >
              <span className="dest-arrow" aria-hidden="true">
                ↗
              </span>
              <p className="text-xs tracking-wide uppercase opacity-70">{dest.kicker}</p>
              <p className="font-heading mt-2 text-2xl">{dest.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{dest.hint}</p>
              <span className="cta-pill dest-cta mt-4">
                Visit {new URL(dest.href).hostname.replace(/^www\./, "")}
                <span aria-hidden="true">↗</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <LaunchOverlay key={runId} mode={mode} href={href} runId={runId} onDone={finish} />
      <PendingNote note={pendingNote} onClose={clearNote} />
    </>
  );
}

const court = content.destinations.filter((d) => d.animation === "tennis");

export function IntersectionSection() {
  return <DestinationButtons destinations={court} />;
}
