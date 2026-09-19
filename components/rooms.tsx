"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { GripVerticalIcon } from "lucide-react";

const MIN = 30;
const MAX = 70;
const START = 56;

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

  const moveTo = useCallback((clientX: number) => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    if (rect.width < 8) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(MAX, Math.max(MIN, next)));
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (window.innerWidth < 960) return;
    event.preventDefault();
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging) return;
    moveTo(event.clientX);
  }

  function endDrag(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging) return;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
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
    <section className="rooms-band" aria-label="Desk and court">
      <div className="rooms-intro">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Rooms</p>
        <h2 className="font-heading mt-2 text-3xl">Desk and court</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          One person, two rooms — not two identities. The job stays on the desk. GoCourt and the
          year portfolios live on the court. Drag the seam if you want more of one.
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

        <button
          type="button"
          role="separator"
          className="rooms-seam"
          aria-label="Resize desk and court"
          aria-orientation="vertical"
          aria-controls="work play"
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
          <span className="rooms-grip" aria-hidden="true">
            <GripVerticalIcon className="size-3.5" />
          </span>
        </button>

        <div id="play" className="rooms-pane rooms-court scroll-mt-20">
          <p className="rooms-label">Court</p>
          {court}
        </div>
      </div>
    </section>
  );
}
