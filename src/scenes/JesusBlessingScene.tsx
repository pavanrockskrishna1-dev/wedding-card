import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TRANSLATIONS, SHOW_JESUS_FIGURE, type LangCode } from "@/config";
import Silhouette from "@/components/Silhouette";

interface Props {
  lang: LangCode;
}

export default function JesusBlessingScene({ lang }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Background warms in gently
      tl.fromTo(
        ".jb-bg",
        { opacity: 0 },
        { opacity: 1, duration: 1.6, ease: "sine.inOut" }
      );

      // Light rays open slowly from top centre
      tl.fromTo(
        ".jb-ray",
        { scaleY: 0, opacity: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          opacity: 0.55,
          duration: 2.2,
          ease: "sine.out",
          stagger: 0.08,
        },
        "-=1.0"
      );

      // Jesus figure (or blessing hands) rises softly into the light
      tl.fromTo(
        ".jb-figure",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.0, ease: "sine.out" },
        "-=1.4"
      );

      // Light gently falls from hands onto the couple
      tl.fromTo(
        ".jb-falling-light",
        { scaleY: 0, opacity: 0, transformOrigin: "top center" },
        { scaleY: 1, opacity: 0.5, duration: 1.6, ease: "sine.inOut" },
        "-=0.8"
      );

      // Couple silhouettes fade in below
      tl.fromTo(
        ".jb-couple",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.3, ease: "sine.out", stagger: 0.15 },
        "-=1.2"
      );

      // Soft glow around rings
      tl.fromTo(
        ".jb-ring",
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: "sine.out", stagger: 0.15 },
        "-=0.8"
      );

      // Verse text appears gracefully
      tl.fromTo(
        ".jb-copy",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.1, ease: "sine.out", stagger: 0.15 },
        "-=0.6"
      );

      // Continuous soft glow pulse on rings and halo
      gsap.to(".jb-ring-glow", {
        opacity: 0.75,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".jb-halo", {
        opacity: 0.65,
        scale: 1.05,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center center",
      });

      gsap.to(".jb-ray", {
        opacity: 0.7,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="scene-shell relative flex flex-col items-center justify-between overflow-hidden px-6 pb-28 pt-14 text-center"
    >
      {/* Warm gold background */}
      <div
        className="jb-bg absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 15%, #f6d58a 0%, #d9a85a 25%, #8a5a2a 60%, #3a2412 100%)",
        }}
      />

      {/* Light rays from top centre */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="jbRayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fff6d8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon className="jb-ray" points="200,0 140,800 260,800" fill="url(#jbRayGrad)" />
        <polygon className="jb-ray" points="200,0 80,800 320,800" fill="url(#jbRayGrad)" opacity="0.6" />
        <polygon className="jb-ray" points="200,0 20,800 380,800" fill="url(#jbRayGrad)" opacity="0.4" />
        <polygon className="jb-ray" points="200,0 180,800 220,800" fill="url(#jbRayGrad)" opacity="0.9" />
      </svg>

      <p
        className={`jb-copy relative z-10 text-xs uppercase tracking-[0.35em] text-amber-50/90 ${t.meta.fontClass}`}
      >
        {t.jesusBlessing.eyebrow}
      </p>

      {/* Figure / hands area */}
      <div className="relative z-10 flex w-full max-w-sm flex-1 flex-col items-center justify-center">
        {SHOW_JESUS_FIGURE ? (
          // Respectful placeholder Jesus silhouette — no detailed face
          <svg
            className="jb-figure h-[34vh] max-h-80 w-auto"
            viewBox="0 0 160 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="jbHaloGrad" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#fff6d8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="jbRobeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f3e4bf" />
              </linearGradient>
            </defs>

            {/* Halo */}
            <circle className="jb-halo" cx="80" cy="48" r="38" fill="url(#jbHaloGrad)" />

            {/* Head — simple oval, no facial features */}
            <ellipse cx="80" cy="52" rx="14" ry="17" fill="#f3e4bf" />

            {/* Raised arms in blessing (both hands up and outward) */}
            <path
              d="M62 90 Q40 70 32 48 Q30 42 36 40 Q42 42 46 50 Q56 72 70 92 Z"
              fill="url(#jbRobeGrad)"
            />
            <path
              d="M98 90 Q120 70 128 48 Q130 42 124 40 Q118 42 114 50 Q104 72 90 92 Z"
              fill="url(#jbRobeGrad)"
            />

            {/* Robe body */}
            <path
              d="M55 90 Q80 82 105 90 L120 240 Q80 248 40 240 Z"
              fill="url(#jbRobeGrad)"
            />
            {/* Robe sash */}
            <path d="M55 140 Q80 148 105 140 L104 150 Q80 158 56 150 Z" fill="#d9a85a" opacity="0.7" />
          </svg>
        ) : (
          // Alternate: only light rays + two glowing blessing hands from above
          <svg
            className="jb-figure h-[30vh] max-h-72 w-auto"
            viewBox="0 0 200 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="jbHandGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fff6d8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="jbHandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f3e4bf" />
              </linearGradient>
            </defs>

            {/* Glow behind hands */}
            <circle className="jb-halo" cx="70" cy="60" r="36" fill="url(#jbHandGlow)" />
            <circle className="jb-halo" cx="130" cy="60" r="36" fill="url(#jbHandGlow)" />

            {/* Left blessing hand (palm down) */}
            <path
              d="M55 20 Q60 55 70 75 Q78 85 86 75 Q90 55 85 20 Z"
              fill="url(#jbHandGrad)"
            />
            {/* Right blessing hand (palm down) */}
            <path
              d="M115 20 Q120 55 130 75 Q138 85 146 75 Q150 55 145 20 Z"
              fill="url(#jbHandGrad)"
            />
          </svg>
        )}

        {/* Light gently falling from hands onto couple */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] w-full"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="jbFallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fff6d8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            className="jb-falling-light"
            points="80,0 60,200 100,200"
            fill="url(#jbFallGrad)"
          />
          <polygon
            className="jb-falling-light"
            points="120,0 100,200 140,200"
            fill="url(#jbFallGrad)"
          />
        </svg>

        {/* Couple silhouettes below with rings */}
        <div className="relative mt-2 flex items-end justify-center gap-2">
          <div className="jb-couple flex flex-col items-center">
            <Silhouette variant="bride" className="h-[14vh] max-h-28 w-auto opacity-90" />
          </div>
          <div className="jb-couple flex flex-col items-center">
            <Silhouette variant="groom" className="h-[14vh] max-h-28 w-auto opacity-90" />
          </div>

          {/* Soft glow around two rings */}
          <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="jb-ring-glow absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/60 blur-md" />
            <svg width="70" height="42" viewBox="0 0 90 54" className="relative">
              <circle className="jb-ring" cx="34" cy="27" r="14" fill="none" stroke="#fff6d8" strokeWidth="3" />
              <circle className="jb-ring" cx="56" cy="27" r="14" fill="none" stroke="#fff6d8" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Verse */}
      <div className="relative z-10 max-w-sm">
        <p className={`jb-copy text-[11px] uppercase tracking-[0.3em] text-amber-50/80 ${t.meta.fontClass}`}>
          {t.jesusBlessing.verseRef}
        </p>
        <p className={`jb-copy mt-3 text-sm leading-relaxed text-amber-50/95 ${t.meta.fontClass}`}>
          {t.jesusBlessing.verseText}
        </p>
      </div>
    </div>
  );
}
