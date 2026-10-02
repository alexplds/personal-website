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
    const wait = reduced ? 700 : mode === "tennis" ? 2300 : 2100;
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
        <div className="f1-loader-clip">
          <svg viewBox="0 0 140 48" className="f1-loader-car">
            <path d="M4 31h22l3 3.5H6z" fill="#ff4d4d" />
            <path
              d="M18 30.5 40 20.5h34l16 10 20 .8-2.5 8.2H28z"
              fill="#e10600"
            />
            <path d="M40 20.5h22l-4 10H36z" fill="#ff2d2d" />
            <rect x="56" y="13" width="24" height="11" rx="4.5" fill="#111" />
            <path
              d="M54 22c8-12 28-12 36 0"
              fill="none"
              stroke="#f3f1ea"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <rect x="108" y="8" width="22" height="4" rx="1.4" fill="#e10600" />
            <rect x="126" y="8" width="4.2" height="22" rx="1.2" fill="#c10800" />
            <rect x="108" y="26" width="20" height="3" rx="1" fill="#ff5a5a" />
            <circle cx="38" cy="37.5" r="8.4" fill="#141414" stroke="#f3f1ea" strokeWidth="2.3" />
            <circle cx="38" cy="37.5" r="3.1" fill="#6a6a6a" />
            <circle cx="104" cy="37.5" r="8.4" fill="#141414" stroke="#f3f1ea" strokeWidth="2.3" />
            <circle cx="104" cy="37.5" r="3.1" fill="#6a6a6a" />
          </svg>
        </div>
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
