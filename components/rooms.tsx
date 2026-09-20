"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { IntersectionSection } from "@/components/destinations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { content } from "@/lib/content";

const MIN = 28;
const MAX = 72;
const START = 50;

export function RoomsSplit({
  desk,
  court,
}: {
  desk: ReactNode;
  court: ReactNode;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(START);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function sync() {
      if (window.location.hash === "#play") setOpen(true);
    }
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function setDialog(next: boolean) {
    setOpen(next);
    if (!next && window.location.hash === "#play") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (next && window.location.hash !== "#play") {
      history.replaceState(null, "", "#play");
    }
  }

  const moveTo = useCallback((clientX: number) => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    if (rect.width < 8) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(MAX, Math.max(MIN, next)));
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (window.innerWidth < 960) return;
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

  return (
    <section className="rooms-band" aria-label="Desk, court, and intersection">
      <div className="rooms-intro">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Rooms</p>
        <h2 className="font-heading mt-2 text-3xl">Desk and court</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Drag the seam left or right. The small purple button in the middle opens the intersection.
        </p>
      </div>

      <div
        ref={boardRef}
        className={`rooms-board${dragging ? " rooms-board-dragging" : ""}`}
        style={{ "--desk": `${pct}%` } as CSSProperties}
      >
        <div id="work" className="rooms-pane rooms-desk scroll-mt-20">
          <p className="rooms-label">Desk</p>
          {desk}
        </div>

        <div
          role="separator"
          tabIndex={0}
          className="rooms-seam"
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
            type="button"
            className="rooms-open"
            onClick={() => setDialog(true)}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <span className="rooms-open-kicker">Open</span>
            Intersection
          </button>
        </div>

        <div className="rooms-pane rooms-court scroll-mt-20">
          <p className="rooms-label">Court</p>
          {court}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setDialog}>
        <DialogContent className="rooms-intersection-dialog sm:max-w-2xl" showCloseButton>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Intersection</DialogTitle>
            <DialogDescription className="text-[15px] leading-relaxed">
              {content.intersection}
            </DialogDescription>
          </DialogHeader>
          <IntersectionSection embedded />
        </DialogContent>
      </Dialog>
    </section>
  );
}
