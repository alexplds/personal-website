"use client";

import { useEffect, useState } from "react";
import {
  FootballGraphic,
  PadelRacquet,
  TennisBallGraphic,
  TennisRacquet,
} from "@/components/sport-graphics";

type Pose = {
  x: number;
  y: number;
  tennis: number;
  tennisHit: number;
  padelHit: number;
  fade: number;
  visible: boolean;
};

const idle: Pose = {
  x: 0,
  y: 0,
  tennis: 0,
  tennisHit: 0,
  padelHit: 0,
  fade: 0,
  visible: false,
};

const SIZE = 28;
const MIN_WIDTH = 1000;

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smooth(e0: number, e1: number, x: number) {
  const span = e1 - e0;
  if (span <= 0) return x >= e1 ? 1 : 0;
  const t = clamp((x - e0) / span);
  return t * t * (3 - 2 * t);
}

function hitPulse(progress: number, at: number, width = 0.04) {
  return clamp(1 - Math.abs(progress - at) / width);
}

function gutterX() {
  if (typeof window === "undefined" || window.innerWidth < MIN_WIDTH) return null;
  const main = document.querySelector("main");
  const right = main?.getBoundingClientRect().right ?? window.innerWidth - 80;
  const x = window.innerWidth - 26;
  // Hide rather than sit on copy when the column is too close to the edge.
  if (x - SIZE / 2 < right + 8) return null;
  return x;
}

export function SportTrail() {
  const [pose, setPose] = useState<Pose>(idle);

  useEffect(() => {
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function measure() {
      if (reduced.matches) {
        setPose(idle);
        return;
      }
      const x = gutterX();
      const play = document.getElementById("play");
      if (x == null) {
        setPose(idle);
        return;
      }

      const playTop = play ? play.getBoundingClientRect().top + window.scrollY : 2400;
      const start = 40;
      const span = Math.max(playTop - start, 400);
      const p = clamp((window.scrollY - start) / span);
      const fade = smooth(0.01, 0.08, p) * (1 - smooth(0.96, 1, p));

      if (fade < 0.02) {
        setPose(idle);
        return;
      }

      setPose({
        x,
        y: lerp(120, window.innerHeight - 110, p),
        tennis: smooth(0.26, 0.4, p),
        tennisHit: hitPulse(p, 0.46),
        padelHit: hitPulse(p, 0.76),
        fade,
        visible: true,
      });
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", onScroll);
    };
  }, []);

  if (!pose.visible) return null;

  const fade = Number.isFinite(pose.fade) ? pose.fade : 0;

  return (
    <div className="sport-trail no-print pointer-events-none" aria-hidden="true">
      <div
        className="sport-ball"
        style={{
          width: SIZE,
          height: SIZE,
          opacity: fade * 0.88,
          transform: `translate3d(${pose.x - SIZE / 2}px, ${pose.y - SIZE / 2}px, 0)`,
        }}
      >
        <div className="sport-face" style={{ opacity: 1 - pose.tennis }}>
          <FootballGraphic className="size-full" />
        </div>
        <div className="sport-face" style={{ opacity: pose.tennis }}>
          <TennisBallGraphic className="size-full" />
        </div>
      </div>

      <div
        className="sport-racquet"
        style={{
          opacity: fade * pose.tennisHit * 0.7,
          transform: `translate3d(${pose.x - 22}px, ${pose.y - 20}px, 0) rotate(${-16 + pose.tennisHit * 8}deg)`,
        }}
      >
        <TennisRacquet className="h-9 w-auto" />
      </div>
      <div
        className="sport-racquet"
        style={{
          opacity: fade * pose.padelHit * 0.7,
          transform: `translate3d(${pose.x - 20}px, ${pose.y - 18}px, 0) rotate(${10 - pose.padelHit * 6}deg)`,
        }}
      >
        <PadelRacquet className="h-9 w-auto" />
      </div>
    </div>
  );
}
