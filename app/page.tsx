import { SiteHeader } from "@/components/site-header";
import {
  ContactSection,
  HeroSection,
  PlaySection,
  SiteFooter,
  StorySection,
  WorkSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main className="mx-auto max-w-4xl">
        <HeroSection />
        <StorySection />
        <WorkSection />
        <PlaySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
