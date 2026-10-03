import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function TechSvg({ className = "", children }: IconProps & { children: ReactNode }) {
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

export function PythonIcon({ className }: IconProps) {
  return (
    <TechSvg className={className}>
      <path d="M12.2 6.8h6.4c2.4 0 3.6 1.2 3.6 3.4v4.1h-5.8c-.7 0-1.2.5-1.2 1.2v.2H9.4V10.2c0-2.2 1.2-3.4 2.8-3.4Z" />
      <path d="M19.8 25.2h-6.4c-2.4 0-3.6-1.2-3.6-3.4v-4.1h5.8c.7 0 1.2-.5 1.2-1.2v-.2h5.8v5.5c0 2.2-1.2 3.4-2.8 3.4Z" />
      <circle cx="14.1" cy="9.6" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="17.9" cy="22.4" r="0.85" fill="currentColor" stroke="none" />
    </TechSvg>
  );
}

export function JavaScriptIcon({ className }: IconProps) {
  return (
    <TechSvg className={className}>
      <rect x="5.4" y="5.4" width="21.2" height="21.2" rx="4.2" />
      <path d="M13 12.2v7.1c0 1.7-.7 2.4-2.2 2.4" />
      <path d="M16.4 14.6c.7-1 1.9-1.5 3.1-1.5 1.8 0 2.9 1 2.9 2.5 0 2.6-4.8 2-4.8 4.2 0 .8.7 1.5 2.1 1.5 1.2 0 2.1-.5 2.7-1.3" />
    </TechSvg>
  );
}

export function JavaIcon({ className }: IconProps) {
  return (
    <TechSvg className={className}>
      <path d="M10.2 18.6c1.8 1.3 9.8 1.3 11.6 0" />
      <path d="M9.4 21.2c2.2 1.7 11 1.7 13.2 0" />
      <path d="M10.6 23.8c2.4 1.5 8.4 1.5 10.8 0" />
      <path d="M11.4 16.2h9.2s.6 3.4-4.6 3.4-4.6-3.4-4.6-3.4Z" />
      <path d="M15.2 8.2c2.1 1.6 3.2 3.2 2.4 5.2" />
      <path d="M18.8 7.4c.2 2.1-.4 3.8-2 5.4" />
    </TechSvg>
  );
}

export function CppIcon({ className }: IconProps) {
  return (
    <TechSvg className={className}>
      <circle cx="13.2" cy="16" r="7.4" />
      <path d="M16.4 12.2c-.8-1.1-2-1.8-3.4-1.8-2.5 0-4.5 2.2-4.5 5.6s2 5.6 4.5 5.6c1.4 0 2.6-.7 3.4-1.8" />
      <path d="M22.2 13.2v5.6M19.4 16h5.6" />
      <path d="M27.2 13.2v5.6M24.4 16h5.6" />
    </TechSvg>
  );
}
