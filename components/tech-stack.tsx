"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { content } from "@/lib/content";

type StackItem = (typeof content.techStack)[number];

function spherePoints(count: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(Math.cos(theta) * ring, y, Math.sin(theta) * ring).multiplyScalar(radius);
  });
}

export function TechStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const stageNode = stageRef.current;
    const canvas = canvasRef.current;
    if (!stageNode || !canvas) return;
    const stage: HTMLDivElement = stageNode;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.z = 7.15;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const globe = new THREE.Group();
    globe.position.y = -0.35;
    scene.add(globe);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.92, 2),
      new THREE.MeshBasicMaterial({
        color: 0x7eb0e8,
        wireframe: true,
        transparent: true,
        opacity: 0.38,
      }),
    );
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.58, 1),
      new THREE.MeshBasicMaterial({
        color: 0x9ec4ef,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      }),
    );
    const dots = new THREE.Points(
      new THREE.IcosahedronGeometry(1.92, 2),
      new THREE.PointsMaterial({ color: 0xd5e6f8, size: 0.028, transparent: true, opacity: 0.7 }),
    );
    globe.add(wire, inner, dots);

    const locals = spherePoints(content.techStack.length, 2.32);
    const scratch = new THREE.Vector3();
    let rotY = 0.55;
    let rotX = 0.18;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let frame = 0;

    function resize() {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width < 2 || height < 2) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function paint() {
      globe.rotation.set(rotX, rotY, 0);
      renderer.render(scene, camera);

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      content.techStack.forEach((_, index) => {
        const node = badgeRefs.current[index];
        if (!node) return;
        scratch.copy(locals[index]).applyEuler(globe.rotation).add(globe.position);
        const depth = scratch.z;
        scratch.project(camera);
        const x = (scratch.x * 0.5 + 0.5) * width;
        const y = (-scratch.y * 0.5 + 0.5) * height;
        const front = depth > -0.15;
        const fade = THREE.MathUtils.clamp((depth + 2.2) / 3.1, 0.16, 1);
        const scale = THREE.MathUtils.lerp(0.72, 1.08, fade);
        node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        node.style.opacity = String(fade);
        node.style.zIndex = String(Math.round(100 + depth * 20));
        node.dataset.front = front ? "true" : "false";
      });
    }

    function tick() {
      if (!dragging && !reduced) rotY += 0.0024;
      paint();
      frame = window.requestAnimationFrame(tick);
    }

    function onPointerDown(event: PointerEvent) {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      stage.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (!dragging) return;
      rotY += (event.clientX - lastX) * 0.005;
      rotX = THREE.MathUtils.clamp(rotX + (event.clientY - lastY) * 0.004, -0.6, 0.7);
      lastX = event.clientX;
      lastY = event.clientY;
    }

    function onPointerUp(event: PointerEvent) {
      dragging = false;
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    }

    resize();
    paint();
    frame = window.requestAnimationFrame(tick);

    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      wire.geometry.dispose();
      inner.geometry.dispose();
      dots.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      (inner.material as THREE.Material).dispose();
      (dots.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" className="tech-stack" aria-label="Tech stack">
      <div className="tech-stack-frame">
        <div className="tech-stack-heading">
          <p>Tech stack</p>
          <h2>My skills</h2>
        </div>
        <div ref={stageRef} className="tech-stack-stage">
          <canvas ref={canvasRef} aria-hidden="true" />
          {content.techStack.map((item, index) => (
            <div
              key={item.id}
              ref={(node) => {
                badgeRefs.current[index] = node;
              }}
              className={`tech-badge tech-badge-${item.id}${item.tone === "ghost" ? " is-ghost" : ""}`}
            >
              <BadgeMark item={item} />
              <span className="tech-badge-name">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="tech-stack-hint">Drag to turn the stack</p>
      </div>
    </section>
  );
}

function BadgeMark({ item }: { item: StackItem }) {
  if (item.id === "react") {
    return (
      <svg viewBox="0 0 32 32" className="tech-badge-icon" aria-hidden="true">
        <circle cx="16" cy="16" r="2.2" fill="currentColor" />
        <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <ellipse
          cx="16"
          cy="16"
          rx="11"
          ry="4.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          transform="rotate(60 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="11"
          ry="4.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          transform="rotate(120 16 16)"
        />
      </svg>
    );
  }

  if (item.id === "git") {
    return (
      <svg viewBox="0 0 32 32" className="tech-badge-icon" aria-hidden="true">
        <circle cx="10" cy="22" r="2.3" fill="currentColor" />
        <circle cx="16" cy="10" r="2.3" fill="currentColor" />
        <circle cx="22" cy="20" r="2.3" fill="currentColor" />
        <path d="M11.4 20.2 15 12.2M17.2 11.6 20.6 18.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return <span className="tech-badge-mark">{item.mark}</span>;
}
