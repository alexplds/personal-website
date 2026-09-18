"use client";

import { useEffect, useRef, useState } from "react";
import type { Destination } from "@/lib/content";

type Mode = Destination["animation"] | null;

export function useLaunch() {
  const [mode, setMode] = useState<Mode>(null);
  const [href, setHref] = useState("");
  const [runId, setRunId] = useState(0);
  const [pendingNote, setPendingNote] = useState("");
  const labelRef = useRef("");

  function launch(dest: Destination) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    labelRef.current = dest.title;
    if (reduced) {
      finish(dest.href);
      return;
    }
    setHref(dest.href);
    setMode(dest.animation);
    setRunId((n) => n + 1);
  }

  function finish(url: string) {
    setMode(null);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setPendingNote("");
      return;
    }
    setPendingNote(
      `${labelRef.current} — send me the Mahara URL and I will wire this button. For now the lap still runs.`,
    );
  }

  return { mode, href, runId, pendingNote, launch, finish, clearNote: () => setPendingNote("") };
}

export function LaunchOverlay({
  mode,
  href,
  runId,
  onDone,
}: {
  mode: Mode;
  href: string;
  runId: number;
  onDone: (url: string) => void;
}) {
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!mode) return;
    const t = window.setTimeout(() => doneRef.current(href), mode === "tennis" ? 2300 : 1700);
    return () => window.clearTimeout(t);
  }, [mode, href, runId]);

  if (!mode) return null;

  return (
    <div
      className="no-print fixed inset-0 z-[80] overflow-hidden"
      role="dialog"
      aria-label={mode === "tennis" ? "Opening GoCourt" : "Opening portfolio"}
    >
      {mode === "tennis" ? <TennisScene /> : <F1Scene />}
    </div>
  );
}

function TennisScene() {
  return (
    <div className="relative flex h-full items-center justify-center bg-[#16351f]">
      <div className="court-lines pointer-events-none absolute inset-6 rounded-sm border-2 border-white/70 md:inset-16" />
      <div className="pointer-events-none absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-white/70" />
      <div className="pointer-events-none absolute top-6 bottom-6 left-1/2 w-0.5 -translate-x-1/2 bg-white/70 md:top-16 md:bottom-16" />
      <div className="tennis-ball-track" aria-hidden="true">
        <div className="tennis-ball-bounce">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/tennis-ball.png" alt="" className="tennis-ball-photo" />
        </div>
      </div>
      <p className="relative z-10 font-heading text-4xl text-white md:text-6xl">GoCourt.gr</p>
    </div>
  );
}

function F1Scene() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#111]">
      <div className="speed-lines" aria-hidden="true" />
      <div className="checkered-bar" aria-hidden="true" />
      <div className="f1-car" aria-hidden="true">
        <svg viewBox="0 0 200 56" className="h-10 w-auto">
          <path
            d="M22 34 H58 L72 22 H118 L138 34 H176 L170 42 H30 Z"
            fill="#e10600"
            stroke="#8a0400"
            strokeWidth="1.5"
          />
          <rect x="86" y="16" width="28" height="12" rx="2" fill="#1a1a1a" />
          <circle cx="56" cy="44" r="8" fill="#222" stroke="#eee" strokeWidth="2" />
          <circle cx="150" cy="44" r="8" fill="#222" stroke="#eee" strokeWidth="2" />
          <path d="M138 34 H172" stroke="#ffb3b3" strokeWidth="2" />
        </svg>
      </div>
      <p className="relative z-10 text-sm tracking-[0.2em] text-white/80 uppercase">
        Opening portfolio
      </p>
    </div>
  );
}

export function PendingNote({
  note,
  onClose,
}: {
  note: string;
  onClose: () => void;
}) {
  if (!note) return null;
  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-sm rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-lg">
      <p>{note}</p>
      <button type="button" className="mt-2 text-xs underline" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
