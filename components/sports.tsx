import { content } from "@/lib/content";

export function Sports() {
  return (
    <div className="fact-block">
      <p className="rooms-label">Sport</p>
      <p className="fact-lead">{content.sports.lead}</p>
      <ul className="fact-list">
        {content.sports.done.map((item) => (
          <li key={item.title} className="fact-item">
            <h3 className="fact-title">{item.title}</h3>
            <p className="fact-body">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
