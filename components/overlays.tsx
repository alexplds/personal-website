"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    const wait = reduced ? 700 : 2100;
    const t = window.setTimeout(() => doneRef.current(href), wait);
    return () => window.clearTimeout(t);
  }, [mode, href, runId]);

  if (!mode) return null;

  return createPortal(
    <div
      className="no-print fixed inset-0 z-[80] overflow-hidden"
      role="dialog"
      aria-label={mode === "tennis" ? "Opening GoCourt" : "Opening portfolio"}
    >
      {mode === "tennis" ? <TennisScene /> : <F1Scene />}
    </div>,
    document.body,
  );
}

function TennisScene() {
  return (
    <div className="f1-loader-scene">
      <div className="f1-loader-card" aria-hidden="true">
        <div className="f1-loader">
          <svg className="f1-loader-ring" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="29" className="f1-loader-track" />
            <circle cx="32" cy="32" r="29" className="f1-loader-head" />
          </svg>
          <div className="f1-loader-clip">
            <svg
              viewBox="0 0 24 24"
              className="f1-loader-ball"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M5.1 4.8a10 10 0 0 1 0 14.4" />
              <path d="M18.9 4.8a10 10 0 0 0 0 14.4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function F1Scene() {
  return (
    <div className="f1-loader-scene">
      <div className="f1-loader-card" aria-hidden="true">
        <div className="f1-loader">
          <svg className="f1-loader-ring" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="29" className="f1-loader-track" />
            <circle cx="32" cy="32" r="29" className="f1-loader-head" />
          </svg>
          <div className="f1-loader-clip">
            <svg
              viewBox="0 0 56 22"
              className="f1-loader-car"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g transform="matrix(-1 0 0 1 56 0)">
                <circle cx="14.2" cy="16.4" r="3.35" />
                <circle cx="39.2" cy="16.4" r="3.35" />
                <path d="M3 13.1h8.4L16.8 7.1h16.6L40 13.1h6.2" />
                <path d="M3 13.1v2.7h6.4" />
                <path d="M19.4 7.1c1.7-3.3 10.8-3.3 12.5 0" />
                <path d="M46.2 13.1V4.5" />
                <path d="M43.6 4.5h8.4" />
                <path d="M44.2 6.7h6.6" />
              </g>
            </svg>
          </div>
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
  return createPortal(
    <div className="fixed right-4 bottom-4 z-50 max-w-sm rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-lg">
      <p>{note}</p>
      <button type="button" className="mt-2 text-xs underline" onClick={onClose}>
        Close
      </button>
    </div>,
    document.body,
  );
}
