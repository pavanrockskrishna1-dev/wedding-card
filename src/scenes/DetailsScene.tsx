import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TRANSLATIONS, WEDDING, type LangCode } from "@/config";

interface Props {
  lang: LangCode;
}

function IconChurch() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M12 2v4M10 4h4" strokeLinecap="round" />
      <path d="M12 6l8 6v9H4v-9l8-6Z" strokeLinejoin="round" />
      <path d="M10 21v-6h4v6" strokeLinejoin="round" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}
function IconHall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M4 21V9l8-5 8 5v12" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" strokeLinejoin="round" />
    </svg>
  );
}

export default function DetailsScene({ lang }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".details-head",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".details-card",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.16, delay: 0.2, ease: "power2.out" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="scene-shell flex flex-col items-center overflow-y-auto bg-gradient-to-b from-[#241a33] via-[#1b1430] to-[#120e1e] px-6 pb-28 pt-14 text-center"
    >
      <p className={`details-head text-xs uppercase tracking-[0.35em] text-amber-200/70 ${t.meta.fontClass}`}>
        {t.details.eyebrow}
      </p>
      <h2 className={`details-head mt-1 text-3xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
        {t.details.heading}
      </h2>

      <div className="mt-7 flex w-full max-w-sm flex-col gap-4">
        <div className="details-card rounded-2xl border border-amber-100/10 bg-white/5 p-5 text-left backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-200">
            <IconCalendar />
            <span className={`text-xs uppercase tracking-widest ${t.meta.fontClass}`}>{t.details.dateLabel}</span>
          </div>
          <p className={`mt-2 text-xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
            {t.details.dateDisplay}
          </p>
          <p className={`text-sm text-amber-50/75 ${t.meta.fontClass}`}>{t.details.timeDisplay}</p>
        </div>

        <div className="details-card rounded-2xl border border-amber-100/10 bg-white/5 p-5 text-left backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-200">
            <IconChurch />
            <span className={`text-xs uppercase tracking-widest ${t.meta.fontClass}`}>{t.details.churchLabel}</span>
          </div>
          <p className={`mt-2 text-xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
            {t.details.churchName}
          </p>
          <p className={`text-sm text-amber-50/75 ${t.meta.fontClass}`}>{t.details.churchAddress}</p>
          <a
            href={WEDDING.mapsLink}
            target="_blank"
            rel="noreferrer"
            className={`btn-ghost mt-3 inline-flex text-sm ${t.meta.fontClass}`}
          >
            {t.details.directionsBtn}
          </a>
        </div>

        <div className="details-card rounded-2xl border border-amber-100/10 bg-white/5 p-5 text-left backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-200">
            <IconHall />
            <span className={`text-xs uppercase tracking-widest ${t.meta.fontClass}`}>{t.details.receptionLabel}</span>
          </div>
          <p className={`mt-2 text-xl font-semibold text-amber-50 ${t.meta.headingFontClass}`}>
            {t.details.receptionName}
          </p>
          <p className={`text-sm text-amber-50/75 ${t.meta.fontClass}`}>{t.details.receptionAddress}</p>
          <a
            href={WEDDING.receptionMapsLink}
            target="_blank"
            rel="noreferrer"
            className={`btn-ghost mt-3 inline-flex text-sm ${t.meta.fontClass}`}
          >
            {t.details.receptionDirectionsBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
