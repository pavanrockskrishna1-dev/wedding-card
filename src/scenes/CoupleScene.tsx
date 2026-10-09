import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TRANSLATIONS, type LangCode } from "@/config";
import Silhouette from "@/components/Silhouette";

interface Props {
  lang: LangCode;
}

export default function CoupleScene({ lang }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(".figure-bride", { x: "-120%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1.1, ease: "power2.out" })
        .fromTo(".figure-groom", { x: "120%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1.1, ease: "power2.out" }, "<")
        .fromTo(".ring-left", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.25")
        .fromTo(".ring-right", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.35")
        .fromTo(
          ".cord-ring",
          { strokeDashoffset: 300, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.1, ease: "power2.inOut", stagger: 0.15 },
          "-=0.1"
        )
        .fromTo(".couple-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.4");

      gsap.to(".ring-glow", {
        opacity: 0.8,
        duration: 2.4,
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
      className="scene-shell flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#1b1430] via-[#241a33] to-[#120e1e] px-6 pb-28 pt-14 text-center"
    >
      <p className={`couple-copy text-xs uppercase tracking-[0.35em] text-amber-200/70 ${t.meta.fontClass}`}>
        {t.couple.eyebrow}
      </p>

      <div className="relative flex w-full max-w-sm flex-1 items-end justify-center gap-1">
        <div className="figure-bride flex w-1/2 flex-col items-center">
          <Silhouette variant="bride" className="h-[32vh] max-h-72 w-auto" />
          <span className={`mt-1 text-[11px] uppercase tracking-widest text-amber-100/60 ${t.meta.fontClass}`}>
            {t.couple.brideLabel}
          </span>
        </div>
        <div className="figure-groom flex w-1/2 flex-col items-center">
          <Silhouette variant="groom" className="h-[32vh] max-h-72 w-auto" />
          <span className={`mt-1 text-[11px] uppercase tracking-widest text-amber-100/60 ${t.meta.fontClass}`}>
            {t.couple.groomLabel}
          </span>
        </div>

        {/* Rings overlay at the meeting point */}
        <div className="pointer-events-none absolute bottom-[30%] left-1/2 flex -translate-x-1/2 items-center">
          <div className="ring-glow pulse-glow absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/50" />
          <svg width="90" height="54" viewBox="0 0 90 54" className="relative">
            <circle className="ring-left" cx="34" cy="27" r="16" fill="none" stroke="#f3dcab" strokeWidth="4" />
            <circle className="ring-right" cx="56" cy="27" r="16" fill="none" stroke="#f3dcab" strokeWidth="4" />
            <circle
              className="cord-ring"
              cx="34"
              cy="27"
              r="22"
              fill="none"
              stroke="#e9cf9a"
              strokeWidth="1.5"
              strokeDasharray="300"
              strokeDashoffset="300"
              opacity="0"
            />
            <circle
              className="cord-ring"
              cx="56"
              cy="27"
              r="22"
              fill="none"
              stroke="#d9a3a0"
              strokeWidth="1.5"
              strokeDasharray="300"
              strokeDashoffset="300"
              opacity="0"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-sm">
        <h2 className={`couple-copy text-3xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
          {t.couple.heading}
        </h2>
        <p className={`couple-copy mt-2 text-sm leading-relaxed text-amber-50/80 ${t.meta.fontClass}`}>
          {t.couple.subtext}
        </p>
      </div>
    </div>
  );
}
