"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import { Reveal } from "@/components/reveal";
import { StackIcon, stackTone, type StackIconId } from "@/components/stack-icons";
import { content } from "@/lib/content";

const skills: ReadonlyArray<{ label: string; icon: StackIconId }> = content.techStack;
const BALL_RADIUS = 2.2;
const ORBIT_RADIUS = 2.42;

function spherePoints(count: number, radius: number, facing: THREE.Quaternion) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const z = 1 - (2 * (i + 0.5)) / count;
    const ring = Math.sqrt(1 - z * z);
    const theta = golden * i;
    return new THREE.Vector3(Math.cos(theta) * ring, Math.sin(theta) * ring, z)
      .multiplyScalar(radius)
      .applyQuaternion(facing);
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
    globe.quaternion.setFromEuler(new THREE.Euler(0.3, -0.14, -Math.PI / 4));
    scene.add(globe);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(BALL_RADIUS, 64, 48),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          felt: { value: new THREE.Color(0xcdf27a) },
          glow: { value: new THREE.Color(0xf0ffc8) },
        },
        vertexShader: FELT_VERTEX,
        fragmentShader: FELT_FRAGMENT,
      }),
    );
    const seamGeo = seamGeometry(BALL_RADIUS + 0.01, 0.048);
    const seamFar = new THREE.Mesh(seamGeo, seamMaterial(0xf4f9ea, 1, false));
    const seam = new THREE.Mesh(seamGeo, seamMaterial(0xf8fbf0, 0.96, true));
    seamFar.renderOrder = 0;
    shell.renderOrder = 1;
    seam.renderOrder = 2;
    globe.add(seamFar, shell, seam);

    const locals = spherePoints(skills.length, ORBIT_RADIUS, globe.quaternion.clone().invert());
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
      const halfWidth = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
      const reach = ORBIT_RADIUS + 0.6;
      camera.position.z = Math.max(7.15, reach * Math.sqrt(1 + 1 / (halfWidth * halfWidth)));
      camera.updateProjectionMatrix();
    }

    function paint() {
      renderer.render(scene, camera);

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      locals.forEach((local, index) => {
        const node = badgeRefs.current[index];
        if (!node) return;
        scratch.copy(local).applyQuaternion(globe.quaternion).add(globe.position);
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
        node.dataset.flip = y > height * 0.66 ? "true" : "false";
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
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" className="tech-stack page-wrap scroll-mt-14" aria-label="Tech stack">
      <div className="tech-stack-frame">
        <Reveal className="tech-stack-heading">
          <p>03 / Tech stack</p>
          <h2>My skills</h2>
        </Reveal>
        <div ref={stageRef} className="tech-stack-stage">
          <canvas ref={canvasRef} aria-hidden="true" />
          {skills.map((item, index) => {
            const tone = stackTone(item.icon);
            return (
              <div
                key={item.label}
                ref={(node) => {
                  badgeRefs.current[index] = node;
                }}
                className="tech-badge"
                data-tone={tone ? "brand" : undefined}
                style={tone ? ({ "--tech-tone": tone } as CSSProperties) : undefined}
              >
                <span className="tech-badge-icon">
                  <StackIcon id={item.icon} />
                </span>
                <span className="tech-badge-name">{item.label}</span>
              </div>
            );
          })}
        </div>
        <p className="tech-stack-hint">Drag to explore</p>
      </div>
    </section>
  );
}

const FELT_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const FELT_FRAGMENT = /* glsl */ `
  uniform vec3 felt;
  uniform vec3 glow;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec3 n = normalize(vNormal);
    float facing = clamp(dot(n, normalize(vView)), 0.0, 1.0);
    float rim = pow(1.0 - facing, 2.4);
    float light = clamp(dot(n, normalize(vec3(-0.45, 0.62, 0.64))), 0.0, 1.0);
    vec3 color = mix(felt * (0.7 + 0.3 * light), glow, rim * 0.55);
    gl_FragColor = vec4(color, min(0.88 + 0.06 * light + 0.12 * rim, 0.97));
    #include <colorspace_fragment>
  }
`;

const SEAM_VERTEX = /* glsl */ `
  varying float vFacing;

  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normalize(position));
    vFacing = dot(n, normalize(-viewPosition.xyz));
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const SEAM_FRAGMENT = /* glsl */ `
  uniform vec3 tint;
  uniform float strength;
  uniform float nearSide;
  varying float vFacing;

  void main() {
    float front = smoothstep(-0.03, 0.06, vFacing);
    gl_FragColor = vec4(tint, strength * mix(1.0 - front, front, nearSide));
    #include <colorspace_fragment>
  }
`;

function seamMaterial(color: number, strength: number, nearSide: boolean) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      tint: { value: new THREE.Color(color) },
      strength: { value: strength },
      nearSide: { value: nearSide ? 1 : 0 },
    },
    vertexShader: SEAM_VERTEX,
    fragmentShader: SEAM_FRAGMENT,
  });
}

// The two coefficients must sum to 1 or the seam leaves the sphere surface.
const SEAM_LOBE = 0.28;

function seamPoint(t: number, target: THREE.Vector3) {
  const a = 1 - SEAM_LOBE;
  return target.set(
    a * Math.cos(t) + SEAM_LOBE * Math.cos(3 * t),
    a * Math.sin(t) - SEAM_LOBE * Math.sin(3 * t),
    2 * Math.sqrt(a * SEAM_LOBE) * Math.sin(2 * t),
  );
}

function seamGeometry(radius: number, halfWidth: number) {
  const steps = 512;
  const spread = halfWidth / radius;
  const point = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  const side = new THREE.Vector3();
  const edge = new THREE.Vector3();
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    seamPoint(t, point);
    seamPoint(t + 0.001, ahead);
    side.crossVectors(point, ahead.sub(point)).normalize();
    edge.copy(point).addScaledVector(side, spread).setLength(radius);
    positions.push(edge.x, edge.y, edge.z);
    edge.copy(point).addScaledVector(side, -spread).setLength(radius);
    positions.push(edge.x, edge.y, edge.z);
    const next = ((i + 1) % steps) * 2;
    indices.push(i * 2, i * 2 + 1, next, i * 2 + 1, next + 1, next);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  return geometry;
}
