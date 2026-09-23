import { useId, type ReactNode } from "react";

type IconProps = {
  className?: string;
};

function HobbySvg({ className = "", children }: IconProps & { children: ReactNode }) {
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
      {children}
    </svg>
  );
}

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
        <path
          fill="currentColor"
          stroke="none"
          d="M29.56 20.41 27.13 22.17 24.7 20.41 25.63 17.56h3Z
             M16 30.25 13.57 28.49 14.5 25.64h3l.93 2.85Z
             M2.44 20.41 3.37 17.56h3l.93 2.85-2.43 1.76Z
             M7.62 4.47h3l.93 2.85-2.43 1.76-2.43-1.76Z
             M24.38 4.47 25.31 7.32 22.88 9.08 20.45 7.32 21.38 4.47Z"
        />
      </g>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function SkiingIcon({ className }: IconProps) {
  return (
    <HobbySvg className={className}>
      <circle cx="19.6" cy="7.4" r="2.15" />
      <path d="M18.1 10.2 14.4 15l-4.2-2.4" />
      <path d="M14.4 15 17 19.6l5.4-1.8" />
      <path d="M8.2 13.4 21.4 18.2" />
      <path d="M5.6 22.2 26.6 26.4" />
      <path d="M5.2 25.1 26.4 28.2" />
    </HobbySvg>
  );
}

export function TennisPadelIcon({ className }: IconProps) {
  return (
    <HobbySvg className={className}>
      <ellipse cx="11.2" cy="11.4" rx="6" ry="7.1" />
      <path d="M9.4 17.8 7.6 25.4" />
      <path d="M8.2 18.4h2.6" />
      <path d="M7.4 11.4h7.6M11.2 6.4v10" />
      <rect x="17.4" y="5.6" width="8.2" height="10.4" rx="2.1" />
      <circle cx="19.8" cy="8.8" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="23.2" cy="8.8" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="19.8" cy="12.4" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="23.2" cy="12.4" r="0.85" fill="currentColor" stroke="none" />
      <path d="M21.5 16 23.1 25.4" />
      <path d="M21.8 17.8h2.6" />
    </HobbySvg>
  );
}

export function BoardGamesIcon({ className }: IconProps) {
  return (
    <HobbySvg className={className}>
      <path d="M10.8 24.6c0-3.4 1.7-5.3 4.4-6.4 1.1-.4 1.6-1.1 1.6-2.1 0-1.4-1.3-2.2-2.7-1.6-.7.3-1.3.3-1.9 0-1.5-.8-1.4-2.6.2-3.3 1.1-.5 2.3-.4 3.4.2 1.7.9 3.3 1 4.8.1.9-.5 1.8-.4 2.4.4.7.9.5 1.9-.4 2.6-1.1.8-1.6 1.8-1.4 3.1.2 1.5 1.2 2.6 2.8 3.2" />
      <path d="M8.6 24.6h14.8" />
      <rect x="4.6" y="4.8" width="8.2" height="8.2" rx="1.4" />
      <circle cx="7" cy="7.2" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="10.4" cy="10.6" r="0.7" fill="currentColor" stroke="none" />
    </HobbySvg>
  );
}
