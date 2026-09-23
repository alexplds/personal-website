import type { ReactNode } from "react";

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
  return (
    <HobbySvg className={className}>
      <circle cx="16" cy="16" r="11.2" />
      <path d="M16 10.1 19.4 12.6 18.1 16.6h-4.2L12.6 12.6Z" />
      <path d="M19.4 12.6 23.8 11.2M12.6 12.6 8.2 11.2M13.9 16.6 10.2 20.4M18.1 16.6 21.8 20.4M10.2 20.4 13.4 23.8M21.8 20.4 18.6 23.8M13.4 23.8h5.2" />
    </HobbySvg>
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
