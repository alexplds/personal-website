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
    labelRef.current = dest.title;
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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduced ? 700 : mode === "tennis" ? 2300 : 1100;
    const t = window.setTimeout(() => doneRef.current(href), wait);
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
    <div className="f1-loader-scene">
      <div className="f1-loader" aria-hidden="true">
        <span className="f1-loader-ring" />
        <svg viewBox="0 0 160 48" className="f1-loader-car">
          <path d="M10 28h36l10-10h42l16 10h32l-6 8H18z" fill="#e10600" />
          <rect x="68" y="12" width="26" height="10" rx="2" fill="#1a1a1a" />
          <path d="M136 16h16v16h-8z" fill="#e10600" />
          <circle cx="44" cy="38" r="7" fill="#222" stroke="#eee" strokeWidth="1.8" />
          <circle cx="122" cy="38" r="7" fill="#222" stroke="#eee" strokeWidth="1.8" />
        </svg>
      </div>
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
