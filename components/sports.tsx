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
    </div>
  );
}
