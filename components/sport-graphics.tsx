export function FootballGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#f4f4f4" stroke="#2a2a2a" strokeWidth="1.5" />
      <polygon points="32,20 39.2,25.2 36.4,33.6 27.6,33.6 24.8,25.2" fill="#1c1c1c" />
      <path
        d="M32 20 L24.8 25.2 L16 20.4 L20.8 11.2 L32 12.4 Z
           M32 20 L39.2 25.2 L48 20.4 L43.2 11.2 L32 12.4 Z
           M24.8 25.2 L27.6 33.6 L18.4 40 L11.6 32.8 L16 20.4 Z
           M39.2 25.2 L36.4 33.6 L45.6 40 L52.4 32.8 L48 20.4 Z
           M27.6 33.6 L36.4 33.6 L40 46.4 L24 46.4 Z"
        fill="none"
        stroke="#1c1c1c"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20.8 11.2 C24 8.4 40 8.4 43.2 11.2
           M11.6 32.8 C8.8 28 9.2 18 16 20.4
           M52.4 32.8 C55.2 28 54.8 18 48 20.4
           M18.4 40 L14 50.8 C20 56 44 56 50 50.8 L45.6 40
           M24 46.4 L32 54.8 L40 46.4"
        fill="none"
        stroke="#1c1c1c"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TennisBallGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#d4e157" stroke="#9aaa2a" strokeWidth="1.2" />
      <path
        d="M8 26 C22 16 22 48 8 38"
        fill="none"
        stroke="#f7f4dc"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M56 26 C42 16 42 48 56 38"
        fill="none"
        stroke="#f7f4dc"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TennisRacquet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 96" className={className} aria-hidden="true">
      <ellipse cx="24" cy="26" rx="17" ry="22" fill="#efe6d4" stroke="#5c4630" strokeWidth="3" />
      <path d="M13 12 V40 M18 10 V42 M24 9 V43 M30 10 V42 M35 12 V40" stroke="#c4b49a" strokeWidth="0.8" />
      <path d="M10 16 H38 M10 22 H38 M10 28 H38 M10 34 H38" stroke="#c4b49a" strokeWidth="0.8" />
      <rect x="21.2" y="47" width="5.6" height="26" rx="1.6" fill="#5c4630" />
      <rect x="19.6" y="71" width="8.8" height="18" rx="3" fill="#3f6b45" />
    </svg>
  );
}

export function PadelRacquet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 96" className={className} aria-hidden="true">
      <path
        d="M26 6 C40 6 46 18 46 32 C46 48 36 58 26 58 C16 58 6 48 6 32 C6 18 12 6 26 6 Z"
        fill="#2a5f9e"
        stroke="#1a3d6b"
        strokeWidth="2.4"
      />
      {[
        [18, 20],
        [26, 18],
        [34, 20],
        [16, 30],
        [26, 30],
        [36, 30],
        [18, 40],
        [26, 42],
        [34, 40],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#d7e6f6" />
      ))}
      <rect x="23" y="57" width="6" height="18" rx="1.5" fill="#1a3d6b" />
      <rect x="21" y="73" width="10" height="16" rx="3" fill="#d2b15a" />
    </svg>
  );
}
