"use client";

import { useEffect, useId, useRef, useState } from "react";
import { content } from "@/lib/content";

const POPUP_WIDTH = 360;

export function SkillProofs() {
  const [open, setOpen] = useState<string | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const titleId = useId();

  function place(group: string) {
    const button = buttons.current.get(group);
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const width = Math.min(POPUP_WIDTH, window.innerWidth - 24);
    let left = rect.right + 12;
    let top = rect.top;
    if (left + width > window.innerWidth - 12) {
      left = Math.max(12, rect.left);
      top = rect.bottom + 10;
    }
    const maxTop = window.innerHeight - 16;
    top = Math.min(top, maxTop);
    top = Math.max(12, top);
    setPos({ top, left });
  }

  function toggle(group: string) {
    if (open === group) {
      setOpen(null);
      return;
    }
    place(group);
    setOpen(group);
  }

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }

    function onPointer(event: PointerEvent) {
      const target = event.target as Node;
      if (popupRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(null);
    }

    function onReposition() {
      if (open) place(open);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open]);

  const area = content.skillAreas.find((item) => item.group === open);

  return (
    <div className="skill-proofs">
      <p className="rooms-label">Skills</p>
      <div ref={listRef} className="skill-item-list">
        {content.skillAreas.map((item) => (
          <button
            key={item.group}
            type="button"
            className={`skill-item${open === item.group ? " is-open" : ""}`}
            aria-expanded={open === item.group}
            aria-controls={open === item.group ? "skill-popup" : undefined}
            ref={(node) => {
              if (node) buttons.current.set(item.group, node);
              else buttons.current.delete(item.group);
            }}
            onClick={() => toggle(item.group)}
          >
            {item.group}
          </button>
        ))}
      </div>

      {area ? (
        <div
          id="skill-popup"
          ref={popupRef}
          className="skill-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          style={{ top: pos.top, left: pos.left }}
        >
          <button type="button" className="skill-popup-close" onClick={() => setOpen(null)} aria-label="Close">
            ×
          </button>
          <h3 id={titleId} className="skill-popup-title">
            {area.group}
          </h3>
          <p className="skill-popup-how">{area.how}</p>
          {area.items.map((item) => (
            <p key={item.name} className="skill-popup-proof">
              <strong>{item.name}.</strong> {item.proof}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
