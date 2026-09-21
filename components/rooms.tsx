"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { IntersectionSection } from "@/components/destinations";
import { content } from "@/lib/content";

const MIN = 28;
const MAX = 72;
const START = 50;
const MIX_MS = 720;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RoomsSplit({
  desk,
  court,
}: {
  desk: ReactNode;
  court: ReactNode;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>(0);
  const [pct, setPct] = useState(START);
  const [dragging, setDragging] = useState(false);
  const [layer, setLayer] = useState(false);
  const [spread, setSpread] = useState(false);

  const setMix = useCallback((next: boolean, instant = false) => {
    window.clearTimeout(closeTimer.current);

    if (next) {
      setLayer(true);
      if (instant || prefersReducedMotion()) {
        setSpread(true);
      } else {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setSpread(true));
        });
      }
      if (window.location.hash !== "#play") {
        history.replaceState(null, "", "#play");
      }
      return;
    }

    setSpread(false);
    if (instant || prefersReducedMotion()) {
      setLayer(false);
    } else {
      closeTimer.current = window.setTimeout(() => setLayer(false), MIX_MS);
    }
    if (window.location.hash === "#play") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.setTimeout(() => openRef.current?.focus(), instant ? 0 : 80);
  }, []);

  useEffect(() => {
    function onHash() {
      if (window.location.hash === "#play") setMix(true);
      else {
        setSpread(false);
        setLayer(false);
      }
    }
    if (window.location.hash === "#play") queueMicrotask(() => setMix(true, true));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [setMix]);

  useEffect(() => {
    if (!spread) return;
    backRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMix(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spread, setMix]);

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  const moveTo = useCallback((clientX: number) => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    if (rect.width < 8) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(MAX, Math.max(MIN, next)));
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (layer || window.innerWidth < 960) return;
    event.preventDefault();
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    moveTo(event.clientX);
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (layer) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPct((n) => Math.max(MIN, n - 3));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPct((n) => Math.min(MAX, n + 3));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPct(START);
    }
  }

  const boardClass = [
    "rooms-board",
    dragging ? "rooms-board-dragging" : "",
    layer ? "is-mixing" : "",
    spread ? "is-mixed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="rooms-band" aria-label="Desk, court, and intersection">
      <div className="rooms-intro">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Rooms</p>
        <h2 className="font-heading mt-2 text-3xl">Desk and court</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Drag the seam left or right. The button on the seam mixes the two rooms into GoCourt.
        </p>
      </div>

      <div
        ref={boardRef}
        className={boardClass}
        style={{ "--desk": `${pct}%` } as CSSProperties}
      >
        <div id="work" className="rooms-pane rooms-desk scroll-mt-20">
          <p className="rooms-label">Desk</p>
          {desk}
        </div>

        <div
          role="separator"
          tabIndex={layer ? -1 : 0}
          className="rooms-seam"
          aria-hidden={layer}
          aria-label="Resize desk and court"
          aria-orientation="vertical"
          aria-controls="work"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={`${Math.round(pct)} percent desk`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={() => setPct(START)}
          onKeyDown={onKeyDown}
        >
          <button
            ref={openRef}
            type="button"
            className="rooms-open"
            onClick={() => setMix(true)}
            onPointerDown={(event) => event.stopPropagation()}
            tabIndex={layer ? -1 : 0}
          >
            <span className="rooms-open-kicker">Open</span>
            Intersection
          </button>
        </div>

        <div className="rooms-pane rooms-court scroll-mt-20">
          <p className="rooms-label">Court</p>
          {court}
        </div>

        <div className="rooms-mixer" aria-hidden="true">
          <div className="rooms-mixer-desk" />
          <div className="rooms-mixer-court" />
        </div>

        <div
          id="play"
          className="rooms-mix"
          role="region"
          aria-hidden={!spread}
          inert={spread ? undefined : true}
          aria-label="Intersection — GoCourt"
        >
          <button ref={backRef} type="button" className="rooms-back" onClick={() => setMix(false)}>
            <span aria-hidden="true">←</span> Back
          </button>
          <p className="rooms-label">Intersection</p>
          <h2 className="font-heading text-3xl md:text-4xl">GoCourt</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
            {content.intersection}
          </p>
          <IntersectionSection embedded />
        </div>
      </div>
    </section>
  );
}
