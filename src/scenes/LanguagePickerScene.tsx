import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LANGUAGES, type LangCode } from "@/config";

interface Props {
  onSelect: (lang: LangCode) => void;
}

export default function LanguagePickerScene({ onSelect }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lang-title",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
      gsap.fromTo(
        ".lang-btn",
        { opacity: 0, y: 24, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, delay: 0.3, ease: "back.out(1.6)" }
      );
      gsap.to(".lang-glow", {
        opacity: 0.9,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="scene-shell flex flex-col items-center justify-center bg-gradient-to-b from-[#1b1430] via-[#241a33] to-[#120e1e] px-6 text-center"
    >
      {/* decorative stars */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="twinkle absolute h-1 w-1 rounded-full bg-amber-100"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mb-10 flex h-20 w-20 items-center justify-center">
        <div className="lang-glow pulse-glow absolute inset-0 rounded-full bg-amber-200/40" />
        <svg viewBox="0 0 24 24" className="relative h-12 w-12 text-amber-200" fill="none" stroke="currentColor" strokeWidth={1.3}>
          <path d="M12 2 L13.8 9.2 L21 12 L13.8 14.8 L12 22 L10.2 14.8 L3 12 L10.2 9.2 Z" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="lang-title font-display text-4xl font-semibold text-amber-50 sm:text-5xl">
        You're Invited
      </h1>
      <p className="lang-title mt-2 text-sm uppercase tracking-[0.3em] text-amber-200/70">
        Please choose your language
      </p>

      <div className="mt-10 grid w-full max-w-sm grid-cols-2 gap-4">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className="lang-btn glow-ring relative overflow-hidden rounded-2xl border border-amber-200/30 bg-white/5 px-4 py-6 text-amber-50 backdrop-blur-sm transition-transform active:scale-95"
          >
            <span className="lang-glow pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-200/20 to-transparent opacity-50" />
            <span className={`relative block text-2xl font-medium ${lang.fontClass}`}>{lang.nativeLabel}</span>
            <span className="relative mt-1 block text-[11px] uppercase tracking-widest text-amber-100/60">
              {lang.englishLabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
