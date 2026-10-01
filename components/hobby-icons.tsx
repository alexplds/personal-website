import { useId } from "react";

type IconProps = {
  className?: string;
};

export function FootballIcon({ className }: IconProps) {
  const clipId = `football-clip-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <defs>
        <clipPath id={clipId}>
          <circle cx="16" cy="16" r="13" />
        </clipPath>
      </defs>
      <g
        clipPath={`url(#${clipId})`}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          fill="currentColor"
          stroke="none"
          d="M16 9.85 21.85 14.1 19.61 20.98h-7.22L10.15 14.1Z"
        />
        <path d="M16 9.85 19.7 5.27 25.06 9.17 21.85 14.1" />
        <path d="M21.85 14.1 27.35 16.2 25.3 22.51 19.61 20.98" />
        <path d="M19.61 20.98 19.32 26.85h-6.64L12.39 20.98" />
        <path d="M12.39 20.98 6.7 22.51 4.65 16.2 10.15 14.1" />
        <path d="M10.15 14.1 6.94 9.17 12.3 5.27 16 9.85" />
      </g>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function SkiingIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="21.5" cy="6.15" r="2.45" fill="currentColor" stroke="none" />
      <path
        fill="currentColor"
        stroke="none"
        d="M19.55 8.55 23.1 12.2l-3.55 3.55 1.45 3.55-7.15 3.95-1.25-1.45 5.05-2.85-1.7-3.15 2.45-2.55-3.05-2.15-5.35 2.55-1.05-1.45 6.85-3.25z"
      />
      <path d="M10.15 12.85 5.2 20.4" />
      <path d="M3.15 21.2 28.7 26.45" strokeWidth="2.15" />
      <path d="M2.75 24.45 28.3 29.7" strokeWidth="2.15" />
    </svg>
  );
}

export function TennisPadelIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" />
      <g transform="rotate(-18 16 16)">
        <path d="M7.2 7.4c5.8 3.4 5.8 13.8 0 17.2" />
        <path d="M24.8 7.4c-5.8 3.4-5.8 13.8 0 17.2" />
      </g>
    </svg>
  );
}

export function BoardGamesIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(6.2,1.1) scale(1.08)">
        <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
        <path d="M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456" />
        <path d="m15 5 1.425-1.425" />
        <path d="m17 8 1.53-1.53" />
        <path d="M9.713 12.185 7 18" />
      </g>
      <rect x="2.55" y="19.15" width="8.2" height="8.2" rx="1.45" />
      <circle cx="5.1" cy="21.7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="8.2" cy="24.8" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="5.1" cy="24.8" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="8.2" cy="21.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
