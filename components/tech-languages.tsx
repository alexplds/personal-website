import { content } from "@/lib/content";
import { CppIcon, JavaIcon, JavaScriptIcon, PythonIcon } from "@/components/tech-icons";

const techIcons = {
  python: PythonIcon,
  javascript: JavaScriptIcon,
  java: JavaIcon,
  cpp: CppIcon,
} as const;

export function TechLanguages() {
  return (
    <div className="sport-block">
      <div className="hobby-row hobby-row-desk" role="list">
        {content.programmingLanguages.map((item) => {
          const Icon = techIcons[item.id];
          return (
            <button key={item.id} type="button" className="hobby-btn" role="listitem">
              <Icon className="hobby-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
