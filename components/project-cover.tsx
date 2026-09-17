type CoverId = "northstar" | "lumen" | "harbor" | "wayfinder";

export function ProjectCover({ id }: { id: CoverId }) {
  if (id === "northstar") {
    return (
      <svg viewBox="0 0 640 400" className="size-full" aria-hidden="true">
        <rect width="640" height="400" fill="#0d1016" />
        <rect x="0" y="0" width="320" height="400" fill="#101820" />
        <rect x="320" y="0" width="320" height="400" fill="#16120c" />
        <text
          x="40"
          y="90"
          fill="#a8c9d1"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="28"
          fontWeight="600"
        >
          Engineer
        </text>
        <rect x="40" y="130" width="220" height="90" rx="8" fill="#0a0e12" stroke="#2a3d48" />
        <text x="56" y="160" fill="#6ba3b8" fontFamily="ui-monospace" fontSize="12">
          const alex = {"{"}
        </text>
        <text x="56" y="180" fill="#c9a961" fontFamily="ui-monospace" fontSize="12">
          role: &quot;Engineer&quot;
        </text>
        <text x="56" y="200" fill="#6ba3b8" fontFamily="ui-monospace" fontSize="12">
          {"}"}
        </text>
        <text
          x="360"
          y="90"
          fill="#c9a961"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="28"
          fontWeight="600"
        >
          Maker
        </text>
        <rect x="360" y="120" width="110" height="80" rx="6" fill="#2a2418" />
        <rect x="484" y="120" width="110" height="80" rx="6" fill="#2a2418" />
        <rect x="360" y="214" width="110" height="80" rx="6" fill="#2a2418" />
        <rect x="484" y="214" width="110" height="80" rx="6" fill="#2a2418" />
        <circle cx="320" cy="200" r="10" fill="url(#g1)" />
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#a8c9d1" />
            <stop offset="1" stopColor="#c9a961" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (id === "lumen") {
    return (
      <svg viewBox="0 0 640 400" className="size-full" aria-hidden="true">
        <rect width="640" height="400" fill="#0c1018" />
        <circle cx="520" cy="70" r="90" fill="#1b2438" />
        <circle cx="520" cy="70" r="50" fill="#2a3d5c" />
        <circle cx="520" cy="70" r="18" fill="#8ab4f8" opacity="0.8" />
        <rect x="48" y="56" width="360" height="18" rx="4" fill="#8ab4f8" opacity="0.7" />
        <rect x="48" y="92" width="280" height="10" rx="3" fill="#3a4a62" />
        <rect x="48" y="140" width="420" height="10" rx="3" fill="#243044" />
        <rect x="48" y="162" width="390" height="10" rx="3" fill="#243044" />
        <rect x="48" y="184" width="340" height="10" rx="3" fill="#243044" />
        <rect x="48" y="230" width="160" height="72" rx="8" fill="#152033" stroke="#8ab4f8" strokeOpacity="0.35" />
        <rect x="228" y="230" width="160" height="72" rx="8" fill="#152033" stroke="#c9a961" strokeOpacity="0.35" />
        <rect x="408" y="230" width="160" height="72" rx="8" fill="#152033" stroke="#81e6d9" strokeOpacity="0.3" />
        <text x="64" y="272" fill="#a8c9d1" fontSize="13" fontFamily="ui-sans-serif">
          Sources
        </text>
        <text x="244" y="272" fill="#c9a961" fontSize="13" fontFamily="ui-sans-serif">
          Ask
        </text>
        <text x="424" y="272" fill="#81e6d9" fontSize="13" fontFamily="ui-sans-serif">
          Open Qs
        </text>
      </svg>
    );
  }

  if (id === "harbor") {
    return (
      <svg viewBox="0 0 640 400" className="size-full" aria-hidden="true">
        <rect width="640" height="400" fill="#0c1214" />
        <rect x="36" y="40" width="568" height="44" rx="8" fill="#142026" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={36 + i * 146}
              y="108"
              width="132"
              height="248"
              rx="10"
              fill="#111a1e"
              stroke="#1e333b"
            />
            <rect x={50 + i * 146} y="128" width="104" height="10" rx="3" fill="#6ba3b8" opacity={0.7 - i * 0.1} />
            <rect x={50 + i * 146} y="156" width="104" height="48" rx="6" fill="#1a2c32" />
            <rect x={50 + i * 146} y="214" width="104" height="48" rx="6" fill="#1a2c32" />
            <rect x={50 + i * 146} y="272" width="104" height="48" rx="6" fill="#1a2c32" />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 640 400" className="size-full" aria-hidden="true">
      <rect width="640" height="400" fill="#100e0a" />
      <circle cx="420" cy="200" r="130" fill="none" stroke="#c9a961" strokeOpacity="0.25" />
      <circle cx="420" cy="200" r="88" fill="none" stroke="#c9a961" strokeOpacity="0.4" />
      <circle cx="420" cy="200" r="8" fill="#ffb86c" />
      <circle cx="490" cy="150" r="6" fill="#a8c9d1" />
      <circle cx="360" cy="240" r="6" fill="#81e6d9" />
      <circle cx="470" cy="260" r="6" fill="#c9a961" />
      <path
        d="M420 200 L490 150 L470 260 L360 240 Z"
        fill="none"
        stroke="#c9a961"
        strokeOpacity="0.5"
      />
      <rect x="40" y="70" width="200" height="14" rx="4" fill="#c9a961" opacity="0.8" />
      <rect x="40" y="110" width="160" height="8" rx="3" fill="#3a3428" />
      <rect x="40" y="170" width="220" height="54" rx="8" fill="#1c1810" stroke="#c9a961" strokeOpacity="0.3" />
      <rect x="40" y="240" width="220" height="54" rx="8" fill="#1c1810" stroke="#c9a961" strokeOpacity="0.2" />
      <rect x="40" y="310" width="220" height="54" rx="8" fill="#1c1810" stroke="#c9a961" strokeOpacity="0.15" />
    </svg>
  );
}
