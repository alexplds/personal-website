import { content } from "@/lib/content";
import { CopyEmail } from "@/components/copy-email";
import { PlaySection, WorkDestinations } from "@/components/destinations";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [firstName, ...lastParts] = content.name.split(" ");
  const lastName = lastParts.join(" ");

  return (
    <section id="top" className="relative overflow-visible px-5 pt-20 pb-16 md:pt-28 md:pb-24">
      <div>
        <p className="hero-in text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {content.location}
        </p>
        <h1 className="font-heading hero-in hero-in-2 mt-4 text-5xl leading-[1.1] tracking-tight md:text-7xl">
          {firstName}{" "}
          <span className="inline-flex items-start whitespace-nowrap">
            {lastName}
            <span className="name-light-wrap hidden md:inline-block" aria-hidden="true">
              <span className="name-light-glow" />
              <span className="name-light" />
            </span>
          </span>
        </h1>
          <p className="hero-in hero-in-3 mt-5 max-w-xl text-lg text-muted-foreground">
            {content.roleLine}
          </p>
      </div>
    </section>
  );
}

export function WorkSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id={embedded ? undefined : "work"}
      className={embedded ? "" : "scroll-mt-20 px-5 py-16"}
    >
      {embedded ? (
        <h2 className="font-heading text-2xl">Engineer / Computer Scientist</h2>
      ) : (
        <Reveal>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Work</p>
          <h2 className="font-heading mt-2 text-3xl">Engineer / Computer Scientist</h2>
        </Reveal>
      )}
      <WorkDestinations />
    </section>
  );
}

export { PlaySection };

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 px-5 py-16">
      <Reveal>
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Contact</p>
        <h2 className="font-heading mt-2 text-3xl">Say hello</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          If you want to talk sport, a product, or a role, email is the fastest path.
        </p>
      </Reveal>
      <Reveal className="mt-8">
        <dl className="space-y-3 text-[15px]">
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">Email</dt>
            <dd>
              <a className="underline underline-offset-4" href={`mailto:${content.email}`}>
                {content.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">Phone</dt>
            <dd>
              <a className="underline underline-offset-4" href={content.phoneHref}>
                {content.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">LinkedIn</dt>
            <dd>
              <a
                className="underline underline-offset-4"
                href={content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.linkedinLabel}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button nativeButton={false} render={<a href={`mailto:${content.email}`} />}>
            Email me
          </Button>
          <CopyEmail />
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {content.name}
        </p>
        <p>Greek · English · French</p>
      </div>
    </footer>
  );
}
