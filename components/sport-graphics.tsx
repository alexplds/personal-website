type IconProps = {
  className?: string;
};

function SportIcon({ src, className = "" }: { src: string; className?: string }) {
  return (
    // Decorative only — parent sets aria-hidden
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" draggable={false} className={`sport-icon ${className}`} />
  );
}

export function FootballGraphic({ className = "" }: IconProps) {
  return <SportIcon src="/icons/football.png" className={className} />;
}

export function TennisBallGraphic({ className = "" }: IconProps) {
  return <SportIcon src="/icons/tennis-ball.png" className={className} />;
}

export function TennisRacquet({ className = "" }: IconProps) {
  return <SportIcon src="/icons/tennis-racquet.png" className={className} />;
}

export function PadelRacquet({ className = "" }: IconProps) {
  return <SportIcon src="/icons/padel-racquet.png" className={className} />;
}
