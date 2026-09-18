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
  visible: boolean;
};

const idle: Pose = {
  x: 0,
  y: 0,
  tennis: 0,
  tennisHit: 0,
  padelHit: 0,
  visible: false,
};

const SIZE = 44;

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

function hitPulse(progress: number, at: number, width = 0.05) {
  return clamp(1 - Math.abs(progress - at) / width);
}

function gutterX(homeX: number) {
  const main = document.querySelector("main");
  const right = main?.getBoundingClientRect().right ?? window.innerWidth - 80;
  const room = window.innerWidth - right;
  if (room < 64) return homeX;
  return Math.min(right + 28 + SIZE / 2, window.innerWidth - 28);
}

export function SportTrail() {
  const [pose, setPose] = useState<Pose>(idle);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function measure() {
      const home = document.getElementById("ball-home");
      const play = document.getElementById("play");
      if (!home || window.innerWidth < 960) {
        setPose(idle);
        return;
      }

      const homeBox = home.getBoundingClientRect();
      const playTop = play ? play.getBoundingClientRect().top + window.scrollY : 2200;
      const startY = window.scrollY + homeBox.top;
      const homeX = homeBox.left + homeBox.width / 2;
      const homeY = homeBox.top + homeBox.height / 2;
      const p = clamp((window.scrollY - startY + 40) / Math.max(playTop - startY, 1));
      const xTrack = gutterX(homeX);

      if (reduced) {
        setPose({
          x: homeX,
          y: homeY,
          tennis: 0,
          tennisHit: 0,
          padelHit: 0,
          visible: true,
        });
        return;
      }

      const follow = smooth(0.04, 0.2, p);
      setPose({
        x: lerp(homeX, xTrack, follow),
        y: lerp(homeY, lerp(120, window.innerHeight - 140, p), follow),
        tennis: smooth(0.32, 0.46, p),
        tennisHit: hitPulse(p, 0.48),
        padelHit: hitPulse(p, 0.8),
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
          opacity: pose.tennisHit,
          transform: `translate3d(${pose.x + 10}px, ${pose.y - 28}px, 0) rotate(${-24 + pose.tennisHit * 18}deg)`,
        }}
      >
        <TennisRacquet className="h-[72px] w-auto" />
      </div>
      <div
        className="sport-racquet"
        style={{
          opacity: pose.padelHit,
          transform: `translate3d(${pose.x + 10}px, ${pose.y - 28}px, 0) rotate(${18 - pose.padelHit * 16}deg)`,
        }}
      >
        <PadelRacquet className="h-[72px] w-auto" />
      </div>
    </div>
  );
}
