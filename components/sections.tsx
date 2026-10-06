import { content } from "@/lib/content";
import { CopyEmail } from "@/components/copy-email";
import { Reveal } from "@/components/reveal";

export function HeroSection() {
  const [firstName, ...lastParts] = content.name.split(" ");
  const lastName = lastParts.join(" ");
  const iAt = lastName.indexOf("i");

  return (
    <section id="top" className="hero">
      <div className="page-wrap hero-grid">
        <div>
          <p className="hero-in section-kicker">{content.location}</p>
          <h1 className="font-heading hero-in hero-in-2 hero-name" aria-label={content.name}>
            <span className="block">{firstName}</span>
            <span className="whitespace-nowrap">
              {lastName.slice(0, iAt)}
              <span className="name-i">
                <span className="md:hidden">i</span>
                <span className="hidden md:inline">ı</span>
                <span className="name-light-wrap hidden md:block" aria-hidden="true">
                  <span className="name-light-glow" />
                  <span className="name-light" />
                </span>
              </span>
              {lastName.slice(iAt + 1)}
            </span>
          </h1>
        </div>
        <div className="hero-aside hero-in hero-in-3">
          <p className="hero-role">{content.roleLine}</p>
          <p className="hero-lead">{content.heroLead}</p>
          <div className="hero-actions">
            <a href="#projects" className="cta-pill">
              See projects
            </a>
            <a href="#contact" className="cta-pill cta-pill-ghost">
              Get in touch
            </a>
          </div>
        </div>
      </div>
      <a href="#about" className="hero-scroll">
        Scroll
      </a>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="contact scroll-mt-20">
      <div className="page-wrap contact-grid">
        <Reveal>
          <p className="section-kicker">05 / Contact</p>
          <h2 className="font-heading section-title">Say hello</h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            If you want to talk sport, a product, or a role, email is the fastest path.
          </p>
        </Reveal>
        <Reveal delay={90}>
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
            <a href={`mailto:${content.email}`} className="cta-pill">
              Email me
            </a>
            <CopyEmail />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="page-wrap flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {content.name}
        </p>
        <p>Greek · English · French</p>
      </div>
    </footer>
  );
}
