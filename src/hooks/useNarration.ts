import { useCallback, useEffect, useRef, useState } from "react";
import type { LangCode } from "@/config";

// Map our 4 app languages to BCP-47 voice codes we will try to match on the phone.
const VOICE_LANG: Record<LangCode, string> = {
  en: "en-IN",
  te: "te-IN",
};

function pickVoice(targetLang: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Exact match first (e.g. "te-IN"), then base-language match (e.g. "te").
  const exact = voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase());
  if (exact) return exact;

  const base = targetLang.split("-")[0].toLowerCase();
  const baseMatch = voices.find((v) => v.lang.toLowerCase().startsWith(base));
  return baseMatch ?? null;
}

/**
 * useNarration — tiny wrapper around window.speechSynthesis.
 *
 * - Waits for the first user tap anywhere on the page before speaking.
 * - On every speak() call, cancels any ongoing speech first.
 * - If no voice exists for the requested language on the phone, stays silent
 *   (no errors, no language fallback).
 * - Also exposes an `enabled` flag so the parent can toggle narration on/off;
 *   turning it off stops speech immediately.
 */
export function useNarration(initialEnabled: boolean) {
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const voicesReadyRef = useRef<boolean>(false);

  // Mark voices-ready when the browser emits voiceschanged (voices often load async).
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;

    const markReady = () => {
      voicesReadyRef.current = true;
    };
    // Some browsers have voices immediately.
    if (synth.getVoices().length > 0) voicesReadyRef.current = true;

    synth.addEventListener?.("voiceschanged", markReady);
    return () => {
      synth.removeEventListener?.("voiceschanged", markReady);
    };
  }, []);

  // First tap anywhere unlocks speech synthesis on mobile.
  useEffect(() => {
    if (unlocked) return;
    const unlock = () => {
      setUnlocked(true);
      // A silent utterance helps "warm up" the engine on iOS/Android.
      try {
        if ("speechSynthesis" in window) {
          const u = new SpeechSynthesisUtterance("");
          u.volume = 0;
          window.speechSynthesis.speak(u);
        }
      } catch {
        /* no-op */
      }
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [unlocked]);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* no-op */
    }
  }, []);

  const speak = useCallback(
    (text: string, lang: LangCode) => {
      if (!enabled) return;
      if (!unlocked) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (!text || !text.trim()) return;

      const target = VOICE_LANG[lang];
      const voice = pickVoice(target);
      // If the phone has no voice for this language, stay silent.
      if (!voice) return;

      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.voice = voice;
        u.lang = voice.lang || target;
        u.rate = 0.9;
        u.pitch = 1;
        u.volume = 1;
        window.speechSynthesis.speak(u);
      } catch {
        /* no-op */
      }
    },
    [enabled, unlocked]
  );

  // When narration is turned off, stop any ongoing speech immediately.
  useEffect(() => {
    if (!enabled) stop();
  }, [enabled, stop]);

  // Stop speech if the tab is hidden or the component unmounts.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      stop();
    };
  }, [stop]);

  return { enabled, setEnabled, unlocked, speak, stop };
}
