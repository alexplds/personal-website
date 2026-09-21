import { content } from "@/lib/content";

export function LanguageFields() {
  return (
    <div className="language-block">
      <p className="rooms-label">Languages</p>
      <div className="language-grid">
        {content.languages.map((lang) => (
          <article key={lang.name} className="language-field">
            <img
              src={`/flags/${lang.flag}.svg`}
              alt={`Flag of ${lang.origin}`}
              className="language-flag"
            />
            <h3 className="language-name">{lang.name}</h3>
            <p className="language-level">{lang.level}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
