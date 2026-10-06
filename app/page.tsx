import { ExperienceSection } from "@/components/experience";
import { ProjectsSection } from "@/components/projects";
import { RoomsStory } from "@/components/rooms";
import { TechStack } from "@/components/tech-stack";
import { SiteHeader } from "@/components/site-header";
import { SportTrail } from "@/components/sport-trail";
import { ContactSection, HeroSection, SiteFooter } from "@/components/sections";

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
        <HeroSection />
        <RoomsStory />
        <ProjectsSection />
        <TechStack />
        <ExperienceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
