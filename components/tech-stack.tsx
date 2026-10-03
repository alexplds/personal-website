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

    scene.add(new THREE.AmbientLight(0xfff8e8, 0.72));
    const key = new THREE.DirectionalLight(0xfff4d8, 1.25);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9eb6d8, 0.45);
    rim.position.set(-5, -2, 3);
    scene.add(rim);

    const globe = new THREE.Group();
    globe.position.y = -0.35;
    globe.quaternion.setFromEuler(new THREE.Euler(0.35, 0.7, 0.15));
    scene.add(globe);

    const feltMap = feltTexture();
    const felt = new THREE.Mesh(
      new THREE.SphereGeometry(1.92, 64, 48),
      new THREE.MeshStandardMaterial({
        map: feltMap,
        color: 0xd7e15a,
        roughness: 0.94,
        metalness: 0,
      }),
    );
    const seam = new THREE.Mesh(seamGeometry(1.99, 0.085), new THREE.MeshStandardMaterial({
      color: 0xf7f8f2,
      roughness: 0.55,
      metalness: 0,
    }));
    globe.add(felt, seam);

    const locals = spherePoints(content.techStack.length, 2.42);
    const scratch = new THREE.Vector3();
    const dragAxis = new THREE.Vector3();
    const dragStep = new THREE.Quaternion();
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

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
      renderer.render(scene, camera);

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      content.techStack.forEach((_, index) => {
        const node = badgeRefs.current[index];
        if (!node) return;
        scratch.copy(locals[index]).applyQuaternion(globe.quaternion).add(globe.position);
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

    function onPointerDown(event: PointerEvent) {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      stage.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.4) return;
      dragAxis.set(dy, dx, 0).normalize();
      dragStep.setFromAxisAngle(dragAxis, distance * 0.007);
      globe.quaternion.premultiply(dragStep);
      paint();
    }

    function onPointerUp(event: PointerEvent) {
      dragging = false;
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    }

    resize();
    paint();

    const observer = new ResizeObserver(() => {
      resize();
      paint();
    });
    observer.observe(stage);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      observer.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      felt.geometry.dispose();
      seam.geometry.dispose();
      (felt.material as THREE.Material).dispose();
      (seam.material as THREE.Material).dispose();
      feltMap.dispose();
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

function feltTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.fillStyle = "#d6e15a";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 5200; i += 1) {
    const light = Math.random() > 0.45;
    ctx.fillStyle = light ? "rgba(255,255,240,0.16)" : "rgba(70,90,20,0.14)";
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1.4, 1.4);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function seamGeometry(radius: number, thickness: number) {
  const points: THREE.Vector3[] = [];
  const steps = 280;
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(t), Math.sin(t), 0.72 * Math.cos(2 * t)).normalize().multiplyScalar(radius));
  }
  const curve = new THREE.CatmullRomCurve3(points, true);
  return new THREE.TubeGeometry(curve, 280, thickness, 10, true);
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
