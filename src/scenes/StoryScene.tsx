import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TRANSLATIONS, type LangCode } from "@/config";

interface Props {
  lang: LangCode;
}

export default function StoryScene({ lang }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-head",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".story-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, delay: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        ".story-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, delay: 0.3, ease: "power2.inOut", transformOrigin: "top" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="scene-shell flex flex-col items-center overflow-y-auto bg-gradient-to-b from-[#120e1e] via-[#1b1430] to-[#241a33] px-6 pb-28 pt-14 text-center"
    >
      <p className={`story-head text-xs uppercase tracking-[0.35em] text-amber-200/70 ${t.meta.fontClass}`}>
        {t.story.eyebrow}
      </p>
      <h2 className={`story-head mt-1 text-3xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
        {t.story.heading}
      </h2>

      <div className="relative mt-8 w-full max-w-sm">
        <div className="story-line absolute left-[18px] top-1 h-[calc(100%-1rem)] w-px bg-amber-200/30" />
        <div className="flex flex-col gap-5">
          {t.story.cards.map((card, i) => (
            <div key={i} className="story-card relative flex gap-4 rounded-2xl border border-amber-100/10 bg-white/5 p-4 text-left backdrop-blur-sm">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-amber-200/50 bg-[#1b1430] text-[10px] font-semibold text-amber-200">
                {i + 1}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-amber-200/70">{card.year}</p>
                <h3 className={`text-lg font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
                  {card.title}
                </h3>
                <p className={`mt-1 text-sm leading-relaxed text-amber-50/75 ${t.meta.fontClass}`}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
