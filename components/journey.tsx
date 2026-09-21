import { content } from "@/lib/content";

export function Journey() {
  return (
    <div className="journey">
      <p className="rooms-label">Journey</p>
      <ol className="journey-list">
        {content.journey.map((stop) => (
          <li key={stop.place} className={`journey-item${stop.current ? " is-current" : ""}`}>
            <div className="journey-place-row">
              <h3 className="journey-place">{stop.place}</h3>
              {stop.current ? <span className="journey-now">Current</span> : null}
            </div>
            <p className="journey-detail">{stop.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
