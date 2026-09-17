"use client";

import Link from "next/link";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/button";

export default function CVPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      <div className="no-print mb-8 flex items-center justify-between gap-3">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
        <Button type="button" onClick={() => window.print()}>
          Save as PDF
        </Button>
      </div>

      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">{content.name}</h1>
        <p className="mt-1 text-muted-foreground">
          {content.roleLine} · {content.location}
        </p>
        <p className="mt-3 text-sm">
          <a className="underline underline-offset-4" href={`mailto:${content.email}`}>
            {content.email}
          </a>
          {" · "}
          <a className="underline underline-offset-4" href={content.phoneHref}>
            {content.phone}
          </a>
          {" · "}
          <a
            className="underline underline-offset-4"
            href={content.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed">{content.about[0]}</p>
      </header>

      <section className="mt-8">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase">Experience</h2>
        <div className="mt-4 space-y-6">
          {content.experience.map((job) => (
            <article key={`${job.org}-${job.role}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium">
                  {job.role} · {job.org}
                </h3>
                <span className="text-xs text-muted-foreground">{job.period}</span>
              </div>
              <p className="text-xs text-muted-foreground">{job.place}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase">Projects</h2>
        <div className="mt-4 space-y-4">
          {content.projects.map((project) => (
            <article key={project.id}>
              <h3 className="font-medium">
                {project.title}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  · {project.kind}
                </span>
              </h3>
              <p className="mt-1 text-sm leading-relaxed">{project.summary}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {project.detail.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase">Education</h2>
        <div className="mt-4 space-y-4">
          {content.education.map((ed) => (
            <article key={ed.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium">{ed.school}</h3>
                <span className="text-xs text-muted-foreground">{ed.period}</span>
              </div>
              <p className="text-sm">{ed.award}</p>
              <p className="text-sm text-muted-foreground">{ed.extra}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase">Skills</h2>
        <div className="mt-4 space-y-3 text-sm">
          {content.skills.map((group) => (
            <p key={group.group}>
              <span className="font-medium">{group.group}.</span> {group.items.join(" · ")}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
