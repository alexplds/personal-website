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
  size: number;
  tennis: number;
  rot: number;
  tennisHit: number;
  padelHit: number;
  opacity: number;
};

const start: Pose = {
  x: 0,
  y: 0,
  size: 260,
  tennis: 0,
  rot: 0,
  tennisHit: 0,
  padelHit: 0,
  opacity: 1,
};

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

function hitPulse(progress: number, at: number, width = 0.07) {
  const d = Math.abs(progress - at);
  return clamp(1 - d / width);
}

export function SportTrail() {
  const [pose, setPose] = useState<Pose>(start);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function measure() {
      const home = document.getElementById("ball-home");
      const play = document.getElementById("play");
      if (!home) return;

      const homeBox = home.getBoundingClientRect();
      const playTop = play ? play.getBoundingClientRect().top + window.scrollY : 2200;
      const startY = window.scrollY + homeBox.top;
      const startX = homeBox.left + homeBox.width / 2;
      const startSize = Math.min(homeBox.width, homeBox.height, 320);
      const y = window.scrollY;
      const span = Math.max(playTop - startY, 1);
      const p = clamp((y - startY + 80) / span);

      if (reduced) {
        setPose({
          x: startX,
          y: homeBox.top + homeBox.height / 2,
          size: startSize,
          tennis: 0,
          rot: 0,
          tennisHit: 0,
          padelHit: 0,
          opacity: 1,
        });
        setReady(true);
        return;
      }

      const follow = smooth(0.02, 0.22, p);
      const toTennis = smooth(0.28, 0.48, p);
      const tennisHit = hitPulse(p, 0.5);
      const padelHit = hitPulse(p, 0.82);
      const afterTennis = smooth(0.5, 0.58, p);
      const afterPadel = smooth(0.82, 0.9, p);

      const endX = window.innerWidth - Math.min(160, window.innerWidth * 0.16);
      const midX = window.innerWidth * 0.78;
      const tennisX = window.innerWidth * 0.7;
      const padelX = window.innerWidth * 0.74;

      let x = lerp(startX, midX, follow);
      x = lerp(x, tennisX, toTennis);
      x += tennisHit * -36;
      x = lerp(x, padelX, afterTennis);
      x += padelHit * -28;
      x = lerp(x, endX, afterPadel);

      const heroY = homeBox.top + homeBox.height / 2;
      const travelY = lerp(window.innerHeight * 0.28, window.innerHeight * 0.62, p);
      const yPos = lerp(heroY, travelY, follow);

      const size = lerp(startSize, 92, smooth(0.05, 0.4, p));
      const rot = lerp(0, 220, p) + tennisHit * 18 + padelHit * -14;

      setPose({
        x,
        y: yPos,
        size,
        tennis: toTennis,
        rot,
        tennisHit,
        padelHit,
        opacity: 1 - smooth(0.94, 1.05, p) * 0.35,
      });
      setReady(true);
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

  if (!ready) return null;

  return (
    <div className="sport-trail no-print pointer-events-none" aria-hidden="true">
      <div
        className="sport-ball"
        style={{
          width: pose.size,
          height: pose.size,
          opacity: pose.opacity,
          transform: `translate3d(${pose.x - pose.size / 2}px, ${pose.y - pose.size / 2}px, 0) rotate(${pose.rot}deg)`,
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
        className="sport-racquet tennis-racquet"
        style={{
          opacity: clamp(pose.tennisHit * 1.4, 0, 1),
          transform: `translate3d(${pose.x + pose.size * 0.15}px, ${pose.y - 90}px, 0) rotate(${-38 + pose.tennisHit * 70}deg)`,
        }}
      >
        <TennisRacquet className="h-56 w-auto md:h-72" />
      </div>
      <div
        className="sport-racquet padel-racquet"
        style={{
          opacity: clamp(pose.padelHit * 1.4, 0, 1),
          transform: `translate3d(${pose.x + pose.size * 0.1}px, ${pose.y - 80}px, 0) rotate(${32 - pose.padelHit * 64}deg)`,
        }}
      >
        <PadelRacquet className="h-56 w-auto md:h-72" />
      </div>
    </div>
  );
}
