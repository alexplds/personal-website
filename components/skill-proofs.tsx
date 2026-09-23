"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { content } from "@/lib/content";

const POPUP_WIDTH = 360;
const MARGIN = 12;
const GAP = 10;

type SkillArea = {
  group: string;
  how: string;
  items: readonly { name: string; proof: string }[];
  skills?: string;
};

const deskAreas = content.skillAreas as readonly SkillArea[];
const courtAreas = content.courtSkillAreas as readonly SkillArea[];

export function SkillProofs({
  title = "Skills",
  tone = "desk",
}: {
  title?: string;
  tone?: "desk" | "court";
}) {
  const skillAreas = tone === "court" ? courtAreas : deskAreas;
  const [open, setOpen] = useState<string | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: POPUP_WIDTH });
  const listRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const titleId = useId();

  function place(group: string) {
    const button = buttons.current.get(group);
    if (!button) return;

    const width = Math.min(POPUP_WIDTH, window.innerWidth - MARGIN * 2);
    const height = popupRef.current?.offsetHeight ?? 160;
    const rect = button.getBoundingClientRect();
    const minLeft = MARGIN;
    const maxLeft = window.innerWidth - MARGIN - width;
    const minTop = MARGIN;
    const maxTop = window.innerHeight - MARGIN - height;

    let left = rect.right + GAP;
    let top = rect.top;

    if (left > maxLeft) {
      left = rect.left - GAP - width;
    }
    if (left < minLeft) {
      left = Math.min(Math.max(minLeft, rect.left), maxLeft);
      top = rect.bottom + GAP;
    }

    left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));

    if (top > maxTop) {
      const above = rect.top - GAP - height;
      top = above >= minTop ? above : Math.max(minTop, maxTop);
    }
    top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));

    setPos({ top, left, width });
  }

  function toggle(group: string) {
    if (open === group) {
      setOpen(null);
      return;
    }
    place(group);
    setOpen(group);
  }

  useLayoutEffect(() => {
    if (open) place(open);
  }, [open]);

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

  const area = skillAreas.find((item) => item.group === open);

  return (
    <div className={`skill-proofs${tone === "court" ? " skill-proofs-court" : ""}`}>
      <p className="rooms-label skill-proofs-label">
        {title}
        <span className="skill-proofs-hint">Click to view</span>
      </p>
      <div ref={listRef} className="skill-item-list">
        {skillAreas.map((item) => (
          <button
            key={item.group}
            type="button"
            className={`skill-item${open === item.group ? " is-open" : ""}`}
            aria-expanded={open === item.group}
            aria-controls={open === item.group ? `skill-popup-${tone}` : undefined}
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
          id={`skill-popup-${tone}`}
          ref={popupRef}
          className="skill-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          style={{ top: pos.top, left: pos.left, width: pos.width }}
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
          {area.skills ? (
            <p className="skill-popup-proof">
              <strong>Skills:</strong> {area.skills}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
