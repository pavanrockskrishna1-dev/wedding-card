import { useCallback, useEffect, useMemo, useState } from "react";
import { getUrlParams, TRANSLATIONS, type LangCode } from "@/config";
import { useSwipeNav } from "@/hooks/useSwipeNav";
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

export default function App() {
  const params = useMemo(getUrlParams, []);
  const [lang, setLang] = useState<LangCode | null>(params.lang);
  const guestName = params.name;
  const [sceneIndex, setSceneIndex] = useState(0);

  const total = SCENE_KEYS.length;

  const goNext = useCallback(() => {
    setSceneIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setSceneIndex((i) => Math.max(i - 1, 0));
  }, []);

  useSwipeNav({ onNext: goNext, onPrev: goPrev, enabled: lang !== null });

  useEffect(() => {
    document.documentElement.lang = lang ?? "en";
  }, [lang]);

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
