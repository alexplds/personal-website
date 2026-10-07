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
          <p className="hero-role">
            {content.roleParts.map((part) => (
              <span key={part} className="hero-role-part">
                {part}
              </span>
            ))}
          </p>
          <div className="hero-actions">
            <a
              href="/Alex-Polychroniadis-CV.pdf"
              className="cta-pill"
              target="_blank"
              rel="noopener"
            >
              View CV
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
      <div className="page-wrap">
        <Reveal>
          <p className="section-kicker">05 / Contact</p>
          <h2 className="font-heading contact-title">Contact</h2>
        </Reveal>
        <Reveal delay={70}>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${content.email}`}>{content.email}</a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
                  {content.linkedinLabel}
                </a>
              </dd>
            </div>
          </dl>
          <div className="contact-actions">
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
