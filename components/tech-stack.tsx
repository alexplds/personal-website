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

    const globe = new THREE.Group();
    globe.position.y = -0.35;
    globe.quaternion.setFromEuler(new THREE.Euler(0.05, 0.42, 0));
    scene.add(globe);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 48, 32),
      new THREE.MeshBasicMaterial({
        color: 0xb7d4f2,
        transparent: true,
        opacity: 0.045,
        depthWrite: false,
      }),
    );
    const rings = latitudeRings(1.9);
    const seamGeo = seamGeometry(1.94, 0.012);
    const seam = new THREE.Mesh(
      seamGeo,
      new THREE.MeshBasicMaterial({
        color: 0xf4fff8,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    );
    const seamFar = new THREE.Mesh(
      seamGeo,
      new THREE.MeshBasicMaterial({
        color: 0xd7e8f4,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        depthTest: false,
      }),
    );
    seamFar.renderOrder = 0;
    seam.renderOrder = 1;
    globe.add(shell, rings, seamFar, seam);

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
      globe.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry.dispose();
      });
      (shell.material as THREE.Material).dispose();
      (seam.material as THREE.Material).dispose();
      (seamFar.material as THREE.Material).dispose();
      rings.children.forEach((child) => {
        if (child instanceof THREE.Mesh) (child.material as THREE.Material).dispose();
      });
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

function latitudeRings(radius: number) {
  const material = new THREE.MeshBasicMaterial({
    color: 0xd5e6f6,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const group = new THREE.Group();
  const axes: Array<[number, number, number]> = [
    [0, 0, 0],
    [Math.PI / 2, 0, 0],
    [0, Math.PI / 2, 0],
  ];
  axes.forEach(([x, y, z]) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.0075, 8, 120), material);
    ring.rotation.set(x, y, z);
    group.add(ring);
  });
  return group;
}

function seamGeometry(radius: number, thickness: number) {
  const points: THREE.Vector3[] = [];
  const steps = 280;
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    points.push(
      new THREE.Vector3(0.95 * Math.sin(2 * t), Math.sin(t), Math.cos(t)).normalize().multiplyScalar(radius),
    );
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
