"use client";

import { useEffect, useRef } from "react";
import { IntersectionSection } from "@/components/destinations";
import { IntroCode } from "@/components/intro-code";
import { Sports } from "@/components/sports";
import { content } from "@/lib/content";

// Must match the pinned .story media query in globals.css.
const PINNED_QUERY =
  "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

const GOCOURT_AT = 0.98;

// Points where a fast scroll is caught and briefly held: the pinned desk/court
// halves, and the fully revealed GoCourt panel.
const STOPS = [0, 0.76];
// A hold lasts until the wheel goes quiet (momentum spent), within these bounds.
const HOLD_MIN = 380;
const HOLD_MAX = 900;
const HOLD_QUIET = 160;
// Only wheel steps at least this big count as a hard scroll worth catching.
const FAST_DELTA = 30;

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smooth(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function RoomsStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const halvesRef = useRef<HTMLDivElement>(null);
  const gocourtRef = useRef<HTMLDivElement>(null);
  const blendRef = useRef<HTMLParagraphElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    const stickyNode = stickyRef.current;
    const halvesNode = halvesRef.current;
    const gocourtNode = gocourtRef.current;
    const blendNode = blendRef.current;
    const resultNode = resultRef.current;
    const hintNode = hintRef.current;
    if (
      !sectionNode ||
      !stickyNode ||
      !halvesNode ||
      !gocourtNode ||
      !blendNode ||
      !resultNode ||
      !hintNode
    ) {
      return;
    }
    const section: HTMLElement = sectionNode;
    const sticky: HTMLDivElement = stickyNode;
    const halves: HTMLDivElement = halvesNode;
    const gocourt: HTMLDivElement = gocourtNode;
    const blend: HTMLParagraphElement = blendNode;
    const result: HTMLDivElement = resultNode;
    const hint: HTMLParagraphElement = hintNode;

    const query = window.matchMedia(PINNED_QUERY);
    let pinned = false;
    let frame = 0;

    function measure() {
      const rect = section.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const travel = rect.height - sticky.offsetHeight;
      return {
        progress: travel > 0 ? clamp((top - rect.top) / travel) : 0,
        visible: rect.bottom > 0 && rect.top < window.innerHeight,
      };
    }

    function render() {
      frame = 0;
      if (!pinned) return;
      const { progress } = measure();
      const meet = smooth(0.04, 0.36, progress);
      const fade = smooth(0.16, 0.34, progress);
      const green = smooth(0.34, 0.58, progress);
      const line = smooth(0.3, 0.46, progress);
      const reveal = smooth(0.52, 0.74, progress);

      halves.style.opacity = String(1 - fade);
      hint.style.opacity = String(1 - fade);
      gocourt.style.opacity = String(Math.max(line, reveal));
      blend.style.opacity = line.toFixed(3);
      result.style.opacity = reveal.toFixed(3);
      result.style.transform = `translateY(${((1 - reveal) * 14).toFixed(1)}px)`;
      sticky.style.setProperty("--story-meet", meet.toFixed(3));
      sticky.style.setProperty("--story-green", green.toFixed(3));
      sticky.dataset.phase = reveal > 0.55 ? "gocourt" : fade > 0.35 ? "mix" : "halves";
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    let holdStart = 0;
    let lastWheel = 0;

    function stopY(at: number) {
      const rect = section.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const travel = rect.height - sticky.offsetHeight;
      return window.scrollY + rect.top - top + travel * at;
    }

    function onWheel(event: WheelEvent) {
      if (!pinned || event.ctrlKey) return;
      const now = performance.now();
      const sinceLast = now - lastWheel;
      lastWheel = now;

      if (holdStart) {
        const held = now - holdStart;
        if (held < HOLD_MAX && (held < HOLD_MIN || sinceLast < HOLD_QUIET)) {
          event.preventDefault();
          return;
        }
        holdStart = 0;
      }

      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const delta = event.deltaY * unit;
      if (Math.abs(delta) < FAST_DELTA) return;
      const from = window.scrollY;
      const to = from + delta;
      for (const at of STOPS) {
        const y = stopY(at);
        const crosses = (from < y - 1 && to > y) || (from > y + 1 && to < y);
        if (crosses) {
          event.preventDefault();
          window.scrollTo({ top: y, behavior: "instant" });
          holdStart = now;
          return;
        }
      }
    }

    function goTo(at: number) {
      if (!pinned) {
        (at > 0.5 ? gocourt : halves).scrollIntoView();
        return;
      }
      const rect = section.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const travel = rect.height - sticky.offsetHeight;
      window.scrollTo({ top: window.scrollY + rect.top - top + travel * at });
    }

    function setMode() {
      pinned = query.matches;
      if (pinned) {
        schedule();
        return;
      }
      halves.style.opacity = "";
      hint.style.opacity = "";
      gocourt.style.opacity = "";
      gocourt.style.transform = "";
      blend.style.opacity = "";
      result.style.opacity = "";
      result.style.transform = "";
      sticky.style.removeProperty("--story-meet");
      sticky.style.removeProperty("--story-green");
      delete sticky.dataset.phase;
    }

    function onFocus(event: FocusEvent) {
      if (!pinned) return;
      const target = event.target as Node;
      if (gocourt.contains(target) && sticky.dataset.phase !== "gocourt")
        goTo(GOCOURT_AT);
      else if (halves.contains(target) && sticky.dataset.phase !== "halves") goTo(0);
    }

    function onHash() {
      if (window.location.hash === "#play") goTo(GOCOURT_AT);
    }

    const resizeObserver = new ResizeObserver(schedule);

    setMode();
    onHash();
    resizeObserver.observe(sticky);
    query.addEventListener("change", setMode);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("hashchange", onHash);
    section.addEventListener("focusin", onFocus);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      query.removeEventListener("change", setMode);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("hashchange", onHash);
      section.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="story"
      aria-label="Desk, court, and GoCourt"
    >
      <div ref={stickyRef} className="story-sticky">
        <div className="story-backdrop" aria-hidden="true">
          <span className="story-glow story-glow-desk" />
          <span className="story-glow story-glow-court" />
          <span className="story-glow story-glow-green" />
        </div>

        <div ref={halvesRef} className="story-halves">
          <div id="work" className="story-half story-desk">
            <div className="story-half-inner">
              <p className="section-kicker">01 / About · Desk</p>
              <h2 className="font-heading story-half-title">
                Engineer / Computer Scientist
              </h2>
              <IntroCode />
            </div>
          </div>
          <div className="story-half story-court">
            <div className="story-half-inner">
              <p className="section-kicker">Court</p>
              <h2 className="font-heading story-half-title">Personal life</h2>
              <Sports />
            </div>
          </div>
        </div>

        <div ref={gocourtRef} className="story-gocourt">
          <div className="story-half-inner">
            <p ref={blendRef} className="story-blend-line">
              <span className="story-blend-desk">Engineering</span>
              <span className="story-blend-plus" aria-hidden="true">
                +
              </span>
              <span className="story-blend-court">Personal life</span>
            </p>
            <div ref={resultRef} className="story-result-block">
              <h2 className="font-heading story-half-title">GoCourt</h2>
              <p className="story-result">The result of the two.</p>
              <div className="story-gocourt-card">
                <p className="story-gocourt-copy">{content.intersection}</p>
              </div>
              <IntersectionSection />
            </div>
          </div>
        </div>

        <p ref={hintRef} className="story-hint" aria-hidden="true">
          Scroll to mix
        </p>
      </div>
    </section>
  );
}
