import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { TRANSLATIONS, type LangCode } from "@/config";

interface Props {
  lang: LangCode;
}

const STRAND_COLORS = [0xe9cf9a, 0xf7f3e8, 0xd9a3a0]; // gold, white, rose

function buildBraidCurvePoints(phase: number, length = 7, turns = 2.4, amplitude = 0.55) {
  const points: THREE.Vector3[] = [];
  const steps = 140;
  for (let i = 0; i <= steps; i++) {
    const tt = i / steps;
    const y = -length / 2 + tt * length;
    const angle = tt * turns * Math.PI * 2 + phase;
    const x = Math.sin(angle) * amplitude;
    const z = Math.cos(angle) * amplitude * 0.5;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

export default function CordScene({ lang }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);
    const key = new THREE.PointLight(0xfff3da, 1.4, 20);
    key.position.set(3, 3, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xd9a3a0, 0.8, 20);
    rim.position.set(-4, -2, 4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    // Group A: three separated straight strands (pre-braid state)
    const strandsA: THREE.Mesh[] = [];
    const startX = [-1.7, 0, 1.7];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.CylinderGeometry(0.11, 0.11, 7, 10, 1, false);
      const mat = new THREE.MeshStandardMaterial({
        color: STRAND_COLORS[i],
        emissive: STRAND_COLORS[i],
        emissiveIntensity: 0.55,
        roughness: 0.35,
        metalness: 0.25,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = startX[i];
      group.add(mesh);
      strandsA.push(mesh);
    }

    // Group B: braided strands (post-braid state), hidden initially
    const strandsB: THREE.Mesh[] = [];
    const phases = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
    for (let i = 0; i < 3; i++) {
      const pts = buildBraidCurvePoints(phases[i]);
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.TubeGeometry(curve, 120, 0.16, 8, false);
      const mat = new THREE.MeshStandardMaterial({
        color: STRAND_COLORS[i],
        emissive: STRAND_COLORS[i],
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.3,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);
      strandsB.push(mesh);
    }

    let frameId = 0;
    const clock = new THREE.Clock();

    const renderSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    renderSize();

    const resizeObserver = new ResizeObserver(renderSize);
    resizeObserver.observe(container);

    const animate = () => {
      const delta = clock.getDelta();
      group.rotation.y += delta * 0.35;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Intro timeline: converge the three straight strands, then crossfade to the braid
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(
      strandsA.map((m) => m.position),
      { x: 0, duration: 1.3, ease: "power2.inOut", stagger: 0.05 }
    )
      .to(
        strandsA.map((m) => m.material as THREE.MeshStandardMaterial),
        { opacity: 0, duration: 0.45, ease: "power1.out" },
        "-=0.2"
      )
      .to(
        strandsB.map((m) => m.material as THREE.MeshStandardMaterial),
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        "-=0.4"
      )
      .call(() => {
        if (textWrapRef.current) {
          gsap.fromTo(
            textWrapRef.current.querySelectorAll(".cord-text"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power2.out" }
          );
        }
      });

    return () => {
      tl.kill();
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      [...strandsA, ...strandsB].forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="scene-shell flex flex-col items-center justify-between bg-gradient-to-b from-[#120e1e] via-[#1b1430] to-[#0e0b17] px-6 pb-28 pt-16 text-center">
      <p className={`text-xs uppercase tracking-[0.35em] text-amber-200/70 ${t.meta.fontClass}`}>
        {t.cord.eyebrow}
      </p>
      <div ref={mountRef} className="relative h-[46vh] w-full max-w-sm" />
      <div ref={textWrapRef} className="max-w-sm">
        <p className={`cord-text gold-text text-lg font-semibold ${t.meta.headingFontClass}`}>
          {t.cord.verseRef}
        </p>
        <p className={`cord-text mt-2 text-sm leading-relaxed text-amber-50/85 ${t.meta.fontClass}`}>
          "{t.cord.verseText}"
        </p>
        <p className={`cord-text mt-3 text-xs italic text-amber-100/60 ${t.meta.fontClass}`}>
          {t.cord.caption}
        </p>
      </div>
    </div>
  );
}
