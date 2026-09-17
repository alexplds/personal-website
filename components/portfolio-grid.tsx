"use client";

import { useState } from "react";
import { site, type Project } from "@/lib/site";
import { ProjectCover } from "@/components/project-cover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PortfolioGrid() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <div>
      <h2 className="font-heading mb-5 text-xl font-medium tracking-wide text-gold">
        Selected work
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {site.projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setOpen(project)}
            className="group section-enter overflow-hidden rounded-lg border border-gold/15 bg-white/[0.02] text-left transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_8px_30px_rgb(201_169_97/0.18)]"
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <div className="h-40 overflow-hidden bg-black/40">
              <div className="size-full transition duration-300 group-hover:scale-105">
                <ProjectCover id={project.cover} />
              </div>
            </div>
            <div className="px-3 py-3">
              <p className="text-sm font-medium text-foreground">{project.title}</p>
              <p className="text-xs text-gold/80">
                {project.kind} · {project.year}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={Boolean(open)} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-lg overflow-hidden border-gold/25 bg-[#0f1116] p-0 sm:max-w-lg">
          {open ? (
            <>
              <div className="h-48 overflow-hidden">
                <ProjectCover id={open.cover} />
              </div>
              <div className="p-5">
                <DialogHeader>
                  <DialogTitle className="font-heading text-xl text-gold">
                    {open.title}
                  </DialogTitle>
                  <DialogDescription className="text-gold/70">
                    {open.kind} · {open.year}
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {open.summary}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{open.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {open.stack.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-gold/30 bg-gold/10 text-gold"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5 flex justify-end">
                  <Button variant="outline" onClick={() => setOpen(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
