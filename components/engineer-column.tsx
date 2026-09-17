"use client";

import { site } from "@/lib/site";
import { SkillGrid } from "@/components/skill-grid";

export function EngineerColumn() {
  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col gap-14">
      <header className="section-enter">
        <h2 className="font-heading bg-gradient-to-br from-tech to-tech-light bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-5xl">
          {site.engineer.title}
        </h2>
        <p className="mt-3 text-base tracking-wide text-muted-foreground">
          {site.engineer.subtitle}
        </p>
        <pre className="mt-8 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-5 font-mono text-[13px] leading-relaxed">
          <span className="text-[#89d47e]">const</span>{" "}
          <span className="text-tech-light">alex</span>
          <span className="text-foreground/70"> = {"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-tech">role</span>
          <span className="text-foreground/70">: </span>
          <span className="text-[#ffb86c]">&quot;{site.identity.role}&quot;</span>
          <span className="text-foreground/70">,</span>
          {"\n"}
          {"  "}
          <span className="text-tech">focus</span>
          <span className="text-foreground/70">: </span>
          <span className="text-[#ffb86c]">&quot;{site.identity.focus}&quot;</span>
          <span className="text-foreground/70">,</span>
          {"\n"}
          {"  "}
          <span className="text-tech">available</span>
          <span className="text-foreground/70">: </span>
          <span className="text-[#ffb86c]">&quot;{site.identity.available}&quot;</span>
          <span className="text-foreground/70">,</span>
          {"\n"}
          {"  "}
          <span className="text-tech">passion</span>
          <span className="text-foreground/70">: </span>
          <span className="text-[#ffb86c]">&quot;{site.identity.passion}&quot;</span>
          {"\n"}
          <span className="text-foreground/70">{"}"};</span>
        </pre>
      </header>

      <section className="section-enter" style={{ animationDelay: "0.15s" }}>
        <SkillGrid />
      </section>

      <section className="section-enter" style={{ animationDelay: "0.25s" }}>
        <h2 className="font-heading mb-5 text-xl font-medium tracking-wide text-tech">
          Philosophy
        </h2>
        <div className="rounded-md border-l-[3px] border-tech bg-white/[0.03] px-5 py-5">
          {site.philosophy.map((p) => (
            <p key={p} className="mb-3 text-sm leading-relaxed text-muted-foreground last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="section-enter" style={{ animationDelay: "0.35s" }}>
        <h2 className="font-heading mb-6 text-xl font-medium tracking-wide text-tech">
          Experience
        </h2>
        <ol className="space-y-8">
          {site.experience.map((job) => (
            <li key={`${job.role}-${job.org}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium text-foreground">{job.role}</h3>
                <span className="text-xs tracking-wide text-tech/80">{job.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {job.org} · {job.location}
              </p>
              <ul className="mt-3 space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:text-tech before:content-['–']"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-enter" style={{ animationDelay: "0.45s" }}>
        <h2 className="font-heading mb-6 text-xl font-medium tracking-wide text-tech">
          Journey
        </h2>
        <ol className="relative ml-2 border-l border-tech/30 pl-6">
          {site.journey.map((step) => (
            <li key={step.place} className="relative mb-8 last:mb-0">
              <span
                className={`absolute top-1.5 -left-[29px] size-2.5 rounded-full ${
                  step.current ? "bg-teal shadow-[0_0_10px_#81e6d9]" : "bg-tech"
                }`}
              />
              <h3 className="font-medium text-foreground">
                {step.place}
                {step.current ? (
                  <span className="ml-2 rounded-full border border-teal/40 px-2 py-0.5 text-[10px] tracking-wide text-teal uppercase">
                    Current
                  </span>
                ) : null}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-enter pb-10" style={{ animationDelay: "0.55s" }}>
        <h2 className="font-heading mb-5 text-xl font-medium tracking-wide text-tech">
          Languages
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {site.languages.map((lang) => (
            <div
              key={lang.name}
              title={lang.level}
              className="group relative flex flex-col items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-3 py-4 text-sm transition hover:border-tech/40"
            >
              <span className="text-2xl" aria-hidden="true">
                {lang.flag}
              </span>
              <span>{lang.name}</span>
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded border border-tech/30 bg-[#0f1116] px-2 py-1 text-[11px] whitespace-nowrap text-tech opacity-0 transition group-hover:opacity-100">
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
