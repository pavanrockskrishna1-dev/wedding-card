import { useEffect, useRef } from "react";

interface SwipeNavOptions {
  onNext: () => void;
  onPrev?: () => void;
  enabled?: boolean;
}

/**
 * Attaches swipe (touch), wheel and ArrowUp/ArrowDown listeners to the
 * window so the user can advance scenes by swiping up, scrolling, or
 * pressing keys (keyboard support included for desktop testing).
 */
export function useSwipeNav({ onNext, onPrev, enabled = true }: SwipeNavOptions) {
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lock = () => {
      lockRef.current = true;
      window.setTimeout(() => {
        lockRef.current = false;
      }, 700);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || lockRef.current) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - endY;
      if (delta > 55) {
        lock();
        onNext();
      } else if (delta < -55 && onPrev) {
        lock();
        onPrev();
      }
      touchStartY.current = null;
    };

    const handleWheel = (e: WheelEvent) => {
      if (lockRef.current) return;
      if (e.deltaY > 35) {
        lock();
        onNext();
      } else if (e.deltaY < -35 && onPrev) {
        lock();
        onPrev();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (lockRef.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp" && !onPrev) {
        lock();
        onNext();
      } else if (e.key === "ArrowUp" && onPrev) {
        lock();
        onPrev();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onNext, onPrev, enabled]);
}
