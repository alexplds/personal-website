"use client";

import { content } from "@/lib/content";
import { LaunchOverlay, PendingNote, useLaunch } from "@/components/overlays";
import { Reveal } from "@/components/reveal";

export function ProjectsSection() {
  const { mode, href, runId, pendingNote, launch, finish, clearNote } = useLaunch();

  return (
    <section id="projects" className="projects scroll-mt-20" aria-label="Projects">
      <div className="page-wrap">
        <Reveal>
          <p className="section-kicker">02 / Projects</p>
          <h2 className="font-heading section-title">Selected projects</h2>
        </Reveal>
        <ol className="projects-list">
          {content.projects.map((project, index) => (
            <li key={project.id}>
              <Reveal delay={index * 70}>
                <article className="project-card">
                  <div>
                    <p className="project-kicker">
                      <span className="project-index">
                        {`${String(index + 1).padStart(2, "0")} //`}
                      </span>{" "}
                      {project.kicker}
                    </p>
                    <h3 className="font-heading project-title">{project.title}</h3>
                  </div>
                  <div>
                    <p className="project-body">{project.body}</p>
                    {project.tags.length > 0 ? (
                      <ul className="project-tags">
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    ) : null}
                    {project.links.length > 0 ? (
                      <div className="project-links">
                        {project.links.map((link) => {
                          const destination = content.destinations.find(
                            (item) => item.id === link.destination,
                          );
                          if (!destination) return null;
                          return (
                            <button
                              key={link.destination}
                              type="button"
                              className="cta-pill cta-pill-ghost"
                              onClick={() => launch(destination)}
                            >
                              {link.label} <span aria-hidden="true">↗</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
      <LaunchOverlay key={runId} mode={mode} href={href} runId={runId} onDone={finish} />
      <PendingNote note={pendingNote} onClose={clearNote} />
    </section>
  );
}
