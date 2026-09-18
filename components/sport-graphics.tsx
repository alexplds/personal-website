export function FootballGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="fb-skin" cx="32%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#ececec" />
          <stop offset="100%" stopColor="#b8b8b8" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#fb-skin)" />
      <circle cx="100" cy="100" r="96" fill="none" stroke="#1a1a1a" strokeWidth="3" />
      <polygon points="100,58 124,76 115,104 85,104 76,76" fill="#171717" />
      <path
        d="M100 58 L76 76 L48 62 L62 28 Z M100 58 L124 76 L152 62 L138 28 Z M76 76 L85 104 L52 128 L32 98 Z M124 76 L115 104 L148 128 L168 98 Z M85 104 L115 104 L128 148 L72 148 Z"
        fill="none"
        stroke="#171717"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <polygon points="62,28 100,18 138,28 124,52 76,52" fill="none" stroke="#171717" strokeWidth="4" />
      <polygon points="32,98 22,128 48,162 72,148 52,128" fill="none" stroke="#171717" strokeWidth="4" />
      <polygon points="168,98 178,128 152,162 128,148 148,128" fill="none" stroke="#171717" strokeWidth="4" />
    </svg>
  );
}

export function TennisBallGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="tb-skin" cx="30%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#f7f4a8" />
          <stop offset="45%" stopColor="#d4e054" />
          <stop offset="100%" stopColor="#8aa322" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#tb-skin)" />
      <path
        d="M18 78 C70 40, 70 160, 18 122"
        fill="none"
        stroke="#f8f6e8"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M182 78 C130 40, 130 160, 182 122"
        fill="none"
        stroke="#f8f6e8"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TennisRacquet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 360" className={className} aria-hidden="true">
      <ellipse cx="80" cy="92" rx="58" ry="78" fill="#c4a36a" stroke="#3a2a14" strokeWidth="10" />
      <ellipse cx="80" cy="92" rx="46" ry="66" fill="#f3efe4" />
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={48 + i * 8}
          y1="32"
          x2={48 + i * 8}
          y2="152"
          stroke="#9a8f7a"
          strokeWidth="1.2"
        />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={`h${i}`}
          x1="38"
          y1={40 + i * 11}
          x2="122"
          y2={40 + i * 11}
          stroke="#9a8f7a"
          strokeWidth="1.2"
        />
      ))}
      <rect x="72" y="168" width="16" height="110" rx="6" fill="#3a2a14" />
      <rect x="68" y="268" width="24" height="70" rx="10" fill="#1f6b3c" />
    </svg>
  );
}

export function PadelRacquet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 360" className={className} aria-hidden="true">
      <path
        d="M90 22 C142 22 162 70 162 118 C162 176 128 214 90 214 C52 214 18 176 18 118 C18 70 38 22 90 22 Z"
        fill="#1c3f7a"
        stroke="#0d2244"
        strokeWidth="8"
      />
      <path
        d="M90 40 C128 40 142 76 142 118 C142 164 118 194 90 194 C62 194 38 164 38 118 C38 76 52 40 90 40 Z"
        fill="#2b6cb0"
      />
      {[
        [70, 70],
        [90, 62],
        [110, 70],
        [62, 96],
        [90, 92],
        [118, 96],
        [70, 122],
        [90, 126],
        [110, 122],
        [80, 152],
        [100, 152],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#0d2244" opacity="0.45" />
      ))}
      <rect x="80" y="210" width="20" height="78" rx="6" fill="#0d2244" />
      <rect x="74" y="280" width="32" height="64" rx="12" fill="#e8c36a" />
    </svg>
  );
}
