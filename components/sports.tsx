import { content } from "@/lib/content";
import {
  BoardGamesIcon,
  FootballIcon,
  SkiingIcon,
  TennisPadelIcon,
} from "@/components/hobby-icons";

const hobbyIcons = {
  football: FootballIcon,
  skiing: SkiingIcon,
  "tennis-padel": TennisPadelIcon,
  "board-games": BoardGamesIcon,
} as const;

export function Sports() {
  return (
    <div className="sport-block">
      <div className="sport-note">
        <p className="sport-quote">{content.sports.quote}</p>
        <p className="sport-copy">{content.sports.body}</p>
      </div>
      <p className="court-label">Hobbies</p>
      <div className="hobby-row" role="list">
        {content.hobbies.map((hobby) => {
          const Icon = hobbyIcons[hobby.id];
          return (
            <button key={hobby.id} type="button" className="hobby-btn" role="listitem">
              <Icon className="hobby-icon" />
              <span>{hobby.label}</span>
            </button>
          );
        })}
      </div>
      <p className="court-label">Languages</p>
      <ul className="lang-row">
        {content.languages.map((lang) => (
          <li key={lang.name} className="lang-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/flags/${lang.flag}.svg`}
              alt={`Flag of ${lang.origin}`}
              className="lang-flag"
            />
            <span className="lang-name">{lang.name}</span>
            <span className="lang-level">{lang.level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
