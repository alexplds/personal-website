"use client";

import { useEffect, useRef } from "react";
import { IntersectionSection } from "@/components/destinations";
import { IntroCode } from "@/components/intro-code";
import { Sports } from "@/components/sports";
import { content } from "@/lib/content";

// Must match the pinned .story media query in globals.css.
const PINNED_QUERY =
  "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
// Must match the vertical .story media query in globals.css.
const VERTICAL_QUERY = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";

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

function clampRange(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type StorySpan = { start: number; end: number; overflow: number };

type VerticalTimeline = {
  desk: StorySpan;
  mix1: StorySpan;
  court: StorySpan;
  mix2: StorySpan;
  gocourt: StorySpan;
  travel: number;
  viewH: number;
};

function spanT(span: StorySpan, y: number) {
  const length = span.end - span.start;
  if (length <= 0) return y >= span.end ? 1 : 0;
  return clamp((y - span.start) / length);
}

// Pan tall copy up during a reading beat, then hold at the end.
function readShift(span: StorySpan, y: number) {
  if (span.overflow <= 0) return 0;
  return -Math.min(span.overflow, Math.max(0, y - span.start));
}

function buildTimeline(
  viewH: number,
  deskH: number,
  courtH: number,
  goH: number,
): VerticalTimeline {
  const mix = Math.round(clampRange(viewH * 0.78, 280, 680));
  const restFor = (overflow: number) =>
    overflow > 12
      ? Math.round(Math.min(viewH * 0.16, 110))
      : Math.round(Math.min(viewH * 0.46, 360));

  let cursor = 0;
  const take = (overflow: number) => {
    const start = cursor;
    cursor += overflow + restFor(overflow);
    return { start, end: cursor, overflow };
  };
  const desk = take(Math.max(0, deskH - viewH));
  const mix1Start = cursor;
  cursor += mix;
  const mix1 = { start: mix1Start, end: cursor, overflow: 0 };
  const court = take(Math.max(0, courtH - viewH));
  const mix2Start = cursor;
  cursor += mix;
  const mix2 = { start: mix2Start, end: cursor, overflow: 0 };
  const gocourt = take(Math.max(0, goH - viewH));
  cursor += Math.round(Math.min(viewH * 0.08, 64));
  return { desk, mix1, court, mix2, gocourt, travel: cursor, viewH };
}

function smooth(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function RoomsStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const halvesRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const courtRef = useRef<HTMLDivElement>(null);
  const gocourtRef = useRef<HTMLDivElement>(null);
  const blendRef = useRef<HTMLParagraphElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    const stickyNode = stickyRef.current;
    const halvesNode = halvesRef.current;
    const deskNode = deskRef.current;
    const courtNode = courtRef.current;
    const gocourtNode = gocourtRef.current;
    const blendNode = blendRef.current;
    const resultNode = resultRef.current;
    const hintNode = hintRef.current;
    if (
      !sectionNode ||
      !stickyNode ||
      !halvesNode ||
      !deskNode ||
      !courtNode ||
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
    const desk: HTMLDivElement = deskNode;
    const court: HTMLDivElement = courtNode;
    const gocourt: HTMLDivElement = gocourtNode;
    const blend: HTMLParagraphElement = blendNode;
    const result: HTMLDivElement = resultNode;
    const hint: HTMLParagraphElement = hintNode;

    const query = window.matchMedia(PINNED_QUERY);
    const verticalQuery = window.matchMedia(VERTICAL_QUERY);
    const deskGlowNode = sticky.querySelector<HTMLElement>(".story-glow-desk");
    const courtGlowNode = sticky.querySelector<HTMLElement>(".story-glow-court");
    const greenGlowNode = sticky.querySelector<HTMLElement>(".story-glow-green");
    if (!deskGlowNode || !courtGlowNode || !greenGlowNode) return;
    const deskGlowEl: HTMLElement = deskGlowNode;
    const courtGlowEl: HTMLElement = courtGlowNode;
    const greenGlowEl: HTMLElement = greenGlowNode;

    let pinned = false;
    let vertical = false;
    let frame = 0;
    let verticalTimeline: VerticalTimeline | null = null;
    let cachedStickyTop = 0;
    let rebuildWindow = 0;
    let rebuildCount = 0;

    function measure() {
      const rect = section.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const travel = rect.height - sticky.offsetHeight;
      return {
        progress: travel > 0 ? clamp((top - rect.top) / travel) : 0,
        visible: rect.bottom > 0 && rect.top < window.innerHeight,
      };
    }

    function renderPinned() {
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

    function place(el: HTMLElement, shift: number, opacity: number) {
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      el.style.opacity = opacity.toFixed(3);
    }

    function renderVertical() {
      const timeline = verticalTimeline;
      if (!timeline) return;
      const rectTop = section.getBoundingClientRect().top;
      const y = clampRange(cachedStickyTop - rectTop, 0, timeline.travel);
      const lift = Math.min(84, timeline.viewH * 0.12);

      let deskOpacity = 1;
      let deskShift = readShift(timeline.desk, y);
      if (y >= timeline.mix1.end) {
        deskOpacity = 0;
        deskShift = -timeline.desk.overflow - lift;
      } else if (y >= timeline.mix1.start) {
        const t = spanT(timeline.mix1, y);
        const fade = smooth(0.02, 0.52, t);
        deskOpacity = 1 - fade;
        deskShift = -timeline.desk.overflow - fade * lift;
      }

      let courtOpacity = 0;
      let courtShift = lift;
      if (y >= timeline.mix2.end) {
        courtOpacity = 0;
        courtShift = -timeline.court.overflow - lift;
      } else if (y >= timeline.mix2.start) {
        const t = spanT(timeline.mix2, y);
        const fade = smooth(0, 0.58, t);
        courtOpacity = 1 - fade;
        courtShift = -timeline.court.overflow - fade * lift;
      } else if (y >= timeline.court.start) {
        courtOpacity = 1;
        courtShift = readShift(timeline.court, y);
      } else if (y >= timeline.mix1.start) {
        const t = spanT(timeline.mix1, y);
        courtOpacity = smooth(0.16, 0.72, t);
        courtShift = (1 - smooth(0.1, 0.78, t)) * lift;
      }

      const mix2T = y < timeline.mix2.start ? 0 : spanT(timeline.mix2, y);
      const line = y < timeline.mix2.start ? 0 : smooth(0.14, 0.58, mix2T);
      const reveal = y < timeline.mix2.start ? 0 : smooth(0.4, 0.94, mix2T);
      const gocourtOpacity = y >= timeline.mix2.end ? 1 : Math.max(line, reveal);
      let gocourtShift = (1 - (y >= timeline.mix2.end ? 1 : reveal)) * Math.min(22, lift);
      if (y >= timeline.gocourt.start) gocourtShift = readShift(timeline.gocourt, y);

      place(desk, deskShift, deskOpacity);
      place(court, courtShift, courtOpacity);
      place(gocourt, gocourtShift, gocourtOpacity);
      blend.style.opacity = (y >= timeline.mix2.end ? 1 : line).toFixed(3);
      result.style.opacity = (y >= timeline.mix2.end ? 1 : reveal).toFixed(3);
      result.style.transform = `translate3d(0, ${((1 - (y >= timeline.mix2.end ? 1 : reveal)) * 14).toFixed(1)}px, 0)`;

      desk.style.pointerEvents = deskOpacity > 0.55 ? "auto" : "none";
      court.style.pointerEvents = courtOpacity > 0.55 ? "auto" : "none";
      gocourt.style.pointerEvents = gocourtOpacity > 0.55 ? "auto" : "none";

      let meet = 0;
      let deskGlow = 1;
      let courtGlow = 0;
      let green = 0;
      if (y >= timeline.mix2.end) {
        meet = 1;
        deskGlow = 0;
        courtGlow = 0;
        green = 1;
      } else if (y >= timeline.mix2.start) {
        const t = spanT(timeline.mix2, y);
        meet = 1;
        deskGlow = 0;
        courtGlow = 1 - smooth(0.02, 0.7, t);
        green = smooth(0.08, 0.88, t);
      } else if (y >= timeline.court.start) {
        meet = 1;
        deskGlow = 0;
        courtGlow = 1;
        green = 0;
      } else if (y >= timeline.mix1.start) {
        const t = spanT(timeline.mix1, y);
        meet = smooth(0.05, 0.55, t);
        deskGlow = 1 - smooth(0.08, 0.72, t);
        courtGlow = smooth(0.16, 0.78, t);
        const rise = smooth(0.1, 0.42, t);
        const fall = 1 - smooth(0.55, 0.92, t);
        green = rise * fall * 0.82;
      }

      hint.style.opacity = (
        1 - smooth(timeline.viewH * 0.04, timeline.viewH * 0.28, y)
      ).toFixed(3);
      const glowTravel = timeline.viewH * 0.2;
      deskGlowEl.style.opacity = deskGlow.toFixed(3);
      deskGlowEl.style.transform = `translate3d(0, ${(meet * glowTravel).toFixed(1)}px, 0)`;
      courtGlowEl.style.opacity = courtGlow.toFixed(3);
      courtGlowEl.style.transform = `translate3d(0, ${(-meet * glowTravel).toFixed(1)}px, 0)`;
      greenGlowEl.style.opacity = green.toFixed(3);
    }

    function clearPinnedInline() {
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

    function clearVerticalInline() {
      section.style.height = "";
      delete section.dataset.story;
      for (const el of [desk, court, gocourt, hint]) {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.pointerEvents = "";
      }
      blend.style.opacity = "";
      result.style.opacity = "";
      result.style.transform = "";
      for (const el of [deskGlowEl, courtGlowEl, greenGlowEl]) {
        el.style.opacity = "";
        el.style.transform = "";
      }
      verticalTimeline = null;
    }

    function rebuildVertical() {
      if (!vertical) return;
      const now = performance.now();
      if (now - rebuildWindow > 400) {
        rebuildWindow = now;
        rebuildCount = 0;
      }
      rebuildCount += 1;
      if (rebuildCount > 6) return;
      section.dataset.story = "vertical";
      const viewH = sticky.clientHeight;
      if (viewH < 120) return;
      cachedStickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const previous = verticalTimeline;
      const yBefore = previous
        ? clampRange(
            cachedStickyTop - section.getBoundingClientRect().top,
            0,
            previous.travel,
          )
        : 0;
      const ratio = previous && previous.travel > 0 ? yBefore / previous.travel : 0;
      const next = buildTimeline(
        viewH,
        desk.offsetHeight,
        court.offsetHeight,
        gocourt.offsetHeight,
      );
      verticalTimeline = next;
      const px = Math.round(viewH + next.travel);
      const current = Number.parseFloat(section.style.height);
      if (!Number.isFinite(current) || Math.abs(current - px) > 1) {
        section.style.height = `${px}px`;
      }
      if (previous && ratio > 0.001) {
        const rect = section.getBoundingClientRect();
        const target = window.scrollY + rect.top - cachedStickyTop + ratio * next.travel;
        if (Math.abs(target - window.scrollY) > 2) {
          window.scrollTo({ top: target, behavior: "instant" });
        }
      }
      renderVertical();
    }

    function render() {
      frame = 0;
      if (pinned) renderPinned();
      else if (vertical) renderVertical();
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

    function goToVertical(at: number) {
      const timeline = verticalTimeline;
      if (!timeline) {
        (at > 0.5 ? gocourt : halves).scrollIntoView();
        return;
      }
      const rect = section.getBoundingClientRect();
      const y = at > 0.5 ? timeline.gocourt.start : 0;
      window.scrollTo({ top: window.scrollY + rect.top - cachedStickyTop + y });
    }

    function goTo(at: number) {
      if (vertical) {
        goToVertical(at);
        return;
      }
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
      vertical = !pinned && verticalQuery.matches;
      if (pinned) {
        clearVerticalInline();
        schedule();
        return;
      }
      clearPinnedInline();
      if (vertical) {
        rebuildVertical();
        return;
      }
      clearVerticalInline();
    }

    function revealFocused(target: Node) {
      const timeline = verticalTimeline;
      if (!timeline || !(target instanceof HTMLElement)) return;
      let panel: HTMLElement | null = null;
      let span: StorySpan | null = null;
      if (desk.contains(target)) {
        panel = desk;
        span = timeline.desk;
      } else if (court.contains(target)) {
        panel = court;
        span = timeline.court;
      } else if (gocourt.contains(target)) {
        panel = gocourt;
        span = timeline.gocourt;
      }
      if (!panel || !span) return;

      const stickyRect = sticky.getBoundingClientRect();
      const elRect = target.getBoundingClientRect();
      if (
        elRect.height > 0 &&
        elRect.top >= stickyRect.top + 4 &&
        elRect.bottom <= stickyRect.bottom - 4
      ) {
        return;
      }

      const panelRect = panel.getBoundingClientRect();
      const transform = getComputedStyle(panel).transform;
      const shift = transform && transform !== "none" ? new DOMMatrix(transform).m42 : 0;
      const layoutTop = elRect.top - panelRect.top - shift;
      const desired = clampRange(layoutTop - 32, 0, span.overflow);
      const rect = section.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.top - cachedStickyTop + span.start + desired,
      });
    }

    function onFocus(event: FocusEvent) {
      const target = event.target as Node;
      if (vertical) {
        revealFocused(target);
        return;
      }
      if (!pinned) return;
      if (gocourt.contains(target) && sticky.dataset.phase !== "gocourt")
        goTo(GOCOURT_AT);
      else if (halves.contains(target) && sticky.dataset.phase !== "halves") goTo(0);
    }

    function onHash() {
      if (window.location.hash === "#play") goTo(GOCOURT_AT);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (vertical) rebuildVertical();
      else schedule();
    });

    function syncWheel() {
      window.removeEventListener("wheel", onWheel);
      if (pinned) window.addEventListener("wheel", onWheel, { passive: false });
    }

    const setModeAndWheel = () => {
      setMode();
      syncWheel();
    };

    setModeAndWheel();
    onHash();
    resizeObserver.observe(sticky);
    resizeObserver.observe(desk);
    resizeObserver.observe(court);
    resizeObserver.observe(gocourt);
    query.addEventListener("change", setModeAndWheel);
    verticalQuery.addEventListener("change", setModeAndWheel);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("hashchange", onHash);
    section.addEventListener("focusin", onFocus);
    void document.fonts?.ready.then(() => {
      if (vertical) rebuildVertical();
    });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      query.removeEventListener("change", setModeAndWheel);
      verticalQuery.removeEventListener("change", setModeAndWheel);
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
          <div ref={deskRef} id="work" className="story-half story-desk">
            <div className="story-half-inner">
              <p className="section-kicker">01 / About · Desk</p>
              <h2 className="font-heading story-half-title">
                Engineer / Computer Scientist
              </h2>
              <IntroCode />
            </div>
          </div>
          <div ref={courtRef} className="story-half story-court">
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
