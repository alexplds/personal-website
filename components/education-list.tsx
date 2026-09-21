import { content } from "@/lib/content";

export function EducationList() {
  return (
    <div className="fact-block">
      <p className="rooms-label">Education</p>
      <ol className="fact-list">
        {content.education.map((ed) => (
          <li key={ed.school} className="fact-item">
            <div className="fact-top">
              <h3 className="fact-title">{ed.school}</h3>
              <span className="fact-meta">{ed.period}</span>
            </div>
            <p className="fact-body">{ed.award}</p>
            <p className="fact-note">{ed.extra}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
