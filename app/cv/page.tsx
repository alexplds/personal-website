"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export default function CVPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-background px-6 py-10 text-foreground print:max-w-none print:bg-white print:px-0 print:py-0 print:text-black">
      <div className="no-print mb-8 flex items-center justify-between gap-3">
        <Link href="/" className="text-sm text-muted-foreground hover:text-tech">
          ← Back to site
        </Link>
        <Button onClick={() => window.print()}>Save as PDF</Button>
      </div>

      <header className="border-b border-white/15 pb-6 print:border-black/20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">{site.name}</h1>
        <p className="mt-1 text-lg text-muted-foreground print:text-neutral-600">
          {site.role} · {site.location}
        </p>
        <p className="mt-3 text-sm">
          <a href={site.social.email} className="text-tech underline print:text-black">
            {site.email}
          </a>
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
          {site.tagline}. {site.philosophy[0]}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-heading text-xs font-semibold tracking-[0.2em] text-tech uppercase print:text-black">
          Experience
        </h2>
        <div className="mt-4 space-y-6">
          {site.experience.map((job) => (
            <article key={`${job.role}-${job.org}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium">
                  {job.role} · {job.org}
                </h3>
                <span className="text-xs text-muted-foreground print:text-neutral-600">
                  {job.period}
                </span>
              </div>
              <p className="text-xs text-muted-foreground print:text-neutral-600">{job.location}</p>
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
        <h2 className="font-heading text-xs font-semibold tracking-[0.2em] text-tech uppercase print:text-black">
          Selected work
        </h2>
        <div className="mt-4 space-y-4">
          {site.projects.map((project) => (
            <article key={project.id}>
              <h3 className="font-medium">
                {project.title}{" "}
                <span className="text-sm font-normal text-muted-foreground print:text-neutral-600">
                  · {project.kind} · {project.year}
                </span>
              </h3>
              <p className="mt-1 text-sm leading-relaxed">{project.summary}</p>
              <p className="mt-1 text-sm text-muted-foreground print:text-neutral-700">
                {project.outcome} {project.stack.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xs font-semibold tracking-[0.2em] text-tech uppercase print:text-black">
          Skills
        </h2>
        <ul className="mt-4 space-y-3">
          {site.skills.map((skill) => (
            <li key={skill.id} className="text-sm">
              <span className="font-medium">{skill.label}.</span>{" "}
              <span className="text-muted-foreground print:text-neutral-700">{skill.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-xs font-semibold tracking-[0.2em] text-tech uppercase print:text-black">
          Languages
        </h2>
        <p className="mt-3 text-sm">
          {site.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
        </p>
      </section>
    </main>
  );
}
