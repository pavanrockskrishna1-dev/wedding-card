import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getUrlParams,
  TRANSLATIONS,
  NARRATION_ON,
  buildNarration,
  type LangCode,
} from "@/config";
import { useSwipeNav } from "@/hooks/useSwipeNav";
import { useNarration } from "@/hooks/useNarration";
import SceneNav from "@/components/SceneNav";
import LanguagePickerScene from "@/scenes/LanguagePickerScene";
import StainedGlassScene from "@/scenes/StainedGlassScene";
import CordScene from "@/scenes/CordScene";
import CoupleScene from "@/scenes/CoupleScene";
import JesusBlessingScene from "@/scenes/JesusBlessingScene";
import StoryScene from "@/scenes/StoryScene";
import DetailsScene from "@/scenes/DetailsScene";
import BlessingScene from "@/scenes/BlessingScene";

const SCENE_KEYS = ["glass", "cord", "couple", "jesusBlessing", "story", "details", "blessing"] as const;
type SceneKey = (typeof SCENE_KEYS)[number];

export default function App() {
  const params = useMemo(getUrlParams, []);
  const [lang, setLang] = useState<LangCode | null>(params.lang);
  const guestName = params.name;
  const [sceneIndex, setSceneIndex] = useState(0);

  const narration = useNarration(NARRATION_ON);

  const total = SCENE_KEYS.length;

  const goNext = useCallback(() => {
    narration.stop();
    setSceneIndex((i) => Math.min(i + 1, total - 1));
  }, [total, narration]);

  const goPrev = useCallback(() => {
    narration.stop();
    setSceneIndex((i) => Math.max(i - 1, 0));
  }, [narration]);

  useSwipeNav({ onNext: goNext, onPrev: goPrev, enabled: lang !== null });

  useEffect(() => {
    document.documentElement.lang = lang ?? "en";
  }, [lang]);

  // Narrate the current scene whenever scene or language changes.
  useEffect(() => {
    if (!lang) return;
    const key: SceneKey = SCENE_KEYS[sceneIndex];
    const text = buildNarration(key, lang, guestName);
    if (text) {
      // Small delay lets the fade-in animation settle before speech starts.
      const id = window.setTimeout(() => narration.speak(text, lang), 450);
      return () => {
        window.clearTimeout(id);
        narration.stop();
      };
    }
    return () => narration.stop();
  }, [sceneIndex, lang, guestName, narration]);

  if (!lang) {
    return <LanguagePickerScene onSelect={(l) => setLang(l)} />;
  }

  const t = TRANSLATIONS[lang];
  const current = SCENE_KEYS[sceneIndex];
  const isLast = sceneIndex === total - 1;

  return (
    <div className={`relative h-[100dvh] w-full overflow-hidden bg-[#120e1e] ${t.meta.fontClass}`}>
      <div key={current} className="scene-shell animate-[fadeInScene_0.6s_ease]">
        {current === "glass" && <StainedGlassScene lang={lang} guestName={guestName} />}
        {current === "cord" && <CordScene lang={lang} />}
        {current === "couple" && <CoupleScene lang={lang} />}
        {current === "jesusBlessing" && <JesusBlessingScene lang={lang} />}
        {current === "story" && <StoryScene lang={lang} />}
        {current === "details" && <DetailsScene lang={lang} />}
        {current === "blessing" && <BlessingScene lang={lang} />}
      </div>

      {/* Narration toggle — top-right, small, does not overlap SceneNav (bottom). */}
      <button
        type="button"
        aria-label={narration.enabled ? "Turn narration off" : "Turn narration on"}
        onClick={() => narration.setEnabled((v) => !v)}
        className="fixed right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-base text-amber-50 backdrop-blur-sm ring-1 ring-amber-100/20 transition hover:bg-black/55 active:scale-95"
      >
        <span aria-hidden="true">{narration.enabled ? "🔊" : "🔇"}</span>
      </button>

      {!isLast && (
        <SceneNav
          stepIndex={sceneIndex}
          totalSteps={total}
          label={sceneIndex === 0 ? t.common.begin : t.common.next}
          hint={t.common.swipeHint}
          fontClass={t.meta.fontClass}
          onNext={goNext}
        />
      )}
    </div>
  );
}
