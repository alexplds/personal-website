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
              className={`group relative w-full overflow-hidden rounded-2xl border px-5 py-8 text-left transition hover:-translate-y-1 ${
                dest.animation === "tennis"
                  ? "court-card border-[#2f6b3c]/40"
                  : "track-card border-[rgb(212_168_40)]/30"
              }`}
            >
              <p className="text-xs tracking-wide uppercase opacity-70">{dest.kicker}</p>
              <p className="font-heading mt-2 text-2xl">{dest.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{dest.hint}</p>
              <span className="mt-6 inline-block text-sm underline underline-offset-4">Open</span>
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
