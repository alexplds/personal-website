import { content } from "@/lib/content";

export function Sports() {
  return (
    <div className="sport-note">
      <p className="sport-quote">{content.sports.quote}</p>
      <p className="sport-copy">{content.sports.body}</p>
    </div>
  );
}
