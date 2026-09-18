"use client";

import { useEffect, useRef, useState } from "react";
import type { Destination } from "@/lib/content";

type Mode = Destination["animation"] | null;

export function useLaunch() {
  const [mode, setMode] = useState<Mode>(null);
  const [href, setHref] = useState("");
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

  return { mode, href, pendingNote, launch, finish, clearNote: () => setPendingNote("") };
}

export function LaunchOverlay({
  mode,
  href,
  onDone,
}: {
  mode: Mode;
  href: string;
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
  }, [mode, href]);

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
          <div className="tennis-ball" />
        </div>
      </div>
      <p className="relative z-10 font-heading text-4xl text-white md:text-6xl">GoCourt.gr</p>
    </div>
  );
}

function F1Scene() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="speed-lines" aria-hidden="true" />
      <div className="checkered-bar" aria-hidden="true" />
      <div className="f1-car" aria-hidden="true">
        <svg viewBox="0 0 220 70" className="h-16 w-auto md:h-20">
          <polygon points="20,40 70,28 150,28 200,40 190,50 30,50" fill="#e10600" />
          <rect x="95" y="16" width="36" height="16" rx="3" fill="#1a1a1a" />
          <circle cx="58" cy="52" r="12" fill="#222" stroke="#f3f1ea" strokeWidth="3" />
          <circle cx="168" cy="52" r="12" fill="#222" stroke="#f3f1ea" strokeWidth="3" />
          <polygon points="150,28 200,40 188,28" fill="#ff4d4d" />
        </svg>
      </div>
      <p className="relative z-10 font-heading text-3xl text-white md:text-5xl">Portfolio</p>
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
