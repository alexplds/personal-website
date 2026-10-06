import { content } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience scroll-mt-20" aria-label="Experience">
      <div className="page-wrap">
        <Reveal>
          <p className="section-kicker">04 / Experience</p>
          <h2 className="font-heading section-title">Where I have worked</h2>
        </Reveal>
        <ol className="experience-list">
          {content.experience.map((job, index) => (
            <li key={job.org}>
              <Reveal delay={index * 70}>
                <article className="experience-item">
                  <div className="experience-meta">
                    <p className="experience-period">{job.period}</p>
                    <p className="experience-place">{job.place}</p>
                  </div>
                  <div>
                    <h3 className="font-heading experience-role">{job.role}</h3>
                    <p className="experience-org">{job.org}</p>
                    <ul className="experience-bullets">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
