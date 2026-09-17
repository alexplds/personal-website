"use client";

import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { site, type Skill } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SkillGrid() {
  const [open, setOpen] = useState<Skill | null>(null);
  const [anchor, setAnchor] = useState<{ top: number; left: number } | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    function onClick(e: MouseEvent) {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-skill-popup]") && !t.closest("[data-skill-item]")) {
        setOpen(null);
      }
    }
    function onScroll() {
      setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  function onSelect(skill: Skill, el: HTMLButtonElement) {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setMobile(!wide);
    if (!wide) {
      setOpen(skill);
      return;
    }
    const rect = el.getBoundingClientRect();
    const popupWidth = 360;
    let left = rect.right + 16;
    if (left + popupWidth > window.innerWidth - 12) {
      left = rect.left - popupWidth - 16;
    }
    if (left < 8) left = 8;
    setAnchor({ top: rect.top, left });
    setOpen(skill);
  }

  return (
    <div>
      <h2 className="font-heading mb-5 text-xl font-medium tracking-wide text-tech">
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {site.skills.map((skill) => (
          <button
            key={skill.id}
            type="button"
            data-skill-item
            onClick={(e) => onSelect(skill, e.currentTarget)}
            className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-sm text-foreground/90 transition hover:border-tech/40 hover:bg-tech/5"
          >
            {skill.label}
          </button>
        ))}
      </div>

      {open && !mobile && anchor ? (
        <div
          data-skill-popup
          className="fixed z-50 w-[min(360px,calc(100vw-24px))] rounded-md border border-tech/30 bg-[#0f1116]/98 p-4 shadow-2xl backdrop-blur-md"
          style={{ top: anchor.top, left: anchor.left }}
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="font-heading text-base font-medium text-tech">{open.label}</h3>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Close"
              onClick={() => setOpen(null)}
            >
              <XIcon />
            </Button>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{open.body}</p>
        </div>
      ) : null}

      <Dialog open={Boolean(open && mobile)} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="border-tech/30 bg-[#0f1116] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-tech">{open?.label}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {open?.body}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
