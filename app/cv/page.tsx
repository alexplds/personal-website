import type { Metadata } from "next";
import { CvActions } from "@/components/cv-actions";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: `${content.name} — CV`,
  description: content.seo.description,
};

const jobs = [...content.experience, ...content.earlyInternships];

export default function CVPage() {
  return (
    <main className="cv-page">
      <CvActions />
      <header className="cv-head">
        <h1 className="font-heading">{content.name}</h1>
        <p className="cv-role">{content.roleLine}</p>
        <p className="cv-meta">{content.location}</p>
        <p className="cv-contacts">
          <a href={`mailto:${content.email}`}>{content.email}</a>
          <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
            {content.linkedinLabel}
          </a>
        </p>
        <p className="cv-lead">{content.heroLead}</p>
        <p className="cv-meta">
          {content.languages.map((language) => `${language.name} (${language.level})`).join(" · ")}
        </p>
      </header>

      <section className="cv-section" aria-label="Experience">
        <h2>Experience</h2>
        {jobs.map((job) => (
          <article key={`${job.org}-${job.role}`} className="cv-item">
            <div className="cv-item-top">
              <h3>
                {job.role} · {job.org}
              </h3>
              <p className="cv-when">{job.period}</p>
            </div>
            <p className="cv-place">{job.place}</p>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="cv-section" aria-label="Projects">
        <h2>Projects</h2>
        {content.projects.map((project) => (
          <article key={project.id} className="cv-item">
            <div className="cv-item-top">
              <h3>{project.title}</h3>
              <p className="cv-when">{project.kicker}</p>
            </div>
            <p className="cv-body">{project.body}</p>
            {project.tags.length > 0 ? (
              <p className="cv-tags">{project.tags.join(" · ")}</p>
            ) : null}
            {project.links.length > 0 ? (
              <p className="cv-links">
                {project.links.map((link) => {
                  const destination = content.destinations.find(
                    (item) => item.id === link.destination,
                  );
                  if (!destination) return null;
                  return (
                    <a key={link.destination} href={destination.href}>
                      {link.label}
                    </a>
                  );
                })}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="cv-section" aria-label="Education">
        <h2>Education</h2>
        {content.education.map((item) => (
          <article key={item.school} className="cv-item">
            <div className="cv-item-top">
              <h3>{item.school}</h3>
              <p className="cv-when">{item.period}</p>
            </div>
            <p className="cv-body">{item.award}</p>
            <p className="cv-place">{item.extra}</p>
          </article>
        ))}
      </section>

      <section className="cv-section" aria-label="Skills">
        <h2>Skills</h2>
        {content.skills.map((group) => (
          <p key={group.group} className="cv-skill">
            <span>{group.group}.</span> {group.items.join(" · ")}
          </p>
        ))}
      </section>
    </main>
  );
}
