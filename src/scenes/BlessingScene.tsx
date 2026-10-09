import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { MUSIC_SRC, TRANSLATIONS, type LangCode } from "@/config";

interface Props {
  lang: LangCode;
}

const PETAL_COLORS = ["#d9a3a0", "#e9cf9a", "#f3e3e1"];

interface Petal {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
  rotateStart: number;
}

function buildPetals(count: number): Petal[] {
  return Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    size: 8 + Math.random() * 10,
    duration: 7 + Math.random() * 6,
    delay: (i / count) * 6,
    drift: (Math.random() - 0.5) * 140,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
    rotateStart: Math.random() * 360,
  }));
}

export default function BlessingScene({ lang }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const petals = useMemo(() => buildPetals(16), []);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bless-item",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.15, ease: "power2.out" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.volume = 0.6;
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Placeholder audio file may be missing in this demo build.
          setMusicError(true);
          setPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [playing]);

  const toggleMusic = () => {
    setMusicError(false);
    setPlaying((v) => !v);
  };

  return (
    <div
      ref={rootRef}
      className="scene-shell flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e0b17] via-[#1b1430] to-[#241a33] px-6 pb-16 pt-14 text-center"
    >
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" />

      <div className="pointer-events-none absolute inset-0">
        {petals.map((p, i) => (
          <span
            key={i}
            className="petal rounded-[0_60%_0_60%]"
            style={
              {
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 0.8,
                background: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--drift": `${p.drift}px`,
                transform: `rotate(${p.rotateStart}deg)`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <p className={`bless-item text-xs uppercase tracking-[0.35em] text-amber-200/70 ${t.meta.fontClass}`}>
        {t.blessing.eyebrow}
      </p>
      <h2 className={`bless-item mt-1 text-3xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
        {t.blessing.heading}
      </h2>

      <div className="bless-item mt-6 max-w-sm rounded-2xl border border-amber-100/10 bg-white/5 p-5 backdrop-blur-sm">
        <p className={`gold-text text-base font-semibold ${t.meta.headingFontClass}`}>{t.blessing.verseRef2}</p>
        <p className={`mt-2 text-sm leading-relaxed text-amber-50/85 ${t.meta.fontClass}`}>
          "{t.blessing.verseText2}"
        </p>
      </div>

      <div className="bless-item mt-4 max-w-sm rounded-2xl border border-amber-100/10 bg-white/5 p-5 backdrop-blur-sm">
        <p className={`gold-text text-base font-semibold ${t.meta.headingFontClass}`}>{t.blessing.verseRef3}</p>
        <p className={`mt-2 text-sm leading-relaxed text-amber-50/85 ${t.meta.fontClass}`}>
          "{t.blessing.verseText3}"
        </p>
      </div>

      <p className={`bless-item mt-6 max-w-sm text-sm leading-relaxed text-amber-50/80 ${t.meta.fontClass}`}>
        {t.blessing.closing}
      </p>
      <p className={`bless-item mt-3 text-lg font-semibold text-amber-100 ${t.meta.headingFontClass}`}>
        {t.blessing.signature}
      </p>

      <button
        type="button"
        onClick={toggleMusic}
        className={`bless-item btn-ghost mt-7 ${t.meta.fontClass}`}
        aria-pressed={playing}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7Z" /></svg>
        )}
        {playing ? t.blessing.musicOn : t.blessing.musicOff}
      </button>
      {musicError && (
        <p className="bless-item mt-2 text-[11px] text-amber-100/50">
          (Add your music file at {MUSIC_SRC} to enable playback.)
        </p>
      )}
    </div>
  );
}
