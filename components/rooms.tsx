"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IntersectionSection } from "@/components/destinations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { content } from "@/lib/content";

export function RoomsSplit({
  desk,
  court,
}: {
  desk: ReactNode;
  court: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function sync() {
      if (window.location.hash === "#play") setOpen(true);
    }
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function setDialog(next: boolean) {
    setOpen(next);
    if (!next && window.location.hash === "#play") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (next && window.location.hash !== "#play") {
      history.replaceState(null, "", "#play");
    }
  }

  return (
    <section className="rooms-band" aria-label="Desk, court, and intersection">
      <div className="rooms-intro">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Rooms</p>
        <h2 className="font-heading mt-2 text-3xl">Desk and court</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Two rooms. Press the green Intersection button between them to open where they meet.
        </p>
      </div>

      <div className="rooms-board">
        <div id="work" className="rooms-pane rooms-desk scroll-mt-20">
          <p className="rooms-label">Desk</p>
          {desk}
        </div>

        <button type="button" className="rooms-open" onClick={() => setDialog(true)}>
          <span className="rooms-open-kicker">Open</span>
          <span className="rooms-open-title">Intersection</span>
        </button>

        <div className="rooms-pane rooms-court scroll-mt-20">
          <p className="rooms-label">Court</p>
          {court}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setDialog}>
        <DialogContent
          className="rooms-intersection-dialog sm:max-w-2xl"
          showCloseButton
        >
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Intersection</DialogTitle>
            <DialogDescription className="text-[15px] leading-relaxed">
              {content.intersection}
            </DialogDescription>
          </DialogHeader>
          <IntersectionSection embedded />
        </DialogContent>
      </Dialog>
    </section>
  );
}
