import { content } from "@/lib/content";
import { CopyEmail } from "@/components/copy-email";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function HeroSection() {
  return (
    <section id="top" className="px-5 pt-16 pb-12 md:pt-24 md:pb-16">
      <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
        {content.location}
      </p>
      <h1 className="font-heading mt-3 text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
        {content.name}
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
        {content.roleLine}
      </p>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed md:text-base">
        {content.heroLead} {content.availability}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button nativeButton={false} render={<a href="#contact" />}>
          Contact
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          render={<a href={content.linkedin} target="_blank" rel="noopener noreferrer" />}
        >
          LinkedIn
        </Button>
        <Button nativeButton={false} variant="outline" render={<a href="/cv" />}>
          View CV
        </Button>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 px-5 py-12">
      <SectionTitle>About</SectionTitle>
      <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-foreground/90">
        {content.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 px-5 py-12">
      <SectionTitle>Experience</SectionTitle>
      <ol className="mt-8 space-y-10">
        {content.experience.map((job) => (
          <li key={`${job.org}-${job.role}`}>
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
        ))}
      </ol>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 px-5 py-12">
      <SectionTitle>Projects</SectionTitle>
      <div className="mt-8 space-y-4">
        {content.projects.map((project) => (
          <details
            key={project.id}
            className="group rounded-lg border border-border bg-card px-4 py-4"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium">
                  {project.title}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {project.kind}
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground">{project.period}</p>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <p className="mt-2 text-xs text-foreground/70 group-open:hidden">
                Show detail
              </p>
              <p className="mt-2 hidden text-xs text-foreground/70 group-open:block">
                Hide detail
              </p>
            </summary>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
              {project.detail.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {"href" in project && project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm underline underline-offset-4"
              >
                gocourt.gr
              </a>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 px-5 py-12">
      <SectionTitle>Education</SectionTitle>
      <ol className="mt-8 space-y-8">
        {content.education.map((ed) => (
          <li key={ed.school}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-medium">{ed.school}</h3>
              <p className="text-xs text-muted-foreground">{ed.period}</p>
            </div>
            <p className="mt-1 text-[15px]">{ed.award}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ed.extra}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 px-5 py-12">
      <SectionTitle>Skills</SectionTitle>
      <div className="mt-8 space-y-6">
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
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 px-5 py-12">
      <SectionTitle>Contact</SectionTitle>
      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        If a brief or a conversation would help, email is the fastest path.
      </p>
      <dl className="mt-6 space-y-3 text-[15px]">
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
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 py-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {content.name}</p>
        <p>{content.location}</p>
      </div>
    </footer>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div>
      <h2 className="font-heading text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        {children}
      </h2>
      <Separator className="mt-3" />
    </div>
  );
}
