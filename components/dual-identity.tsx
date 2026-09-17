"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EngineerColumn } from "@/components/engineer-column";
import { MakerColumn } from "@/components/maker-column";

export function DualIdentity() {
  const [split, setSplit] = useState(50);
  const [isLg, setIsLg] = useState(false);
  const dragging = useRef(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsLg(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      setVisible(el.getBoundingClientRect().top < window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = useCallback((clientX: number) => {
    if (!dragging.current) return;
    const next = (clientX / window.innerWidth) * 100;
    if (next >= 30 && next <= 70) setSplit(next);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => onMove(e.clientX);
    const up = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [onMove]);

  function sync(source: HTMLDivElement, target: HTMLDivElement) {
    if (syncing.current) return;
    const max = source.scrollHeight - source.clientHeight;
    if (max <= 0) return;
    syncing.current = true;
    const pct = source.scrollTop / max;
    const tMax = target.scrollHeight - target.clientHeight;
    target.scrollTop = pct * Math.max(tMax, 0);
    requestAnimationFrame(() => {
      syncing.current = false;
    });
  }

  return (
    <section ref={sectionRef} id="work" className="relative min-h-screen lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen flex-col lg:h-full lg:flex-row">
        <div
          ref={leftRef}
          className="grid-texture relative min-h-screen overflow-y-auto border-white/5 px-6 py-16 md:px-12 lg:h-full lg:border-r"
          style={isLg ? { flex: `0 0 ${split}%` } : { flex: "1 1 auto" }}
          onScroll={() => {
            if (isLg && leftRef.current && rightRef.current) {
              sync(leftRef.current, rightRef.current);
            }
          }}
        >
          <EngineerColumn />
        </div>
        <div
          ref={rightRef}
          className="grid-texture relative min-h-screen overflow-y-auto px-6 py-16 md:px-12 lg:h-full"
          style={isLg ? { flex: `0 0 ${100 - split}%` } : { flex: "1 1 auto" }}
          onScroll={() => {
            if (isLg && leftRef.current && rightRef.current) {
              sync(rightRef.current, leftRef.current);
            }
          }}
        >
          <MakerColumn />
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 z-20 hidden lg:flex ${
          visible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
        style={{ left: `${split}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-px bg-gradient-to-b from-transparent via-tech/70 to-gold/80" />
        <button
          type="button"
          aria-label="Resize columns"
          onMouseDown={(e) => {
            dragging.current = true;
            document.body.style.cursor = "ew-resize";
            e.preventDefault();
          }}
          className="handle-glow pointer-events-auto absolute top-[28vh] left-1/2 flex size-8 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full bg-gradient-to-br from-tech to-gold text-xs font-bold text-background"
        >
          ⟷
        </button>
      </div>
    </section>
  );
}
