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
      strokeWidth="1.7"
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
      <rect x="5.2" y="5.2" width="21.6" height="21.6" rx="4.4" />
      <path d="M10.4 11.3v9.4" />
      <path d="M10.4 11.3h3.55a2.35 2.35 0 0 1 0 4.7H10.4" />
      <path d="M17.7 14.5 20.55 20.4 23.4 14.5" />
      <path d="M20.55 20.4v2.5c0 1.15-.65 1.85-1.9 1.85" />
    </TechSvg>
  );
}

export function JavaScriptIcon({ className }: IconProps) {
  return (
    <TechSvg className={className}>
      <rect x="5.2" y="5.2" width="21.6" height="21.6" rx="4.4" />
      <path d="M12.7 12v7.3c0 1.75-.75 2.45-2.25 2.45" />
      <path d="M16.2 14.5c.7-1 1.95-1.5 3.2-1.5 1.85 0 3 1.05 3 2.55 0 2.65-4.95 2-4.95 4.25 0 .85.75 1.55 2.15 1.55 1.25 0 2.15-.5 2.8-1.35" />
    </TechSvg>
  );
}

export function JavaIcon({ className }: IconProps) {
  return (
    <TechSvg className={className}>
      <path d="M12.2 6.1c.55.7.55 1.55 0 2.25" />
      <path d="M16 5.2c.65.8.65 1.8 0 2.6" />
      <path d="M19.8 6.1c.55.7.55 1.55 0 2.25" />
      <path d="M9.1 12.6h11.8v7.1c0 2.35-2.2 3.9-5.9 3.9s-5.9-1.55-5.9-3.9Z" />
      <path d="M20.9 14.7h2.35a2.45 2.45 0 1 1 0 4.9H20.9" />
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
