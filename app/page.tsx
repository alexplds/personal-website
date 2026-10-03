import { RoomsSplit } from "@/components/rooms";
import { SiteHeader } from "@/components/site-header";
import { SportTrail } from "@/components/sport-trail";
import {
  ContactSection,
  HeroSection,
  PlaySection,
  SiteFooter,
  WorkSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <SportTrail />
      <main>
        <div className="mx-auto max-w-4xl">
          <HeroSection />
        </div>
        <RoomsSplit
          deskField={<WorkSection embedded part="field" />}
          deskRest={<WorkSection embedded part="rest" />}
          courtField={<PlaySection embedded part="field" />}
          courtRest={<PlaySection embedded part="rest" />}
        />
        <div className="mx-auto max-w-4xl">
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
