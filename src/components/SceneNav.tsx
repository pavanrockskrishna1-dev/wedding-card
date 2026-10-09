interface SceneNavProps {
  stepIndex: number;
  totalSteps: number;
  label: string;
  hint: string;
  fontClass: string;
  onNext: () => void;
}

export default function SceneNav({ stepIndex, totalSteps, label, hint, fontClass, onNext }: SceneNavProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-3 pb-6 pt-10">
      <div className="pointer-events-auto flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onNext}
          className={`btn-primary ${fontClass}`}
          aria-label={label}
        >
          {label}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className={`text-xs tracking-wide text-amber-100/70 ${fontClass}`}>{hint}</p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === stepIndex ? "w-5 bg-amber-200" : "w-1.5 bg-amber-200/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
