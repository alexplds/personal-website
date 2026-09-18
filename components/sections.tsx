import { content } from "@/lib/content";
import { CopyEmail } from "@/components/copy-email";
import { PlaySection } from "@/components/destinations";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="hero-orb" aria-hidden="true" />
      <div className="float-ball" aria-hidden="true" />
      <p className="hero-in text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {content.location}
      </p>
      <h1 className="font-heading hero-in hero-in-2 mt-4 text-5xl leading-[0.95] tracking-tight md:text-7xl">
        {content.name}
      </h1>
      <p className="hero-in hero-in-3 mt-5 max-w-xl text-lg text-muted-foreground">
        {content.roleLine}
      </p>
      <p className="hero-in hero-in-4 mt-5 max-w-2xl text-[16px] leading-relaxed">
        {content.heroLead}
      </p>
      <div className="hero-in hero-in-5 mt-6 flex flex-wrap gap-2">
        {content.languages.map((lang) => (
          <span
            key={lang.name}
            className="rounded-full border border-border bg-card/70 px-3 py-1 text-sm backdrop-blur"
          >
            {lang.name}
            <span className="text-muted-foreground"> · {lang.note}</span>
          </span>
        ))}
      </div>
      <div className="hero-in hero-in-6 mt-8 flex flex-wrap items-center gap-3">
        <Button nativeButton={false} render={<a href="#story" />}>
          The story
        </Button>
        <Button nativeButton={false} variant="outline" render={<a href="#play" />}>
          GoCourt & portfolios
        </Button>
        <Button nativeButton={false} variant="outline" render={<a href="/cv" />}>
          View CV
        </Button>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-20 px-5 py-16">
      <Reveal>
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Story</p>
        <h2 className="font-heading mt-2 text-3xl">How I got here</h2>
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {content.story.map((block, i) => (
          <Reveal key={block.id} delay={i * 80}>
            <article className="story-card h-full rounded-2xl border border-border bg-card px-5 py-6">
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                0{i + 1}
              </p>
              <h3 className="font-heading mt-2 text-xl">{block.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {block.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-20 px-5 py-16">
      <Reveal>
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Work</p>
        <h2 className="font-heading mt-2 text-3xl">Where I have been useful</h2>
      </Reveal>
      <ol className="mt-8 space-y-10">
        {content.experience.map((job, i) => (
          <Reveal key={`${job.org}-${job.role}`} delay={i * 60}>
            <li>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium">
                  {job.role} · {job.org}
                </h3>
                <p className="text-xs tracking-wide text-muted-foreground">{job.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{job.place}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-12">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Also</p>
        <div className="mt-4 space-y-4">
          {content.education.map((ed) => (
            <div key={ed.school}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium">{ed.school}</h3>
                <p className="text-xs text-muted-foreground">{ed.period}</p>
              </div>
              <p className="text-[15px]">{ed.award}</p>
              <p className="text-sm text-muted-foreground">{ed.extra}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="mt-12">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Skills</p>
        <div className="mt-4 space-y-5">
          {content.skills.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-medium">{group.group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="outline" className="rounded-md px-2.5 py-1">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
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
