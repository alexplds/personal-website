"use client";

export function CvActions() {
  return (
    <div className="cv-actions no-print">
      <a href="/" className="cv-back">
        Back to site
      </a>
      <div className="cv-action-buttons">
        <a className="cta-pill" href="/Alex-Polychroniadis-CV.pdf" download>
          Download PDF
        </a>
        <button type="button" className="cta-pill cta-pill-ghost" onClick={() => window.print()}>
          Print
        </button>
      </div>
    </div>
  );
}
