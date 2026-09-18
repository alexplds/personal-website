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

const SIZE = 26;
const MIN_WIDTH = 1120;
const GUTTER_NEED = 56;

function clamp(n: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smooth(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

function hitPulse(progress: number, at: number, width = 0.03) {
  return clamp(1 - Math.abs(progress - at) / width);
}

function gutterX() {
  if (window.innerWidth < MIN_WIDTH) return null;
  const main = document.querySelector("main");
  const right = main?.getBoundingClientRect().right ?? window.innerWidth;
  const room = window.innerWidth - right;
  if (room < GUTTER_NEED) return null;
  return right + Math.min(room * 0.58, 36);
}

export function SportTrail() {
  const [pose, setPose] = useState<Pose>(idle);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function measure() {
      if (reduced) {
        setPose(idle);
        return;
      }

      const x = gutterX();
      const play = document.getElementById("play");
      if (x == null) {
        setPose(idle);
        return;
      }

      const playTop = play ? play.getBoundingClientRect().top + window.scrollY : 2200;
      const start = 90;
      const p = clamp((window.scrollY - start) / Math.max(playTop - start, 1));
      const fade = smooth(0.04, 0.14, p) * (1 - smooth(0.9, 0.99, p));

      if (fade < 0.04) {
        setPose(idle);
        return;
      }

      setPose({
        x,
        y: lerp(108, window.innerHeight - 128, p),
        tennis: smooth(0.3, 0.42, p),
        tennisHit: hitPulse(p, 0.48),
        padelHit: hitPulse(p, 0.78),
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
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!pose.visible) return null;

  return (
    <div className="sport-trail no-print pointer-events-none" aria-hidden="true">
      <div
        className="sport-ball"
        style={{
          width: SIZE,
          height: SIZE,
          opacity: pose.fade * 0.72,
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
          opacity: pose.fade * pose.tennisHit * 0.55,
          transform: `translate3d(${pose.x - 20}px, ${pose.y - 18}px, 0) rotate(${-18 + pose.tennisHit * 10}deg)`,
        }}
      >
        <TennisRacquet className="h-10 w-auto" />
      </div>
      <div
        className="sport-racquet"
        style={{
          opacity: pose.fade * pose.padelHit * 0.55,
          transform: `translate3d(${pose.x - 18}px, ${pose.y - 16}px, 0) rotate(${12 - pose.padelHit * 8}deg)`,
        }}
      >
        <PadelRacquet className="h-10 w-auto" />
      </div>
    </div>
  );
}
