"use client";

import { useState } from "react";
import { content } from "@/lib/content";

export function SkillProofs() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="skill-proofs">
      <p className="rooms-label">Skills</p>
      {content.skillAreas.map((area) => (
        <div key={area.group} className="skill-area">
          <h3 className="skill-area-title">{area.group}</h3>
          <p className="skill-area-how">{area.how}</p>
          <div className="skill-proof-grid">
            {area.items.map((item) => {
              const id = `${area.group}:${item.name}`;
              const active = open === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`skill-proof-tile${active ? " is-open" : ""}`}
                  aria-expanded={active}
                  onClick={() => setOpen(active ? null : id)}
                >
                  <span className="skill-proof-name">{item.name}</span>
                  <span className="skill-proof-hint">{active ? "Hide proof" : "How I can prove it"}</span>
                  {active ? <p className="skill-proof-body">{item.proof}</p> : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
