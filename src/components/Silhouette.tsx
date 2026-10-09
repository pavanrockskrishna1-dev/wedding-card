interface SilhouetteProps {
  variant: "bride" | "groom";
  className?: string;
}

/**
 * Simple placeholder silhouette figures for the Bride & Groom scene.
 * These are intentionally minimal flat SVG shapes — stand-ins until real
 * photography/illustration is supplied later.
 */
export default function Silhouette({ variant, className = "" }: SilhouetteProps) {
  if (variant === "bride") {
    return (
      <svg viewBox="0 0 120 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brideGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#efd9e6" />
            <stop offset="100%" stopColor="#c99bc0" />
          </linearGradient>
        </defs>
        {/* veil */}
        <path d="M60 30 C 30 45, 22 90, 30 150 L 90 150 C 98 90, 90 45, 60 30 Z" fill="url(#brideGrad)" opacity="0.35" />
        {/* head */}
        <circle cx="60" cy="38" r="16" fill="url(#brideGrad)" />
        {/* gown */}
        <path
          d="M45 55 Q60 50 75 55 L84 110 Q96 160 100 230 L20 230 Q24 160 36 110 Z"
          fill="url(#brideGrad)"
        />
        <path d="M50 58 L45 110 L75 110 L70 58 Z" fill="url(#brideGrad)" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="groomGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#30263f" />
          <stop offset="100%" stopColor="#120e1e" />
        </linearGradient>
      </defs>
      {/* head */}
      <circle cx="60" cy="38" r="16" fill="url(#groomGrad)" />
      {/* suit body */}
      <path d="M38 56 L82 56 L92 100 L84 230 L36 230 L28 100 Z" fill="url(#groomGrad)" />
      {/* lapel */}
      <path d="M60 58 L48 78 L60 100 L72 78 Z" fill="#efd9e6" opacity="0.85" />
      {/* bow tie */}
      <path d="M52 60 L60 66 L68 60 L68 68 L60 72 L52 68 Z" fill="#cfa86b" />
    </svg>
  );
}
