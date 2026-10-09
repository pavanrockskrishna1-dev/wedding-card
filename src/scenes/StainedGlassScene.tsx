import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { TRANSLATIONS, type LangCode } from "@/config";

interface Props {
  lang: LangCode;
  guestName: string | null;
}

const PALETTE = ["#6a8fd8", "#c75b6b", "#e0b84d", "#4f9b7d", "#8a6bc9", "#d98a4b"];

interface Piece {
  x: number;
  y: number;
  size: number;
  color: string;
  tx: number;
  ty: number;
  rot: number;
}

function buildPieces(): Piece[] {
  const pieces: Piece[] = [];
  const cols = 8;
  const rows = 11;
  const cellSize = 20;
  const originX = 20;
  const originY = 18;
  const centerX = originX + (cols * cellSize) / 2;
  const centerY = originY + (rows * cellSize) / 2.6;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = originX + c * cellSize;
      const y = originY + r * cellSize;
      const cx = x + cellSize / 2;
      const cy = y + cellSize / 2;
      const dist = Math.hypot(cx - centerX, cy - centerY);
      const colorIndex = Math.floor(dist / 16) % PALETTE.length;
      const angle = Math.atan2(cy - centerY, cx - centerX);
      pieces.push({
        x,
        y,
        size: cellSize,
        color: PALETTE[colorIndex],
        tx: Math.cos(angle) * 260 + (Math.random() - 0.5) * 120,
        ty: Math.sin(angle) * 260 - 80 + (Math.random() - 0.5) * 80,
        rot: (Math.random() - 0.5) * 260,
      });
    }
  }
  return pieces;
}

export default function StainedGlassScene({ lang, guestName }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pieces = useMemo(buildPieces, []);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".glass-piece", {
        x: (i) => pieces[i].tx,
        y: (i) => pieces[i].ty,
        rotate: (i) => pieces[i].rot,
        opacity: 0,
      });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(".glass-piece", {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.012, from: "random" },
      })
        .fromTo(
          ".glass-frame",
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power1.out" },
          "-=0.6"
        )
        .fromTo(
          ".light-shaft",
          { opacity: 0 },
          { opacity: 0.85, duration: 1, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".glass-greeting",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.15 },
          "-=0.3"
        );
    }, rootRef);
    return () => ctx.revert();
  }, [pieces]);

  const greetingName = guestName ? `${t.common.dearPrefix} ${guestName}` : t.common.defaultGuest;

  return (
    <div
      ref={rootRef}
      className="scene-shell flex flex-col items-center justify-center bg-gradient-to-b from-[#0e0b17] via-[#1b1430] to-[#241a33] px-6 text-center"
    >
      <div className="light-shaft pointer-events-none absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,250,222,0.55),transparent_60%)] opacity-0" />

      <p className={`glass-greeting mb-3 text-xs uppercase tracking-[0.35em] text-amber-200/70 ${t.meta.fontClass}`}>
        {t.stainedGlass.eyebrow}
      </p>

      <div className="relative mx-auto h-[62vh] max-h-[420px] w-[200px]">
        <svg viewBox="0 0 200 240" className="h-full w-full drop-shadow-[0_0_25px_rgba(233,207,154,0.25)]">
          <defs>
            <clipPath id="archClip">
              <path d="M22 232 L22 100 C22 40 60 18 100 18 C140 18 178 40 178 100 L178 232 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#archClip)">
            <rect x="0" y="0" width="200" height="240" fill="#120e1e" />
            {pieces.map((p, i) => (
              <rect
                key={i}
                className="glass-piece"
                x={p.x}
                y={p.y}
                width={p.size}
                height={p.size}
                fill={p.color}
                stroke="#120e1e"
                strokeWidth={0.6}
                style={{ transformOrigin: `${p.x + p.size / 2}px ${p.y + p.size / 2}px` }}
              />
            ))}
            {/* golden cross motif */}
            <rect x="92" y="40" width="16" height="150" fill="#f3dcab" opacity="0.18" />
            <rect x="55" y="95" width="90" height="16" fill="#f3dcab" opacity="0.18" />
          </g>
          <path
            className="glass-frame"
            d="M22 232 L22 100 C22 40 60 18 100 18 C140 18 178 40 178 100 L178 232"
            fill="none"
            stroke="#e9cf9a"
            strokeWidth="5"
            opacity="0"
          />
        </svg>
      </div>

      <div className="relative mt-6 max-w-sm">
        <h2 className={`glass-greeting text-3xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
          {t.stainedGlass.heading}
        </h2>
        <p className={`glass-greeting mt-3 text-base font-medium text-amber-100 ${t.meta.fontClass}`}>
          {greetingName},
        </p>
        <p className={`glass-greeting mt-2 text-sm leading-relaxed text-amber-50/80 ${t.meta.fontClass}`}>
          {t.stainedGlass.message}{" "}
          <span className={`gold-text text-lg font-semibold ${t.meta.headingFontClass}`}>
            {t.couple.heading}
          </span>
        </p>
      </div>
    </div>
  );
}
